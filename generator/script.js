// Example data to simulate fetching from a database
const sampleData = [
    {
        "timestamp": "2024-11-30",
        "Issue": "High exhaust steam pressure reducing condenser performance",
        "Observed_Value": "0.17 MPa",
        "Expected_Range": "0.10-0.14 MPa"
    },
    {
        "timestamp": "2024-11-25",
        "Issue": "Low cooling tower efficiency impacting heat dissipation",
        "Observed_Value": "65%",
        "Expected_Range": "70-75%"
    },
    {
        "timestamp": "2024-11-03",
        "Issue": "High gland seal steam pressure increasing energy consumption",
        "Observed_Value": "0.45 MPa",
        "Expected_Range": "0.30-0.40 MPa"
    },
    {
        "timestamp": "2024-11-04",
        "Issue": "High CT fan power consumption reducing net plant efficiency",
        "Observed_Value": "180 kW",
        "Expected_Range": "140-160 kW"
    },
    {
        "timestamp": "2024-10-05",
        "Issue": "Vacuum pressure deviating from optimal levels",
        "Observed_Value": "91.5 kPa",
        "Expected_Range": "92.5-93.0 kPa"
    },
    {
        "timestamp": "2024-09-06",
        "Issue": "Cooling water inlet temperature higher than standard",
        "Observed_Value": "33°C",
        "Expected_Range": "28-30°C"
    },
    {
        "timestamp": "2024-10-07",
        "Issue": "Reduced heat transfer efficiency in condenser tubes",
        "Observed_Value": "70%",
        "Expected_Range": "80-85%"
    },
    {
        "timestamp": "2024-11-08",
        "Issue": "CW flow rate not meeting the design requirements",
        "Observed_Value": "4500 m³/hr",
        "Expected_Range": "5000-5500 m³/hr"
    },
    {
        "timestamp": "2024-11-09",
        "Issue": "High dissolved oxygen levels in cooling water",
        "Observed_Value": "8 ppm",
        "Expected_Range": "3-5 ppm"
    },
    {
        "timestamp": "2024-11-10",
        "Issue": "Fouling factor in condenser tubes exceeding limit",
        "Observed_Value": "0.0012",
        "Expected_Range": "0.0008-0.0010"
    }
    
];

function fetchDataByDate() {
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;

    if (!startDate || !endDate) {
        alert("Please select both start and end dates.");
        return;
    }

    const filteredData = sampleData.filter(row => 
        new Date(row.timestamp) >= new Date(startDate) && 
        new Date(row.timestamp) <= new Date(endDate)
    );

    populateTable(filteredData);
}

function fetchDataByTime(period) {
    const now = new Date();
    let startDate;

    switch (period) {
        case "day":
            startDate = new Date(now);
            startDate.setDate(now.getDate() - 1);
            break;
        case "week":
            startDate = new Date(now);
            startDate.setDate(now.getDate() - 7);
            break;
        case "month":
            startDate = new Date(now);
            startDate.setMonth(now.getMonth() - 1);
            break;
        case "quarter":
            startDate = new Date(now);
            startDate.setMonth(now.getMonth() - 3);
            break;
        default:
            return;
    }

    const filteredData = sampleData.filter(row => 
        new Date(row.timestamp) >= startDate
    );

    populateTable(filteredData);
}

function populateTable(data) {
    const tableBody = document.querySelector("#dataTable tbody");
    tableBody.innerHTML = "";

    if (data.length === 0) {
        tableBody.innerHTML = "<tr><td colspan='4'>No data available</td></tr>";
        return;
    }

    data.forEach(row => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${row.timestamp}</td>
            <td>${row.Issue}</td>
            <td>${row.Observed_Value}</td>
            <td>${row.Expected_Range}</td>
        `;
        tableBody.appendChild(tr);
    });
}

function downloadCSV() {
    const rows = [["Time", "Issue", "Observed Value", "Expected Range"]];
    const tableRows = document.querySelectorAll("#dataTable tbody tr");

    tableRows.forEach(row => {
        const cells = Array.from(row.children).map(cell => cell.textContent);
        rows.push(cells);
    });

    const csvContent = rows.map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "data.csv";
    a.click();
    URL.revokeObjectURL(url);
}

function downloadPDF() {
    const { jsPDF } = window.jspdf;

    // Create a new jsPDF instance
    const pdf = new jsPDF();

    // Add header and footer
    const addHeaderAndFooter = (doc) => {
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;
        const pageCount = doc.internal.getNumberOfPages();

        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);

            // Add header
            const logoURL = 'logo.png'; // Replace with the actual logo URL or Base64 string
            doc.addImage(logoURL, 'PNG', 10, 5, 25, 12); // Position and scale the logo
            doc.setFontSize(18);
            doc.text("Diagnostic Report", 40, 12); // Heading next to the logo

            // Add a black line after the header
            doc.setDrawColor(0); // Black color
            doc.setLineWidth(0.5);
            doc.line(10, 20, pageWidth - 10, 20); // Horizontal line (x1, y1, x2, y2)

            // Add footer
            const date = new Date();
            const dateStr = date.toLocaleDateString();
            const timeStr = date.toLocaleTimeString();
            doc.setFontSize(10);
            doc.text(`Date: ${dateStr} Time: ${timeStr}`, 10, pageHeight - 15); // Left footer text
            doc.text(`Page ${i} of ${pageCount}`, pageWidth - 40, pageHeight - 15); // Right footer text

            // Add a black line before the footer
            doc.line(10, pageHeight - 20, pageWidth - 10, pageHeight - 20); // Horizontal line
        }
    };

    // Add title to the PDF
    // pdf.text("Diagnostic Report", 10, 10);

    // Fetch table data
    const tableRows = [];
    const tableHeaders = ["Time", "Issue", "Observed Value", "Expected Range"];
    tableRows.push(tableHeaders);

    const tableData = document.querySelectorAll("#dataTable tbody tr");
    tableData.forEach(row => {
        const rowData = Array.from(row.children).map(cell => cell.textContent);
        tableRows.push(rowData);
    });

    // Add the table to the PDF using jsPDF's autoTable plugin
    pdf.autoTable({
        head: [tableHeaders],
        body: tableRows.slice(1),
        startY: 30,
    });

    // Add header and footer
    addHeaderAndFooter(pdf);

    // Generate filename with current date and time
    const date = new Date();
    const formattedDate = date.toISOString().slice(0, 10); // YYYY-MM-DD format
    const formattedTime = date.toTimeString().slice(0, 8).replace(/:/g, "-"); // HH-MM-SS format
    const filename = `Diagnostic-Report-${formattedDate}_${formattedTime}.pdf`;

    // Save the PDF
    pdf.save(filename);
}



// Set current date
document.getElementById('current-date').textContent = new Date().toLocaleDateString();

// Hardcoded vacuum data
const data = [
    { date: "2024-12-14", vacuum: -89.5, savingsKcal: 7.11, savingsRs: 99540 },
    { date: "2024-12-15", vacuum: -89.4, savingsKcal: 7.15, savingsRs: 100050 },
    { date: "2024-12-16", vacuum: -88.3, savingsKcal: 7.12, savingsRs: 90600 },
    { date: "2024-12-17", vacuum: -89.2, savingsKcal: 7.13, savingsRs: 99720 },
    { date: "2024-12-18", vacuum: -89.1, savingsKcal: 7.14, savingsRs: 99840 },
    { date: "2024-12-19", vacuum: -89.0, savingsKcal: 7.16, savingsRs: 100200 },
    { date: "2024-12-20", vacuum: -89.2, savingsKcal: 7.18, savingsRs: 100500 },
];

// Default timeframe
document.getElementById('start-date').valueAsDate = new Date(new Date().setDate(new Date().getDate() - 7));
document.getElementById('end-date').valueAsDate = new Date();

// Filter data and update summary
const filterData = (startDate, endDate) => {
    const filtered = data.filter(d => new Date(d.date) >= new Date(startDate) && new Date(d.date) <= new Date(endDate));
    updateSummary(filtered);
    updateTable(filtered);
    updateChart(filtered);
};

// Update summary
const updateSummary = (filtered) => {
    const totalKcal = filtered.reduce((sum, row) => sum + row.savingsKcal, 0).toFixed(2);
    const totalRs = filtered.reduce((sum, row) => sum + row.savingsRs, 0).toFixed(2);
    document.getElementById('total-kcal').textContent = `${totalKcal} kCal`;
    document.getElementById('total-rs').textContent = `₹${totalRs}`;
};

// Update table
const updateTable = (filtered) => {
    const tableBody = document.getElementById('benefit-data-table').querySelector('tbody');
    tableBody.innerHTML = '';
    filtered.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.date}</td>
            <td>${row.vacuum}</td>
            <td>${row.savingsKcal}</td>
            <td>${row.savingsRs}</td>
        `;
        tableBody.appendChild(tr);
    });
};

// Initialize chart
let chart;
const updateChart = (filteredData) => {
    const ctx = document.getElementById('vacuumChart').getContext('2d');

    const labels = filteredData.map(entry => entry.date);
    const vacuumLevels = filteredData.map(entry => entry.vacuum);
    const savingsRs = filteredData.map(entry => entry.savingsRs);

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'line', // Use line chart
        data: {
            labels,
            datasets: [
                {
                    label: 'Vacuum Levels (KPA)',
                    data: vacuumLevels,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 2,
                    yAxisID: 'y-vacuum',
                    fill: false // Disable fill to remove area chart
                },
                {
                    label: 'Daily Savings (₹)',
                    data: savingsRs,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderWidth: 2,
                    yAxisID: 'y-savings',
                    fill: false // Disable fill to remove area chart
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Vacuum Performance and Daily Savings Over Time' }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Date'
                    }
                },
                'y-vacuum': {
                    type: 'linear',
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Vacuum Levels (KPA)'
                    },
                    grid: { drawOnChartArea: true }
                },
                'y-savings': {
                    type: 'linear',
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Daily Savings (₹)'
                    },
                    grid: { drawOnChartArea: false } // Disable grid lines for this axis
                }
            }
        }
    });
};


// Event listener for report update
document.getElementById('update-report').addEventListener('click', () => {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    filterData(startDate, endDate);
});

// Initial load
filterData(document.getElementById('start-date').value, document.getElementById('end-date').value);

// Generate and download report
document.getElementById('generate-report').addEventListener('click', () => {
    const downloadButton = document.getElementById('download-pdf');
    downloadButton.disabled = false;
});

document.getElementById('download-pdf').addEventListener('click', () => {
    const element = document.body;
    const options = {
        margin: 1,
        filename: `Vacuum_Report_${new Date().toLocaleDateString()}.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(options).from(element).save();
});

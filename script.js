function updateTime() {
  const timeElement = document.getElementById('time');
  const now = new Date();

  // Format the date as DD:MM:YY
  const day = now.getDate().toString().padStart(2, '0'); // Ensures 2-digit format
  const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
  const year = now.getFullYear().toString().slice(-2); // Gets the last 2 digits of the year
  const date = `${day}-${month}-${year} `;

  // Format the time as HH:MM
  const hours = now.getHours().toString().padStart(2, '0'); // Ensures 2-digit format
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const time = `${hours}:${minutes}`;

  // Display the date and time
  timeElement.textContent = `${date} ${time}`;
}

function updateLocation() {
  const locationElement = document.getElementById('location');
  locationElement.textContent = "Tiroda, Maharashtra";
}

function plotSmallChart1() {
  const trace = {
    x: ['Mon', 'Tue', 'Wed', 'Thurs', 'Fri'],
    y: [2000, 1850, 1900, 2000, 1980],
    type: 'scatter',
    mode: 'lines+markers',
    line: { color: '#0073e6', width: 2 },
    marker: { size: 5, color: '#ff6600' }
  };

  const layout = {
    margin: { t: 25, b: 25, l: 45, r: 25 },
    title: { text: 'Total Fan Current (Amp)', font: { size: 12 ,family: 'CustomFont'} },
  };

  const config = { responsive: true , displayModeBar: false };

  Plotly.newPlot('small-chart-1', [trace], layout, config);
}

function plotSmallChart2() {
  const trace = {
    x: ['Mon', 'Tue', 'Wed', 'Thurs', 'Fri'],
    y: [74000, 74500, 74550, 76000, 75500],
    type: 'scatter',
    mode: 'lines+markers',
    line: { color: '#0073e6', width: 2 },
    marker: { size: 5, color: '#ff6600' }
  };

  const layout = {
    margin: { t: 25, b: 25, l: 45, r: 25 },
    title: { text: 'Cw Flow (m3/hr)', font: { size: 12 ,family: 'CustomFont'} },
  };

  const config = { responsive: true , displayModeBar: false };

  Plotly.newPlot('small-chart-2', [trace], layout, config);
}

function plotTwoLineChart() {
  // Trace for the first line
  const trace1 = {
    x: ['Mon', 'Tue', 'Wed', 'Thurs', 'Fri'],
    y: [135, 138, 142, 137, 145],
    type: 'scatter',
    mode: 'lines+markers',
    line: { color: '#0073e6', width: 2 },
    marker: { size: 5, color: '#ff6600' },
    name: 'PUMP A', // Line name for legend
  };

  // Trace for the second line
  const trace2 = {
    x: ['Mon', 'Tue', 'Wed', 'Thurs', 'Fri'],
    y: [145, 140, 138, 142, 145],
    type: 'scatter',
    mode: 'lines+markers',
    line: { color: '#ff6600', width: 2 },
    marker: { size: 5, color: '#0073e6' },
    name: 'PUMP B', // Line name for legend
  };

  // Layout for the chart
  const layout = {
    margin: { t: 25, b: 25, l: 45, r: 25 },
    // legend: { orientation: 'h', y: -0.2 }, // Horizontal legend
    title: { text: 'VACUUM PUMP CURRENT (Amp)', font: { size: 12 ,family: 'CustomFont'} },
    // xaxis: { title: 'Month' },
    // yaxis: { title: 'Flow Rate' },
    showlegend: false, // To show the legend for both lines
  };

  const config = {
    responsive: true,
    displayModeBar: false,
  };

  // Plotting both traces on the same chart
  Plotly.newPlot('small-chart-3', [trace1, trace2], layout, config);
}


function plotLargeLineChart() {
  const trace1 = {
    x: ['Mon', 'Tue', 'Wed', 'Thurs', 'Fri'],
    y: [-86, -86.5, -88, -89, -91],
    mode: 'lines+markers',
    name: 'Lower',
    line: { color: '#FFA500', width: 2 }, // Orange
    marker: { size: 6 }
  };

  const trace2 = {
    x: ['Mon', 'Tue', 'Wed', 'Thurs', 'Fri'],
    y: [-85, -86, -87, -88.2, -89.5],
    mode: 'lines+markers',
    name: 'Upper',
    line: { color: '#FF0000', width: 2 }, // red
    marker: { size: 6 }
  };

  const trace3 = {
    x: ['Mon', 'Tue', 'Wed', 'Thurs', 'Fri'],
    y: [-85.5, -86.3, -85, -88.5, -91.5],
    mode: 'lines+markers',
    name: 'Raw Value',
    line: { color: '#1f77b4', width: 2 }, // Blue
    marker: { size: 6 }
  };

  const trace4 = {
    x: ['Mon', 'Tue', 'Wed', 'Thurs', 'Fri'],
    y: [-85.3, -86.4, -84.8, -88.5, -91.6],
    mode: 'lines+markers',
    name: 'Prediction',
    line: { color: '#2ca02c', width: 2 }, // green
    marker: { size: 6 }
  };

  const data = [trace1, trace2, trace3, trace4];

  const layout = {
    // title: 'Modelling',
    title: { text: 'Modelling', font: { size: 18 ,family: 'CustomFont'} },
    // xaxis: { title: 'Months' },
    yaxis: { title: 'Condenser Vacuum' , family: 'CustomFont' },
    legend: { orientation: 'h', y: -0.2 }, // Horizontal legend
    margin: { t: 50, b: 50, l: 50, r: 50 },
    plot_bgcolor: '#f9f9f9',
    paper_bgcolor: '#ffffff'
  };

  const config = { responsive: true , displayModeBar: false  };

  Plotly.newPlot('large-line-chart', data, layout, config);
}

// Function to update the color box based on the filled value
function updateColorBox(filledValue, totalValue, boxId) {
  const fillElement = document.getElementById('color-fill-' + boxId);
  const filledDisplay = document.getElementById('filled-value-' + boxId);

  // Update the displayed filled value (no total value shown)
  filledDisplay.textContent = filledValue;

  // Calculate the percentage of fill (if you still want to change the color based on the percentage)
  const percentage = (filledValue / totalValue) * 100;

  // Update the width of the fill
  fillElement.style.width = percentage + '%';

  // Add color class based on the percentage
  if (percentage <= 30) {
    fillElement.className = 'fill low'; // Red
  } else if (percentage <= 70) {
    fillElement.className = 'fill medium'; // Yellow
  } else {
    fillElement.className = 'fill high'; // Green
  }
}

// Example usage: Update color boxes with different filled values
updateColorBox(658,660, 1); // Box 1: 73.5%
updateColorBox(1931,1959, 2);  // Box 2: 60%
updateColorBox(44, 55, 3);  // Box 3: 20%
updateColorBox(-89.2, -91, 4);  // Box 3: 20%


window.onload = () => {
  updateTime();
  updateLocation();
  setInterval(updateTime, 1000);
  plotSmallChart1(); // Render the small chart
  plotSmallChart2();
  plotTwoLineChart();
  plotLargeLineChart(); // Render the large chart
};

const recommendations = [
  {
    "date": "2024-11-28",
    "time": "10:30 AM",
    "issue": "Condenser vacuum pressure deviation",
    "observed": "72.5 KPA",
    "expected": "74-76 KPA"
  },
  {
    "date": "2024-11-29",
    "time": "02:15 PM",
    "issue": "High exhaust steam pressure",
    "observed": "0.16 MPa",
    "expected": "0.10-0.14 MPa"
  },
  {
    "date": "2024-11-30",
    "time": "09:45 AM",
    "issue": "Gland steam pressure too high",
    "observed": "0.42 MPa",
    "expected": "0.30-0.38 MPa"
  },
  {
    "date": "2024-12-01",
    "time": "11:00 AM",
    "issue": "Reduced condenser heat transfer efficiency",
    "observed": "68%",
    "expected": "80-85%"
  },
  {
    "date": "2024-12-02",
    "time": "01:30 PM",
    "issue": "High dissolved oxygen in condenser water",
    "observed": "7.5 ppm",
    "expected": "3-5 ppm"
  },
  {
    "date": "2024-12-03",
    "time": "08:20 AM",
    "issue": "Condenser fouling factor exceeding limits",
    "observed": "0.0013",
    "expected": "0.0008-0.0010"
  },
  {
    "date": "2024-12-04",
    "time": "03:45 PM",
    "issue": "Cooling water outlet temperature anomaly",
    "observed": "36°C",
    "expected": "30-32°C"
  },
  {
    "date": "2024-12-05",
    "time": "10:10 AM",
    "issue": "Inadequate steam flow to condenser",
    "observed": "1200 kg/hr",
    "expected": "1400-1500 kg/hr"
  }
  
];


// Target the container
// const container = document.getElementById('recommendations');

// // Generate recommendation boxes
// recommendations.forEach(item => {
//   const box = document.createElement('div');
//   box.className = 'recommendation-box';
//   box.innerHTML = `
//     <p><strong>Time:</strong> ${item.date} ${item.time}</p>
//     <p><strong>Issue:</strong> ${item.issue}</p>
//     <p><strong>Observed Value:</strong> ${item.observed}</p>
//     <p><strong>Expected Value Band:</strong> ${item.expected}</p>
//   `;
//   container.appendChild(box);
// });

function showPopup(issue, message) {
  const popup = document.getElementById('popup');
  const titleElement = document.getElementById('popup-title');
  const messageElement = document.getElementById('popup-message');

  // Update title and message dynamically
  titleElement.textContent = issue ? `Issue Update: "${issue}"` : "Update Status";
  messageElement.textContent = message;

  // Display the popup
  popup.style.display = 'flex';
}

function closePopup() {
  const popup = document.getElementById('popup');
  popup.style.display = 'none';
}

// Function to update recommendation
async function updateRecommendation(issue, time, status = null, comment = null) {
  const url = "http://10.79.58.13/recom/api/update_recommendation";

  // Build the payload dynamically based on the provided values
  const payload = {
    issue,
    time,
    ...(status && { status }), // Add status only if it's provided
    ...(comment && { comment }) // Add comment only if it's provided
  };

  try {
    // Send POST request to the server
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Error updating recommendation: ${response.statusText}`);
    }

    const result = await response.json();
    console.log(`Update Successful:`, result);

    // Show a confirmation popup
    // alert(`The issue "${issue}" has been updated successfully.${status ? ` Status: ${status}.` : ''}${comment ? ` Comment: ${comment}.` : ''}`);
    // const message = `The issue "${issue}" has been updated successfully.` +
    //               (status ? ` Status: ${status}.` : '') +
    //               (comment ? ` Comment: ${comment}.` : '');
    const message = `The issue  has been updated successfully.` +
    (status ? ` Status: ${status}.` : '') +
    (comment ? ` Comment: ${comment}.` : '');
      
    showPopup(issue,message)

  } catch (error) {
    console.error("Error:", error);
    // alert(`Failed to update the issue "${issue}". Please try again.`);
    // const message = `Failed to update the issue "${issue}". Please try again.`
    const message = `Failed to update the issue. Please try again.`
    showPopup(issue,message)
  }
}


// Target the container
const container = document.getElementById('recommendations');

// Generate recommendation boxes
recommendations.forEach(item => {
  const box = document.createElement('div');
  box.className = 'recommendation-box';

  // Generate inner content
  box.innerHTML = `
    <p><strong>Time:</strong> ${item.date} ${item.time}</p>
    <p><strong>Issue:</strong> ${item.issue}</p>
    <p><strong>Observed Value:</strong> ${item.observed}</p>
    <p><strong>Expected Value Band:</strong> ${item.expected}</p>
    <div class="action-buttons">
      <button class="accept-btn">Accept</button>
      <button class="reject-btn">Reject</button>
      <button class="comment-btn">Comment</button>
    </div>
    <div class="comment-box" style="display: none;">
      <textarea placeholder="Add your comments here..."></textarea>
      <button class="submit-comment-btn">Submit</button>
    </div>
  `;

  // Append the box to the container
  container.appendChild(box);

  // Add event listeners
  const acceptBtn = box.querySelector('.accept-btn');
  const rejectBtn = box.querySelector('.reject-btn');
  const commentBtn = box.querySelector('.comment-btn');
  const commentBox = box.querySelector('.comment-box');
  const submitCommentBtn = box.querySelector('.submit-comment-btn');
  const textarea = box.querySelector('textarea');

  acceptBtn.addEventListener('click', () => {
    console.log(`Diagnosis accepted: ${item.issue}`);
    updateRecommendation(item.issue, item.time, "Accept");
    // Add functionality to handle acceptance
  });

  rejectBtn.addEventListener('click', () => {
    console.log(`Diagnosis rejected: ${item.issue}`);
    updateRecommendation(item.issue, item.time, "Reject");
    // Add functionality to handle rejection
  });

  commentBtn.addEventListener('click', () => {
    commentBox.style.display = commentBox.style.display === 'none' ? 'block' : 'none';
  });

  submitCommentBtn.addEventListener('click', () => {
    const comment = textarea.value.trim();
    if (comment) {
      console.log(`Comment submitted for '${item.issue}': ${comment}`);
      updateRecommendation(item.issue, item.time, null, comment);
      // Add functionality to save the comment
      textarea.value = ''; // Clear the textarea
      commentBox.style.display = 'none'; // Hide the comment box
    } else {
      console.log('No comment entered.');
    }
  });
});

function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  }
  
  function validatePhone(phone) {
    // Example: Validating Indian phone number (10 digits, starting with a valid prefix)
    const phoneRegex = /^[6-9][0-9]{9}$/;
    return phoneRegex.test(phone);
  }
  
  function handleFeedback(event) {
    event.preventDefault();  // Prevent default form submission
  
    const form = event.target;
    const name = form.name.value.trim();
    const site = form.site.value.trim();
    const department = form.department.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const feedback = form.feedback.value.trim();
  
    // Check if all required fields are filled
    if (!name || !site || !department || !email || !phone || !feedback) {
      alert("Please fill in all the required fields.");
      return;
    }
  
    // Validate email format
    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }
  
    // Validate phone number format
    if (!validatePhone(phone)) {
      alert("Please enter a valid phone number (e.g., 10 digits, starting with 6-9).");
      return;
    }
  
    // Show the thank you message and hide the form
    document.getElementById('form-container').style.display = 'none';
    document.getElementById('thank-you-message').style.display = 'block';
  
    // Optional: Send data to a server or an email (this part would require additional setup)
    // Example using fetch (you can replace it with your actual mail sending functionality)
    fetch('YOUR_API_ENDPOINT', {
      method: 'POST',
      body: new FormData(form),
    }).then(response => {
      if (response.ok) {
        console.log('Feedback sent successfully');
      } else {
        console.error('Failed to send feedback');
      }
    }).catch(error => {
      console.error('Error:', error);
    });
  }
  
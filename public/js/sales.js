// Function to validate the sales form
function validateSaleForm() {
  let isValid = true;

    // Automatically set current date and time for the "Date and Time" field
    const dateTimeInput = document.getElementById('dateTime');
    const now = new Date();
    
    // Format the date and time to match the `datetime-local` input format
    const formattedDateTime = now.toISOString().slice(0, 16);
    dateTimeInput.value = formattedDateTime;
    
    // Form validation function (if you already have one)
    document.getElementById('Form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Add validation and form submission logic here, if necessary
        const formData = new FormData(this);
        // Proceed with form submission logic or validation
    });

  // Clear previous error messages and success message
  document.querySelectorAll('small.error').forEach(el => el.textContent = '');
  const successMessage = document.querySelector('small.success');
  if (successMessage) successMessage.remove();

  // Get form values
  const produceName = document.getElementById('produceName').value;
  const tonnage = document.getElementById('tonnage').value;
  const amountPaid = document.getElementById('amountPaid').value;
  const buyerName = document.getElementById('buyerName').value;
  const salesAgent = document.getElementById('salesAgent').value;
  const dateTime = document.getElementById('dateTime').value;
  const totalPayment = document.getElementById('totalpayment').value;

  // Validate produceName
  if (!produceName) {
    document.getElementById('produceNameError').textContent = 'Please select a produce.';
    isValid = false;
  }

  // Validate tonnage
  if (!tonnage || tonnage <= 0) {
    document.getElementById('tonnageError').textContent = 'Please enter a valid tonnage.';
    isValid = false;
  }

  // Validate amountPaid
  if (!amountPaid || isNaN(amountPaid) || amountPaid <= 0) {
    document.getElementById('amountPaidError').textContent = 'Please enter a valid amount paid.';
    isValid = false;
  }

  // Validate buyerName
  if (!buyerName) {
    document.getElementById('buyerNameError').textContent = 'Please enter the buyer\'s name.';
    isValid = false;
  }

  // Validate salesAgent
  if (!salesAgent) {
    document.getElementById('salesAgentError').textContent = 'Please select a sales agent.';
    isValid = false;
  }

  // Validate dateTime
  if (!dateTime) {
    document.getElementById('dateTimeError').textContent = 'Please select a date and time.';
    isValid = false;
  }

  // Validate totalPayment
  if (!totalPayment || isNaN(totalPayment) || totalPayment < 0) {
    document.getElementById('totalpaymentError').textContent = 'Please enter a valid total payment.';
    isValid = false;
  }

  // If form is valid, display success message
  if (isValid) {
    document.getElementById('Form').insertAdjacentHTML('beforeend', '<small class="success" style="color:green;">Form submitted successfully!</small>');
  }

  return isValid; // Return the form's validity status
}

// Function to clear the form fields
function clearForm() {
  document.getElementById('Form').reset(); // Resets the form fields to default values

  // Clear any error or success messages
  document.querySelectorAll('small.error').forEach(el => el.textContent = '');
  const successMessage = document.querySelector('small.success');
  if (successMessage) successMessage.remove();
}

// Function to update the total payment automatically
function updateTotalPayment() {
  const tonnage = parseFloat(document.getElementById('tonnage').value) || 0;
  const amountPaid = parseFloat(document.getElementById('amountPaid').value) || 0;
  const totalPayment = tonnage * amountPaid;
  document.getElementById('totalpayment').value = totalPayment.toFixed(2); // Update totalPayment field
}

// Add event listeners to update total payment on input changes
document.getElementById('tonnage').addEventListener('input', updateTotalPayment);
document.getElementById('amountPaid').addEventListener('input', updateTotalPayment);

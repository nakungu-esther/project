// Function to validate the sales form
function validateSaleForm() {
  let isValid = true;

  // Clear previous error messages
  document.querySelectorAll('small.error').forEach(el => el.textContent = '');
  document.querySelectorAll('small.success').forEach(el => el.textContent = '');

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

  // Display success message if the form is valid
  if (isValid) {
    document.querySelector('form').insertAdjacentHTML('beforeend', '<small class="success">Form submitted successfully!</small>');
  }

  return isValid;
}

// Function to clear the form fields
function clearForm() {
  document.getElementById('Form').reset(); // Resets the form fields to default values

  // Clear any error or success messages
  document.querySelectorAll('small.error').forEach(el => el.textContent = '');
  document.querySelectorAll('small.success').forEach(el => el.textContent = '');
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

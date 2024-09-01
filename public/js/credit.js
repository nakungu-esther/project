document.addEventListener('DOMContentLoaded', function() {
  const tonnageInput = document.getElementById('tonnage');
  const costInput = document.getElementById('cost');
  const totalCostInput = document.getElementById('totalcost');

  function calculateTotalCost() {
    const tonnage = parseFloat(tonnageInput.value) || 0;
    const cost = parseFloat(costInput.value) || 0;
    const totalCost = tonnage * cost;
    totalCostInput.value = totalCost.toFixed(2); // Keeping two decimal places
  }

  // Event listeners to recalculate total cost when tonnage or cost changes
  tonnageInput.addEventListener('input', calculateTotalCost);
  costInput.addEventListener('input', calculateTotalCost);
});

function validateForm() {
  let isValid = true;

  const buyerName = document.getElementById('buyerName');
  const nationalId = document.getElementById('nationalId');
  const location = document.getElementById('location');
  const contacts = document.getElementById('contacts');
  const amountDue = document.getElementById('amountDue');
  const salesAgent = document.getElementById('salesAgent');
  const dueDate = document.getElementById('dueDate');
  const produceName = document.getElementById('produceName');
  const produceType = document.getElementById('produceType');
  const tonnage = document.getElementById('tonnage');
  const dispatchDate = document.getElementById('dispatchDate');

  const buyerNameError = document.getElementById('buyerNameError');
  const nationalIdError = document.getElementById('nationalIdError');
  const locationError = document.getElementById('locationError');
  const contactsError = document.getElementById('contactsError');
  const amountDueError = document.getElementById('amountDueError');
  const salesAgentError = document.getElementById('salesAgentError');
  const dueDateError = document.getElementById('dueDateError');
  const produceNameError = document.getElementById('produceNameError');
  const produceTypeError = document.getElementById('produceTypeError');
  const tonnageError = document.getElementById('tonnageError');
  const dispatchDateError = document.getElementById('dispatchDateError');

  // Validation logic
  if (!buyerName.value || buyerName.value.length < 2) {
    buyerNameError.textContent = 'Buyer\'s name should be at least 2 characters.';
    isValid = false;
  } else {
    buyerNameError.textContent = '';
  }

  if (!nationalId.value || !/^[A-Z0-9]{13}$/.test(nationalId.value)) {
    nationalIdError.textContent = 'National ID must be a valid NIN format (13 characters, alphanumeric).';
    isValid = false;
  } else {
    nationalIdError.textContent = '';
  }

  if (!location.value || location.value.length < 2) {
    locationError.textContent = 'Location should be at least 2 characters.';
    isValid = false;
  } else {
    locationError.textContent = '';
  }

  if (!contacts.value || !/^\d{10}$/.test(contacts.value)) {
    contactsError.textContent = 'Contacts must be a valid phone number format (10 digits).';
    isValid = false;
  } else {
    contactsError.textContent = '';
  }

  if (!amountDue.value || amountDue.value.length < 5) {
    amountDueError.textContent = 'Amount due should be at least 5 characters.';
    isValid = false;
  } else {
    amountDueError.textContent = '';
  }

  if (!salesAgent.value || salesAgent.value.length < 2) {
    salesAgentError.textContent = 'Sales agent\'s name should be at least 2 characters.';
    isValid = false;
  } else {
    salesAgentError.textContent = '';
  }

  if (!dueDate.value) {
    dueDateError.textContent = 'Due date cannot be empty.';
    isValid = false;
  } else {
    dueDateError.textContent = '';
  }

  if (!produceName.value) {
    produceNameError.textContent = 'Produce name cannot be empty.';
    isValid = false;
  } else {
    produceNameError.textContent = '';
  }

  if (!produceType.value) {
    produceTypeError.textContent = 'Type of produce cannot be empty.';
    isValid = false;
  } else {
    produceTypeError.textContent = '';
  }

  if (!tonnage.value || tonnage.value <= 0) {
    tonnageError.textContent = 'Tonnage must be a positive number.';
    isValid = false;
  } else {
    tonnageError.textContent = '';
  }

  if (!dispatchDate.value) {
    dispatchDateError.textContent = 'Date of dispatch cannot be empty.';
    isValid = false;
  } else {
    dispatchDateError.textContent = '';
  }

  if (!isValid) {
    alert('Please correct the errors in the form.');
  } else {
    alert('Form submitted successfully.');
    clearForm();
  }

  return isValid;
}

function clearForm() {
  document.querySelector('form').reset();
  const errorMessages = document.querySelectorAll('.error');
  errorMessages.forEach((error) => {
    error.textContent = '';
  });
}

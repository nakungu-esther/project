document.addEventListener('DOMContentLoaded', function() {
  const tonnageInput = document.getElementById('tonnage');
  const costInput = document.getElementById('cost');
  const totalCostInput = document.getElementById('totalcost');

  function calculateTotalCost() {
      const tonnage = parseFloat(tonnageInput.value) || 0;
      const cost = parseFloat(costInput.value) || 0;
      const totalCost = tonnage * cost;
      totalCostInput.value = totalCost;
  }

  // Event listeners to recalculate total cost when tonnage or cost changes
  tonnageInput.addEventListener('input', calculateTotalCost);
  costInput.addEventListener('input', calculateTotalCost);
});

function validateForm() {
  let isValid = true;

  const produceName = document.getElementById('produceName');
  const tonnage = document.getElementById('tonnage');
  const amountPaid = document.getElementById('amountPaid');
  const buyerName = document.getElementById('buyerName');
  const salesAgent = document.getElementById('salesAgent');
  const dateTime = document.getElementById('dateTime');
  const totalpayment = document.getElementById('totalpayment');

  const produceNameError = document.getElementById('produceNameError');
  const tonnageError = document.getElementById('tonnageError');
  const amountPaidError = document.getElementById('amountPaidError');
  const buyerNameError = document.getElementById('buyerNameError');
  const salesAgentError = document.getElementById('salesAgentError');
  const dateTimeError = document.getElementById('dateTimeError');
  const totalpaymentError = document.getElementById('totalpaymentError');

  if (!produceName.value) {
    produceNameError.textContent = 'Produce name cannot be empty.';
    isValid = false;
  } else {
    produceNameError.textContent = '';
  }

  if (!tonnage.value) {
    tonnageError.textContent = 'Tonnage cannot be empty.';
    isValid = false;
  } else {
    tonnageError.textContent = '';
  }

  if (!amountPaid.value || amountPaid.value.length < 5) {
    amountPaidError.textContent = 'Amount paid should be at least 5 characters.';
    isValid = false
  } else {
    amountPaidError.textContent = '';
  }

  if (!buyerName.value || buyerName.value.length < 2) {
    buyerNameError.textContent = 'Buyer\'s name should be at least 2 characters.';
    isValid = false;
  } else {
    buyerNameError.textContent = '';
  }

  if (!salesAgent.value || salesAgent.value.length < 2) {
    salesAgentError.textContent = 'Sales agent\'s name should be at least 2 characters.';
    isValid = false;
  } else {
    salesAgentError.textContent = '';
  }

  if (!dateTime.value) {
    dateTimeError.textContent = 'Date and time cannot be empty.';
    isValid = false;
  } else {
    dateTimeError.textContent = '';
  }

  if (!totalpayment.value) {
    totalpaymentError.textContent = 'Total payment cannot be empty.';
    isValid = false;
  } else {
    totalpaymentError.textContent = '';
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
  document.getElementById('Form').reset();
  const errorMessages = document.querySelectorAll('.error');
  errorMessages.forEach((error) => {
    error.textContent = '';
  });
}

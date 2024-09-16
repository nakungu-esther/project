document.addEventListener('DOMContentLoaded', function () {
  const submitButton = document.querySelector('button[type="submit"]');



  const now = new Date();

  const today = now.toISOString().split('T')[0];  // Current date in YYYY-MM-DD format
  document.getElementById('dispatchDate').value = today;

  // Attach event listener to the submit button
  submitButton.addEventListener('click', function (event) {
    // Call the validation function
    const isValid = validateCreditForm();

    // If the form is not valid, prevent submission
    if (!isValid) {
      event.preventDefault();
    } else {
      // Calculate the due amount
      calculateDueAmount();
    }
  });
});

function validateCreditForm() {
  let isValid = true;

  // Buyer Name Validation
  const buyerName = document.getElementById('buyerName').value;
  if (!/^[a-zA-Z0-9 ]{2,}$/.test(buyerName)) {
    document.getElementById('buyerNameError').textContent = 'Buyer name must be at least 2 characters.';
    isValid = false;
  } else {
    document.getElementById('buyerNameError').textContent = '';
  }

  // National ID Validation
  const nationalId = document.getElementById('nationalId').value;
  if (!/^[A-Z0-9]{13}$/.test(nationalId)) {
    document.getElementById('nationalIdError').textContent = 'Enter a valid NIN.';
    isValid = false;
  } else {
    document.getElementById('nationalIdError').textContent = '';
  }

  // Location Validation
  const location = document.getElementById('location').value;
  if (!/^[a-zA-Z0-9 ]{2,}$/.test(location)) {
    document.getElementById('locationError').textContent = 'Location must be at least 2 characters.';
    isValid = false;
  } else {
    document.getElementById('locationError').textContent = '';
  }

  // Contacts Validation
  const contacts = document.getElementById('contacts').value;
  if (!/^\+?\d{10,15}$/.test(contacts)) {
    document.getElementById('contactsError').textContent = 'Enter a valid phone number.';
    isValid = false;
  } else {
    document.getElementById('contactsError').textContent = '';
  }

  //Amount Due Validation
  // const amountDue = document.getElementById('amountDue').value;
  // if (!/^\d{6,}$/.test(amountDue)) {
  //   document.getElementById('amountDueError').textContent = 'Amount must be at least 5 digits.';
  //   isValid = false;
  // } else {
  //   document.getElementById('amountDueError').textContent = '';
  // }

  // Sales Agent Name Validation
  const salesAgent = document.getElementById('salesAgent').value;
  if (!/^[a-zA-Z0-9 ]{2,}$/.test(salesAgent)) {
    document.getElementById('salesAgentError').textContent = 'Sales agent name must be at least 2 characters.';
    isValid = false;
  } else {
    document.getElementById('salesAgentError').textContent = '';
  }

  // Due Date Validation
  const dueDate = document.getElementById('dueDate').value;
  if (!dueDate) {
    document.getElementById('dueDateError').textContent = 'Due date is required.';
    isValid = false;
  } else {
    document.getElementById('dueDateError').textContent = '';
  }

  // Produce Name Validation
  const produceName = document.getElementById('produceName').value;
  if (produceName === '') {
    document.getElementById('produceNameError').textContent = 'Please select a produce.';
    isValid = false;
  } else {
    document.getElementById('produceNameError').textContent = '';
  }

  // Produce Type Validation
  const produceType = document.getElementById('produceType').value;
  if (!/^[a-zA-Z0-9 ]{2,}$/.test(produceType)) {
    document.getElementById('produceTypeError').textContent = 'Type of produce must be at least 2 characters.';
    isValid = false;
  } else {
    document.getElementById('produceTypeError').textContent = '';
  }

  // Tonnage Validation
  const tonnage = document.getElementById('tonnage').value;
  if (!/^\d+$/.test(tonnage)) {
    document.getElementById('tonnageError').textContent = 'Tonnage must be a valid number.';
    isValid = false;
  } else {
    document.getElementById('tonnageError').textContent = '';
  }

  // Dispatch Date Validation
  const dispatchDate = document.getElementById('dispatchDate').value;
  if (!dispatchDate) {
    document.getElementById('dispatchDateError').textContent = 'Date of dispatch is required.';
    isValid = false;
  } else {
    document.getElementById('dispatchDateError').textContent = '';
  }

  return isValid;
}
document.addEventListener('DOMContentLoaded', function () {
  const submitButton = document.querySelector('button[type="submit"]');
  const amountPaidInput = document.getElementById('amountPaid');
  const totalPaymentInput = document.getElementById('totalPayment');
  const tonnageInput = document.getElementById('tonnage');
  const amountDueInput = document.getElementById('amountDue');

  if (!amountPaidInput || !totalPaymentInput || !tonnageInput || !amountDueInput) {
    console.error('One or more input elements not found.');
    return;
  }

  // Add event listeners to input fields
  totalPaymentInput.addEventListener('input', calculateDueAmount);
  tonnageInput.addEventListener('input', calculateDueAmount);
  amountPaidInput.addEventListener('input', calculateDueAmount);

  function calculateDueAmount() {
    const pricePerKg = parseFloat(totalPaymentInput.value) || 0;
    let tonnage = parseFloat(tonnageInput.value) || 0;
    const amountPaid = parseFloat(amountPaidInput.value) || 0;

    // Remove minimum tonnage enforcement
    // const minimumTonnage = 10;
    // if (tonnage < minimumTonnage) {
    //   tonnage = minimumTonnage;
    //   tonnageInput.value = minimumTonnage;  // Automatically set the tonnage to minimum in the input field
    // }

    const totalPayment = pricePerKg * tonnage;
    const amountDue = totalPayment - amountPaid;

    // Update the amount due input field
    amountDueInput.value = amountDue >= 0 ? amountDue.toFixed(1) : '0'; // Prevent negative values
  }

  // Form submission validation
  submitButton.addEventListener('click', function (event) {
    const isValid = validateCreditForm();

    if (!isValid) {
      event.preventDefault();
    }
  });
});


function checkDueDate() {
  const dueDateElement = document.getElementById('dueDate');
  const formColumn = dueDateElement.closest('.form-column'); // Get the closest form column
  const dueDateValue = new Date(dueDateElement.value);
  const today = new Date();

  // Reset the background color initially
  formColumn.classList.remove('overdue');

  // Compare the dates
  if (dueDateValue <= today) {
    // Add the 'overdue' class if due date is today or in the past
    formColumn.classList.add('overdue');
  }
}





function clearForm() {
  const form = document.getElementById('creditForm');
  if (form) {
    form.reset(); // Reset all form fields

    // Clear all error messages
    const errorMessages = document.querySelectorAll('small.error');
    errorMessages.forEach(function (error) {
      error.textContent = '';
    });

    // Reset balance due to 0
    document.getElementById('balanceDue').value = '';
  }
}

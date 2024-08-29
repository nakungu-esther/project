document.getElementById('procurementForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission

    // Clear previous error messages
    const errorElements = document.querySelectorAll('.error-message');

    errorElements.forEach(function(el) {
        el.textContent = '';
    });

    // Get form values
    const formData = {
        produceName: document.getElementById('produceName').value.trim(),
        produceType: document.getElementById('produceType').value.trim(),
        procureDate: document.getElementById('procureDate').value,
        procureTime: document.getElementById('procureTime').value,
        tonnage: document.getElementById('tonnage').value,
        cost: document.getElementById('cost').value,
        dealerName: document.getElementById('dealerName').value,
        branchName: document.getElementById('branchName').value,
        contact: document.getElementById('contact').value.trim(),
        sellingPrice: document.getElementById('sellingPrice').value
    };

    let hasError = false;

    // Validate form fields (add your validation checks here)
    if (formData.produceName === '' || !/^[A-Za-z0-9\s]+$/.test(formData.produceName)) {
        document.getElementById('produceNameError').textContent = 'Please enter a valid produce name.';
        hasError = true;
    }
    if (formData.produceType === '') {
        document.getElementById('produceTypeError').textContent = 'Please select a produce type.';
        hasError = true;
    }
    if (formData.procureDate === '') {
        document.getElementById('procureDateError').textContent = 'Please select a procurement date.';
        hasError = true;
    }
    if (formData.procureTime === '') {
        document.getElementById('procureTimeError').textContent = 'Please select a procurement time.';
        hasError = true;
    }
    if (isNaN(formData.tonnage) || formData.tonnage < 100) {
        document.getElementById('tonnageError').textContent = 'Please enter a valid tonnage (at least 100 kg).';
        hasError = true;
    }
    if (isNaN(formData.cost) || formData.cost < 10000) {
        document.getElementById('costError').textContent = 'Please enter a valid cost (at least 10,000 UgX).';
        hasError = true;
    }
    if (formData.dealerName === '') {
        document.getElementById('dealerNameError').textContent = 'Please select a dealer name.';
        hasError = true;
    }
    if (formData.branchName === '') {
        document.getElementById('branchNameError').textContent = 'Please select a branch name.';
        hasError = true;
    }
    if (formData.contact === '' || !/^\+256\d{9}$/.test(formData.contact)) {
        document.getElementById('contactError').textContent = 'Please enter a valid contact number (+256XXXXXXXXX).';
        hasError = true;
    }
    if (isNaN(formData.sellingPrice)) {
        document.getElementById('sellingPriceError').textContent = 'Please enter a valid selling price.';
        hasError = true;
    }

    document.querySelector('form').addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent the default form submission
      
        const formData = new FormData(e.target);
        
        try {
          const response = await fetch('/addProcurement', {
            method: 'POST',
            body: formData,
          });
      
          if (response.ok) {
            clearForm('procurementForm'); // Clear the form after successful submission
            alert('form successfully subumitted')
            window.location.href = '/cropProcurementList'; // Redirect to the procurement list
          } else {
            alert('Error submitting form');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('An error occurred while submitting the form.');
        }
      });
      
      function clearForm(formId) {
        const form = document.getElementById(formId);
        if (form) {
          form.reset(); // Resets all form fields to their default values
        }
      }
      
});

// // Function to clear the form
// function clearForm(formId) {
//     document.getElementById(formId).reset();
// }

// const socket = io();

// // Listen for update events from the server
// socket.on('updateData', () => {
//     fetchData(); // Refresh the counts on the cards
// });

// async function fetchData() {
//     const procurementCount = await fetch('/api/procurements/count').then(res => res.json());
//     document.getElementById('total-procurements').innerText = procurementCount.count;

//     const salesCount = await fetch('/api/sales/count').then(res => res.json());
//     document.getElementById('total-sales').innerText = salesCount.count;
// }

// fetchData(); // Call this function when the page loads

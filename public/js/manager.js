try {
    document.getElementById('procurementForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        // Get form values
        const produceName = document.getElementById('produceName').value.trim();
        const produceType = document.getElementById('produceType').value.trim();
        const procureDate = document.getElementById('procureDate').value;
        const procureTime = document.getElementById('procureTime').value;
        const tonnage = parseFloat(document.getElementById('tonnage').value);
        const cost = parseFloat(document.getElementById('cost').value);
        const dealerName = document.getElementById('dealerName').value;
        const branchName = document.getElementById('branchName').value;
        const contact = document.getElementById('contact').value.trim();
        const sellingPrice = parseFloat(document.getElementById('sellingPrice').value);

        // Validate form fields
        if (produceName === '' || !/^[A-Za-z0-9\s]+$/.test(produceName)) {
            alert('Please enter a valid produce name.');
            return;
        }
        if (produceType === '' || !/^[A-Za-z]{2,}$/.test(produceType)) {
            alert('Please enter a valid produce type (at least 2 letters).');
            return;
        }
        if (procureDate === '') {
            alert('Please select a procurement date.');
            return;
        }
        if (procureTime === '') {
            alert('Please select a procurement time.');
            return;
        }
        if (isNaN(tonnage) || tonnage < 100) {
            alert('Please enter a valid tonnage (at least 100 kg).');
            return;
        }
        if (isNaN(cost) || cost < 10000) {
            alert('Please enter a valid cost (at least 10,000 UgX).');
            return;
        }
        if (dealerName === '') {
            alert('Please select a dealer name.');
            return;
        }
        if (branchName === '') {
            alert('Please select a branch name.');
            return;
        }
        if (contact === '' || !/^\+256\d{9}$/.test(contact)) {
            alert('Please enter a valid contact number (+256XXXXXXXXX).');
            return;
        }
        if (isNaN(sellingPrice)) {
            alert('Please enter a valid selling price.');
            return;
        }

        alert("Procurement recorded successfully!");
        clearForm('procurementForm'); // Clear the form after successful submission
    });

    // Function to clear the form
    function clearForm(formId) {
        document.getElementById(formId).reset();
    }
} catch (error) {
    console.log(error);
    alert('An error occurred while processing the form. Please try again.');
}

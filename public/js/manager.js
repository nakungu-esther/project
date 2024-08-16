document.getElementById('procurementForm').addEventListener('submit', function(event) {
    // Get form elements
    const produceName = document.getElementById('produceName');
    const produceType = document.getElementById('produceType');
    const procureDate = document.getElementById('procureDate');
    const procureTime = document.getElementById('procureTime');
    const tonnage = document.getElementById('tonnage');
    const cost = document.getElementById('cost');
    const dealerName = document.getElementById('dealerName');
    const branchName = document.getElementById('branchName');
    const contact = document.getElementById('contact');
    const sellingPrice = document.getElementById('sellingPrice');
    
    let isValid = true;

    // Validate produce name (should not be empty)
    if (produceName.value.trim() === '') {
        isValid = false;
        alert('Please enter the name of the produce.');
    }

    // Validate produce type (should match the pattern)
    const produceTypePattern = /^[A-Za-z]{2,}$/;
    if (!produceTypePattern.test(produceType.value)) {
        isValid = false;
        alert('Please enter a valid type of produce (letters only, at least 2 characters).');
    }

    // Validate procurement date (should not be in the future)
    const today = new Date().toISOString().split('T')[0];
    if (procureDate.value > today) {
        isValid = false;
        alert('The procurement date cannot be in the future.');
    }

    // Validate procurement time (should not be empty)
    if (procureTime.value.trim() === '') {
        isValid = false;
        alert('Please enter the procurement time.');
    }

    // Validate tonnage (should be at least 100kg)
    if (tonnage.value < 100) {
        isValid = false;
        alert('The tonnage must be at least 100kg.');
    }

    // Validate cost (should be at least 10,000 UgX)
    if (cost.value < 10000) {
        isValid = false;
        alert('The cost must be at least 10,000 UgX.');
    }

    // Validate dealer name (should match the pattern)
    const dealerNamePattern = /^[A-Za-z0-9]{2,}$/;
    if (!dealerNamePattern.test(dealerName.value)) {
        isValid = false;
        alert('Please enter a valid dealer name (letters and numbers, at least 2 characters).');
    }

    // Validate contact (should match Ugandan phone number pattern)
    const contactPattern = /^\+256\d{9}$/;
    if (!contactPattern.test(contact.value)) {
        isValid = false;
        alert('Please enter a valid Ugandan contact number (e.g., +256712345678).');
    }

    // Validate selling price (should not be empty)
    if (sellingPrice.value <= 0) {
        isValid = false;
        alert('Please enter a valid selling price.');
    }

    // Prevent form submission if validation fails
    if (!isValid) {
        event.preventDefault();
    }
});

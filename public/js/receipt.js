// /public/js/credit-receipt.js

document.addEventListener('DOMContentLoaded', function() {
    // Print button functionality
    const printButton = document.querySelector('.btn-print');
    
    if (printButton) {
      printButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default anchor behavior
        window.print(); // Trigger the print dialog
      });
    }
  
    // Any additional JavaScript can be added here
  });
  
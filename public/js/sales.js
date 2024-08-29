document.addEventListener('DOMContentLoaded', () => {
  const showCreditFormBtn = document.getElementById('showCreditFormBtn');
  const showSalesFormBtn = document.getElementById('showSalesFormBtn');
  const showProduceFormBtn = document.getElementById('showProduceFormBtn');
 
  
  const creditFormContainer = document.getElementById('credit-form-container');
  const salesFormContainer = document.getElementById('sales-form-container');
  const produceFormContainer = document.getElementById('produce-form-container');
  

  showCreditFormBtn.addEventListener('click', () => {
      creditFormContainer.style.display = 'block'; // Show credit form
      salesFormContainer.style.display = 'none';   // Hide sales form
      produceFormContainer.style.display = 'none'; // Hide produce form
    
  });

  showSalesFormBtn.addEventListener('click', () => {
      salesFormContainer.style.display = 'block';  // Show sales form
      creditFormContainer.style.display = 'none';   // Hide credit form
      produceFormContainer.style.display = 'none'; // Hide produce form
     
  });

  showProduceFormBtn.addEventListener('click', () => {
      produceFormContainer.style.display = 'block'; // Show produce form
      creditFormContainer.style.display = 'none';   // Hide credit form
      salesFormContainer.style.display = 'none';    // Hide sales form
   
  });
 
});





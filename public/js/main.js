document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById('register-form');
  
  form.addEventListener('input', function(e) {
    const target = e.target;
    if (target.id === 'username' || target.id === 'email' || target.id === 'password' || target.id === 'corfirmpassword' || target.id === 'branch' || target.id === 'role') {
      validateInput(target);
    }
  });

  function validateInput(input) {
    if (input.value.trim() === '') {
      input.classList.remove('valid');
      input.classList.add('invalid');
    } else {
      input.classList.remove('invalid');
      input.classList.add('valid');
    }
  }
});

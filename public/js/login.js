// main.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
  
    if (form) {
      form.addEventListener('submit', (event) => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
  
        // Basic email validation
        if (!validateEmail(email)) {
          alert('Please enter a valid email address.');
          event.preventDefault(); // Prevent form submission
          return;
        }
  
        // Basic password check (e.g., non-empty)
        if (password.trim() === '') {
          alert('Password cannot be empty.');
          event.preventDefault(); // Prevent form submission
        }
      });
    }
  
    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }
  });
  const video = document.querySelector('.video-container video');

  if (video) {
    // Example: Pause video on form submit
    const form = document.getElementById('login-form');
    if (form) {
      form.addEventListener('submit', () => {
        video.pause();
      });
    }
  }
  
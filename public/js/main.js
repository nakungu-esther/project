


function submitForm() {
  // Collecting user inputs and storing them in variables
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const role = document.getElementById("role").value;
  const branch = document.getElementById("branch").value;
  const password = document.getElementById("password").value;
  const confirmpassword = document.getElementById("confirmpassword").value;

  const validEmailFormat =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  // Check if all fields are filled
  if (
    !username ||
    !email ||
    !role ||
    !branch ||
    !password ||
    !confirmpassword
  ) {
    alert("Please fill out all the required fields!");
    return;
  } else if (!email.match(validEmailFormat)) {
    // Check if email is valid
    alert("Please enter a valid email address!");
    return;
  } else if (password !== confirmpassword) {
    // Check if password matches confirm password
    alert("Passwords do not match, please try again!");
    return;
  } else {
    // If all checks pass, display success message
    alert("You have been successfully registered!");
    document.getElementById("form").reset(); // Reset form after successful submission
    return;
  }
}

// Get submit button and add event listener
const submitButton = document.getElementById("submit");

submitButton.addEventListener ("click", function (event) {
  event.preventDefault(); // Prevent form from submitting normally

  submitForm(); // Call function to validate and submit form
});

// Data for the pie chart
const data = {
  labels: ['Beans', 'Maize', 'G.nuts', 'Peas', 'Yellow Beans'],
  datasets: [{
    label: 'Grocery Stock',
    data: [60, 40, 20, 35, 15], // Example stock values
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)'
    ],
    borderColor: [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)'
    ],
    borderWidth: 1
  }]
};

// Configuration for the pie chart
const config = {
  type: 'pie',
  data: data,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true
      }
    }
  }
};

// Render the pie chart
const groceryStockChart = new Chart(
  document.getElementById('groceryStockChart'),
  config
);


// slider
  let swiper = new Swiper('.mySwiper', {
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    loop: true, // Enable continuous loop mode
    autoplay: {
      delay: 250,
      disableOnInteraction: false,
    },
  });

  


  
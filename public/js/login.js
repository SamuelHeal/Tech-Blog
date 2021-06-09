const loginForm = document.getElementById("loginForm")
const signUpForm = document.getElementById("signUpForm")
const signUpSwitch = document.getElementById("signUpBtn")
const loginSwitch = document.getElementById("loginBtn")

// functions to switch between login and signup forms on click
signUpSwitch.addEventListener("click", function() {
  loginForm.style.display = "none"
  signUpForm.style.display = "block"
})

loginSwitch.addEventListener("click", function() {
  loginForm.style.display = "block"
  signUpForm.style.display = "none"
})

// function to login
const loginManager = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert("Incorrect email or password");
    }
  }
};

// function to signup
const signupManager = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (name && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert("Please check the details you have entered are correct and try again");
    }
  }
};

document.querySelector('.login-form').addEventListener('submit', loginManager);
document.querySelector('.signup-form').addEventListener('submit', signupManager);


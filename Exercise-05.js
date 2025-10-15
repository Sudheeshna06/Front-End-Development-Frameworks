const form = document.getElementById("registrationForm");
const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const phone = document.getElementById("phone");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const phoneError = document.getElementById("phoneError");
const successMessage = document.getElementById("success-message");

// Validation Functions
function validateName() {
  if (fullName.value.trim() === "") {
    nameError.textContent = "Full name is required";
    fullName.classList.add("invalid");
    fullName.classList.remove("valid");
    return false;
  } else {
    nameError.textContent = "";
    fullName.classList.remove("invalid");
    fullName.classList.add("valid");
    return true;
  }
}

function validateEmail() {
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (email.value.trim() === "") {
    emailError.textContent = "Email is required";
    email.classList.add("invalid");
    return false;
  } else if (!emailPattern.test(email.value)) {
    emailError.textContent = "Invalid email format";
    email.classList.add("invalid");
    return false;
  } else {
    emailError.textContent = "";
    email.classList.remove("invalid");
    email.classList.add("valid");
    return true;
  }
}

function validatePassword() {
  const strongPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  if (password.value.trim() === "") {
    passwordError.textContent = "Password is required";
    password.classList.add("invalid");
    return false;
  } else if (!strongPassword.test(password.value)) {
    passwordError.textContent =
      "Password must be 8+ chars, include a number & special character";
    password.classList.add("invalid");
    return false;
  } else {
    passwordError.textContent = "";
    password.classList.remove("invalid");
    password.classList.add("valid");
    return true;
  }
}

function validatePhone() {
  const phonePattern = /^[0-9]{10}$/;
  if (phone.value.trim() === "") {
    phoneError.textContent = "Phone number is required";
    phone.classList.add("invalid");
    return false;
  } else if (!phonePattern.test(phone.value)) {
    phoneError.textContent = "Phone number must be 10 digits";
    phone.classList.add("invalid");
    return false;
  } else {
    phoneError.textContent = "";
    phone.classList.remove("invalid");
    phone.classList.add("valid");
    return true;
  }
}

// Event Listeners for Real-time Validation
fullName.addEventListener("input", validateName);
email.addEventListener("input", validateEmail);
password.addEventListener("input", validatePassword);
phone.addEventListener("input", validatePhone);

// Form Submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isPasswordValid = validatePassword();
  const isPhoneValid = validatePhone();

  if (isNameValid && isEmailValid && isPasswordValid && isPhoneValid) {
    successMessage.style.display = "block";
    form.reset();

    // Remove valid/invalid classes
    [fullName, email, password, phone].forEach((input) => {
      input.classList.remove("valid", "invalid");
    });
  } else {
    successMessage.style.display = "none";
  }
});

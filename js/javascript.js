const showPw = document.querySelector("#showPw");
const hidePw = document.querySelector("#hidePw");
const passwordVisibility = document.querySelector("#passwordVisibility");
const showConfirm = document.querySelector("#showConfirm");
const hideConfirm = document.querySelector("#hideConfirm");
const confirmVisibility = document.querySelector("#confirmVisibility");
const pwInput = document.querySelector("#password");
const confirmInput = document.querySelector("#password-confirm");
const submitButton = document.querySelector(".submit-button");
const frameLogo = document.querySelector("#frame-logo");

let pwMessage = document.querySelector("#passwordText");
let pwMessageAfter = document.querySelector(".password");
let confirmMessage = document.querySelector("#confirmText");
let confirmMessageAfter = document.querySelector(".password-confirm");

let password = null;

function isPasswordValid(input) {
  pwMessage.style.visibility = "visible";
  pwMessage.innerText = "";

  if (
    input.match(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$&+,:;=?@#|'<>.^*()%!-])[A-Za-z\d$&+,:;=?@#|'<>.^*()%!-]{8,}$/
    )
  ) {
    pwMessageAfter.classList.remove("invalid");
    pwMessageAfter.classList.add("valid");
    confirmInput.disabled = false;
    confirmVisibility.disabled = false;
    pwMessage.style.visibility = "hidden";
    password = input;
    return true;
  } else {
    if (input.length == 0) {
      pwMessageAfter.classList.remove("valid");
      pwMessageAfter.classList.remove("invalid");
      pwMessage.innerText = "";
      pwMessage.style.visibility = "hidden";
      return;
    }

    pwMessageAfter.classList.remove("valid");
    pwMessageAfter.classList.add("invalid");

    if (input.length < 8) {
      pwMessage.innerText = "Password must be at least 8 characters long.";
    }
    if (!input.match(/\d/)) {
      if (pwMessage.innerText.length > 0) {
        pwMessage.innerText += "\n";
      }
      pwMessage.innerText += "Password must contain at least one number.";
    }
    if (!input.match(/[a - z]/)) {
      if (pwMessage.innerText.length > 0) {
        pwMessage.innerText += "\n";
      }
      pwMessage.innerText +=
        "Password must contain at least one lowercase character.";
    }
    if (!input.match(/[A - Z]/)) {
      if (pwMessage.innerText.length > 0) {
        pwMessage.innerText += "\n";
      }
      pwMessage.innerText +=
        "Password must contain at least one uppercase character.";
    }
    if (!input.match(/[$&+,:;=?@#|'<>.^*()%!-]/)) {
      if (pwMessage.innerText.length > 0) {
        pwMessage.innerText += "\n";
      }
      pwMessage.innerText +=
        "Password must contain at least one special character.";
    }
    confirmMessage.innerText = "";
    confirmInput.value = "";
    confirmInput.disabled = true;
    confirmVisibility.disabled = true;
    confirmMessageAfter.classList.remove("valid");
    confirmMessageAfter.classList.remove("invalid");
    frameLogo.style.filter = "drop-shadow(0 0 20px rgba(255, 0, 0, 0.6))";
    password = null;
    return false;
  }
}

pwInput.addEventListener("input", (event) => {
  let input = event.target.value;

  isPasswordValid(input);
  isPasswordMatch(password, confirmInput.value);
  pwInput.focus();
});

function isPasswordMatch(passInput, conInput) {
  passInput = password;
  conInput = confirmInput.value;
  confirmMessage.innerText = "";

  if (conInput.length == 0) {
    confirmMessageAfter.classList.remove("valid");
    confirmMessageAfter.classList.remove("invalid");
    confirmMessage.innerText = "";
    confirmMessage.style.visibility = "hidden";
    frameLogo.style.filter = "drop-shadow(0 0 20px rgba(255, 0, 0, 0.6))";
    return;
  }

  if (passInput === conInput) {
    confirmMessage.innerText = "";
    confirmMessageAfter.classList.remove("invalid");
    confirmMessageAfter.classList.add("valid");
    submitButton.disabled = false;
    confirmMessage.style.visibility = "hidden";
    frameLogo.style.filter = "drop-shadow(0 0 20px rgba(0, 128, 0, 0.7))";
    return true;
  } else {
    confirmMessage.style.visibility = "visible";
    confirmMessage.innerText = "Passwords do not match!";
    confirmMessageAfter.classList.remove("valid");
    confirmMessageAfter.classList.add("invalid");
    submitButton.disabled = true;
    frameLogo.style.filter = "drop-shadow(0 0 20px rgba(255, 0, 0, 0.6))";
    return false;
  }
}

confirmInput.addEventListener("input", (event) => {
  let input = event.target.value;

  isPasswordMatch(password, input);
  confirmInput.focus();
});

let pwVisibility = false;
hidePw.style.visibility = "hidden";
showPw.style.visibility = "visible";

passwordVisibility.addEventListener("click", () => {
  if (!pwVisibility) {
    pwInput.setAttribute("type", "text");
    hidePw.style.visibility = "visible";
    showPw.style.visibility = "hidden";
    pwVisibility = true;
  } else {
    pwInput.setAttribute("type", "password");
    hidePw.style.visibility = "hidden";
    showPw.style.visibility = "visible";
    pwVisibility = false;
  }
  pwInput.focus();
  return pwVisibility;
});

let confVisibility = false;
hideConfirm.style.visibility = "hidden";
showConfirm.style.visibility = "visible";

confirmVisibility.addEventListener("click", () => {
  if (!confVisibility) {
    confirmInput.setAttribute("type", "text");
    hideConfirm.style.visibility = "visible";
    showConfirm.style.visibility = "hidden";
    confVisibility = true;
  } else {
    confirmInput.setAttribute("type", "password");
    hideConfirm.style.visibility = "hidden";
    showConfirm.style.visibility = "visible";
    confVisibility = false;
  }
  confirmInput.focus();
  return confVisibility;
});

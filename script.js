const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

$("#clipboard").on("click", function () {
  const password = $("#result").text();
  if (!password) {
    return;
  }
  navigator.clipboard.writeText(password);
  alert("Password copied to clipboard!");
});

$("#generate").on("click", function () {
  const length = +$("#length").val();
  const hasLower = $("#lowercase").prop("checked");
  const hasUpper = $("#uppercase").prop("checked");
  const hasNumber = $("#numbers").prop("checked");
  const hasSymbol = $("#symbols").prop("checked");

  $("#result").text(
    generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length)
  );

  updateStrength();
});

$("#length").on("input", function () {
  $("#length-label").text(`Password Length: ${$(this).val()}`);
});

$(".setting input[type='checkbox']").on("change", function () {
  const checkboxes = $(".setting input[type='checkbox']");
  const checkedCount = checkboxes.filter(":checked").length;

  if (checkedCount === 1) {
    checkboxes.not(":checked").prop("disabled", true);
  } else {
    checkboxes.prop("disabled", false);
  }
});

function generatePassword(lower, upper, number, symbol, length) {
  let generatedPassword = "";
  const typesCount = lower + upper + number + symbol;
  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );

  if (typesCount === 0) {
    return "";
  }

  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunc[funcName]();
    });
  }

  const finalPassword = generatedPassword.slice(0, length);

  return finalPassword;
}

function updateStrength() {
  const password = $("#result").text();
  let strength = "Weak";
  const length = password.length;
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[!@#$%^&*(){}\[\]=<>/,.\-]/.test(password);

  if (length >= 12 && hasLower && hasUpper && hasNumber && hasSymbol) {
    strength = "Very Strong";
  } else if (length >= 8 && hasLower && hasUpper && (hasNumber || hasSymbol)) {
    strength = "Strong";
  } else if (
    length >= 6 &&
    (hasLower || hasUpper) &&
    (hasNumber || hasSymbol)
  ) {
    strength = "Medium";
  }

  $("#strength-label").text(`Password Strength: ${strength}`);
}

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

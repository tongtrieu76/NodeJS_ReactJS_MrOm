function changeinput_name() {
  document.getElementById("Name").style.backgroundColor = "#fff";
  document.getElementById("Name").style.color = "black";
}
function changeinput_username() {
  document.getElementById("UserName").style.backgroundColor = "#fff";
  document.getElementById("UserName").style.color = "black";
}
function changeinput_password() {
  var pass = document.getElementById("Password");
  var again = document.getElementById("PasswordAgain");
  const key = pass.value;
  const keyagain = again.value;
  if (keyagain !== key) {
    again.style.backgroundColor = "black";
    again.style.color = "#fff";
  } else {
    again.style.backgroundColor = "#fff";
    again.style.color = "black";
  }
  document.getElementById("Password").style.backgroundColor = "#fff";
  document.getElementById("Password").style.color = "black";
}
function changeinput_passwordagain() {
  var pass = document.getElementById("Password");
  var again = document.getElementById("PasswordAgain");
  const key = pass.value;
  const keyagain = again.value;
  if (keyagain !== key) {
    again.style.backgroundColor = "black";
    again.style.color = "#fff";
  } else {
    again.style.backgroundColor = "#fff";
    again.style.color = "black";
  }
}
function changeinput_numberphone() {
  document.getElementById("NumberPhone").style.backgroundColor = "#fff";
  document.getElementById("NumberPhone").style.color = "black";
}
function changeinput_address() {
  document.getElementById("Address").style.backgroundColor = "#fff";
  document.getElementById("Address").style.color = "black";
}
function changeinput_email() {
  var x = document.getElementById("Email");
  if (x.value === "") {
    x.style.backgroundColor = "#fff";
    x.style.color = "black";
  } else {
    var flag = 0;
    const arr = x.value.split("");
    arr.forEach(item => {
      if (item === "@") {
        flag++;
      }
    });
    if (flag === 1) {
      x.style.backgroundColor = "#fff";
      x.style.color = "black";
    } else {
      x.style.backgroundColor = "black";
      x.style.color = "#fff";
    }
  }
}
function changeinput_identitycard() {
  document.getElementById("IdentityCard").style.backgroundColor = "#fff";
  document.getElementById("IdentityCard").style.color = "black";
}
function changeinput_birthday() {
  document.getElementById("Birthday").style.backgroundColor = "#fff";
  document.getElementById("Birthday").style.color = "black";
}
//driver
function changeinput_name_tx() {
  document.getElementById("Name_tx").style.backgroundColor = "#fff";
  document.getElementById("Name_tx").style.color = "black";
}
function changeinput_username_tx() {
  document.getElementById("UserName_tx").style.backgroundColor = "#fff";
  document.getElementById("UserName_tx").style.color = "black";
}
function changeinput_password_tx() {
  var pass = document.getElementById("Password_tx");
  var again = document.getElementById("PasswordAgain_tx");
  const key = pass.value;
  const keyagain = again.value;
  if (keyagain !== key) {
    again.style.backgroundColor = "black";
    again.style.color = "#fff";
  } else {
    again.style.backgroundColor = "#fff";
    again.style.color = "black";
  }
  document.getElementById("Password_tx").style.backgroundColor = "#fff";
  document.getElementById("Password_tx").style.color = "black";
}
function changeinput_passwordagain_tx() {
  var pass = document.getElementById("Password_tx");
  var again = document.getElementById("PasswordAgain_tx");
  const key = pass.value;
  const keyagain = again.value;
  if (keyagain !== key) {
    again.style.backgroundColor = "black";
    again.style.color = "#fff";
  } else {
    again.style.backgroundColor = "#fff";
    again.style.color = "black";
  }
}
function changeinput_numberphone_tx() {
  document.getElementById("NumberPhone_tx").style.backgroundColor = "#fff";
  document.getElementById("NumberPhone_tx").style.color = "black";
}
function changeinput_address_tx() {
  document.getElementById("Address_tx").style.backgroundColor = "#fff";
  document.getElementById("Address_tx").style.color = "black";
}
function changeinput_email_tx() {
  var x = document.getElementById("Email_tx");
  if (x.value === "") {
    x.style.backgroundColor = "#fff";
    x.style.color = "black";
  } else {
    var flag = 0;
    const arr = x.value.split("");
    arr.forEach(item => {
      if (item === "@") {
        flag++;
      }
    });
    if (flag === 1) {
      x.style.backgroundColor = "#fff";
      x.style.color = "black";
    } else {
      x.style.backgroundColor = "black";
      x.style.color = "#fff";
    }
  }
}
function changeinput_identitycard_tx() {
  document.getElementById("IdentityCard_tx").style.backgroundColor = "#fff";
  document.getElementById("IdentityCard_tx").style.color = "black";
}
function changeinput_birthday_tx() {
  document.getElementById("Birthday_tx").style.backgroundColor = "#fff";
  document.getElementById("Birthday_tx").style.color = "black";
}
//end

// clear input when submit add user success
function resetinput() {
  document.getElementById("Name").value = "";
  document.getElementById("UserName").value = "";
  document.getElementById("Password").value = "";
  document.getElementById("PasswordAgain").value = "";
  document.getElementById("NumberPhone").value = "";
  document.getElementById("Address").value = "";
  document.getElementById("Email").value = "";
  document.getElementById("IdentityCard").value = "";
  document.getElementById("Birthday").value = "";
  changeinput_name();
  changeinput_username();
  changeinput_password();
  changeinput_passwordagain();
  changeinput_numberphone();
  changeinput_address();
  changeinput_email();
  changeinput_identitycard();
  changeinput_birthday();
}
function resetinput_tx() {
  document.getElementById("Name_tx").value = "";
  document.getElementById("UserName_tx").value = "";
  document.getElementById("Password_tx").value = "";
  document.getElementById("PasswordAgain_tx").value = "";
  document.getElementById("NumberPhone_tx").value = "";
  document.getElementById("Address_tx").value = "";
  document.getElementById("Email_tx").value = "";
  document.getElementById("IdentityCard_tx").value = "";
  document.getElementById("Birthday_tx").value = "";
  changeinput_name_tx();
  changeinput_username_tx();
  changeinput_password_tx();
  changeinput_passwordagain_tx();
  changeinput_numberphone_tx();
  changeinput_address_tx();
  changeinput_email_tx();
  changeinput_identitycard_tx();
  changeinput_birthday_tx();
}

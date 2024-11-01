// Registering a user
function registerUser(event) {
  event.preventDefault();

  const inputUsername = document.getElementById("username");
  const inputPassword = document.getElementById("password");
  const inputConfirmPassword = document.getElementById("confirmPassword");

  const username = inputUsername.value.trim();
  const password = inputPassword.value;
  const confirmPassword = inputConfirmPassword.value;

  if (password !== confirmPassword) {
    alert("Passwords don't match!");
    return;
  }

  if (username && password) {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userExist = storedUsers.some((user) => user.usernames === username);
    if (userExist) {
      alert("Username already exist");
      return;
    }
    storedUsers.push({ usernames: username, passwords: password, loggedin: 1 });
    localStorage.setItem("users", JSON.stringify(storedUsers));

    localStorage.setItem(
      "currentUser",
      JSON.stringify({ currentUser: username })
    );
    alert("Registration successfull");

    window.location.href = "success.html";
  } else {
    alert("Username or Password not valid");
  }
}

// user login
function userLogin(event) {
  event.preventDefault();
  const inputLoginUsername = document.getElementById("usernameLogin");
  const inputLoginPassword = document.getElementById("passwordLogin");

  const loginUsername = inputLoginUsername.value.trim();
  const loginPassword = inputLoginPassword.value;

  if (loginUsername) {
    if (loginPassword) {
      const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
      let userFound = false;

      if (storedUsers.length > 0) {
        storedUsers.forEach((user) => {
          if (
            user.usernames === loginUsername &&
            user.passwords === loginPassword
          ) {
            user.loggedin = 1;
            localStorage.setItem("users", JSON.stringify(storedUsers));
            localStorage.setItem(
              "currentUser",
              JSON.stringify({ currentUser: loginUsername })
            );
            userFound = true;
            alert("You are successfully logged in");
            window.location.href = "success.html";
          }
        });

        if (!userFound) {
          alert("No records found for a username with that password");
        }
      } else {
        alert(
          "Username or password not found, please enter a correct one or register"
        );
      }
    } else {
      alert("Please enter a password");
    }
  } else {
    alert("Please enter a username");
  }
}

function logout() {
  const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (storedUsers.length > 0 && currentUser) {
    const userIndex = storedUsers.findIndex(
      (user) => user.usernames === currentUser.currentUser
    );
    if (storedUsers[userIndex].loggedin === 1) {
      storedUsers[userIndex].loggedin = 0;
      localStorage.setItem("users", JSON.stringify(storedUsers));
      localStorage.removeItem("currentUser");
      alert("you have successfully logged out");
    } else {
      alert("you are not logged in");
    }
  } else {
    alert("Seems like user is not logged in");
  }
}

function deleteAccount() {
  const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || [];
  const userIndex = storedUsers.findIndex(
    (user) => user.usernames === currentUser.currentUser
  );
  if (storedUsers && currentUser) {
    if (userIndex !== -1) {
      storedUsers.splice(userIndex, 1);
      localStorage.removeItem("currentUser");
      localStorage.setItem("users", JSON.stringify(storedUsers));
    } else {
      alert("can't delete if user is not logged in");
    }
  } else {
    alert("user not found");
  }
}

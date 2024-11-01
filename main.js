

// Registering a user
function registerUser(event){
    event.preventDefault();

    const inputUsername = document.getElementById('username');
    const inputPassword = document.getElementById('password');
    const inputConfirmPassword = document.getElementById('confirmPassword');

    const username = inputUsername.value.trim();
    const password = inputPassword.value;
    const confirmPassword = inputConfirmPassword.value;

    if (password !== confirmPassword){
        alert("Passwords don't match!");
        return;
    }

    if (username && password){
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        const userExist = storedUsers.some(user => user.usernames === username);
        if(userExist){
            alert("Username already exist");
            return;
        }
        storedUsers.push({usernames: username, passwords:password});
        localStorage.setItem('users', JSON.stringify(storedUsers));

        localStorage.setItem('currentUser', JSON.stringify({currentUser:username, loggedin:1}));
        alert("Registration successfull");

        window.location.href = "success.html";
        
    } else {
        alert("Username or Password not valid");
    }
}

// user login
function userLogin(event){
    event.preventDefault();
    const inputLoginUsername = document.getElementById('usernameLogin');
    const inputLoginPassword = document.getElementById('passwordLogin');

    const loginUsername = inputLoginUsername.value.trim();
    const loginPassword = inputLoginPassword.value;

    if (loginUsername){
        if(loginPassword){
            const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
            let userFound = 0;
            if (storedUsers.length > 0){
                storedUsers.forEach(user => {
                    if(user.usernames === loginUsername && user.passwords === loginPassword){
                        userFound = 1;
                        localStorage.setItem('users', JSON.stringify(storedUsers));
                        localStorage.setItem('currentUser', JSON.stringify({currentUser:loginUsername, loggedin:1}));
                        alert("you are successfully loggedin");
                        window.location.href = "success.html";                       
                    }
                });

            }else{
                alert("username or password not found, please enter a correct one or register");
            }

        }

    } else {
        alert("Please enter a username");
    }
}

function logout(event){
    event.preventDefault();
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    if(storedUsers.length>0){

        storedUsers.loggedIn = 0;
        localStorage.setItem('users', JSON.stringify(storedUsers));
        alert("you have successfully logged out");
    }else {
        alert("Seems like no user is logged in");
    }
}

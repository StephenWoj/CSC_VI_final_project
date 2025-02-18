function login() {
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const username = usernameInput.value;
    const password = passwordInput.value;
  
    if (username === "user" && password === "password") {
      localStorage.setItem("isLoggedIn", "true");
      alert("Login successful!");
    } else {
      alert("Incorrect username or password.");
    }
  
    usernameInput.value = "";
    passwordInput.value = "";
  }
  
  function logout() {
    localStorage.removeItem("isLoggedIn");
    alert("Logout successful!");
  }
  
  window.onload = function() {
    if (localStorage.getItem("isLoggedIn")) {
      alert("Welcome back!");
    }
  };  

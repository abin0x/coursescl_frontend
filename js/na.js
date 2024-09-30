// Function to check login status
const checkLoginStatus = () => {
    const token = localStorage.getItem('authToken'); // Replace this with your actual token checking logic
    if (token) {
        // User is logged in
        document.getElementById('dashboard-dropdown').style.display = 'block';
        document.getElementById('login-register-button').style.display = 'none';
    } else {
        // User is logged out
        document.getElementById('dashboard-dropdown').style.display = 'none';
        document.getElementById('login-register-button').style.display = 'block';
    }
};

// Function to redirect to register.html
const redirectToRegister = () => {
    window.location.href = 'register.html'; // Redirect to register.html
};

// Add event listener to the button
document.getElementById('login-register-button').addEventListener('click', redirectToRegister);

// Call the function on page load
checkLoginStatus();

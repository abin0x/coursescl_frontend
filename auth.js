
// Handle Registration
const handleRegistration = (event) => {
  event.preventDefault();
  const form = document.getElementById('registration-form');
  const formData = new FormData(form);

  const role = formData.get('user_type'); // Get the user role (student or teacher)
  const profileImageFile = formData.get('profile_image');
  let profileImageUrl = '';

  if (profileImageFile) {
    // Upload image regardless of the role
    uploadImageToImgBB(profileImageFile, (imageUrl) => {
      profileImageUrl = imageUrl;
      formData.set('profile_image', profileImageUrl); 

      submitRegistrationForm(formData);
    });
  } else {
    submitRegistrationForm(formData);
  }
};

const submitRegistrationForm = (formData) => {
  const jsonData = {};
  formData.forEach((value, key) => {
    if (value instanceof File) {
      // Ignore file fields
      return;
    }
    jsonData[key] = value;
  });

  fetch('https://scl-nine.vercel.app/api/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(jsonData),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.key) {
        alert('Registration Successful. Please check your email for confirmation.');
        window.location.href = 'login.html';
      } else {
        alert('Registration failed: ' + (data.detail || 'Please try again.'));
      }
    })
    .catch((err) => console.log('Registration error', err));
};

// Handle Login
const handleLogin = (event) => {
  event.preventDefault();
  const form = document.getElementById('login-form');
  const formData = new FormData(form);

  const loginData = {
    username: formData.get('username'),
    password: formData.get('password'),
  };

  fetch('https://scl-nine.vercel.app/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.key) {
        localStorage.setItem('authToken', data.key);
        localStorage.setItem('username', loginData.username);
        alert('Login Successful.');
        window.location.href = 'index.html'; // Redirect to appropriate dashboard
      } else {
        alert('Login failed. Please check your credentials.');
      }
    })
    .catch((err) => console.log('Login error', err));
};

// Handle Logout
const handleLogout = () => {
  const token = localStorage.getItem('authToken');

  fetch('https://scl-nine.vercel.app/api/users/logout', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        localStorage.removeItem('authToken');
        alert('Logout Successful.');
        window.location.href = 'index.html';
      } else {
        alert('Logout failed. Please try again.');
      }
    })
    .catch((err) => console.log('Logout error', err));
};

// Upload image to imgBB
const uploadImageToImgBB = (imageFile, callback) => {
  const apiKey = 'd18b1e9613f8b8cd33d7da9d7d9b7322';
  const formData = new FormData();
  formData.append('key', apiKey);
  formData.append('image', imageFile);

  fetch('https://api.imgbb.com/1/upload', {
    method: 'POST',
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        callback(data.data.url);
      } else {
        throw new Error('Failed to upload image to imgBB');
      }
    })
    .catch((err) => console.log('Image upload error', err));
};

// Event listeners
if (document.getElementById('registration-form')) {
  document.getElementById('registration-form').addEventListener('submit', handleRegistration);
}

if (document.getElementById('login-form')) {
  document.getElementById('login-form').addEventListener('submit', handleLogin);
}

if (document.getElementById('logout-button')) {
  document.getElementById('logout-button').addEventListener('click', handleLogout);
}

// Check authentication status
const checkAuthStatus = () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    document.getElementById('login-link').style.display = 'none';
    document.getElementById('logout-button').style.display = 'block';
  } else {
    document.getElementById('login-link').style.display = 'block';
    document.getElementById('logout-button').style.display = 'none';
  }
};

checkAuthStatus();

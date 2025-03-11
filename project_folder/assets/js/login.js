const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

registerBtn.addEventListener('click', () => {
  container.classList.add('active');
});

loginBtn.addEventListener('click', () => {
  container.classList.remove('active');
});

function loadUsers() {
  const usersJson = localStorage.getItem('users');
  return usersJson ? JSON.parse(usersJson) : [];
}

function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

function register() {
  const name = document.getElementById('name').value;
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  if (!name || !username || !email || !password || !confirmPassword) {
    alert('Please fill in all fields');
    return;
  }

  if (!email.includes('@')) {
    alert('Invalid email, require @');
    return;
  }

  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  const users = loadUsers();
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    alert('Username already exists');
    return;
  }

  const newUser = { name, username, email, password };
  users.push(newUser);
  saveUsers(users);
  alert('You are registered');
  document.getElementById('name').value = '';
  document.getElementById('username').value = '';
  document.getElementById('email').value = '';
  document.getElementById('password').value = '';
  document.getElementById('confirm-password').value = '';
  container.classList.remove('active');
}

// Login
function login() {
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;

  const users = loadUsers();
  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    alert('Login successful');
    window.location.href = "index.html";
    document.getElementById('login-username').value = '';
    document.getElementById('login-password').value = '';
    localStorage.setItem('isLoggedIn', 'true');
  } else {
    alert('Incorrect username or password');
  }
}

document.getElementById('regbtn').addEventListener('click', register);
document.getElementById('loginbtn').addEventListener('click', login);
const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');
let warnRegInfoText = false;
let warnLogInfoText = false;

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
    document.getElementById('infotext-reg').innerText = 'Please fill in all fields.';
    warnRegInfoText = true;
    clearRegInfoText(3000);
    return;
  }

  if (!email.includes('@')) {
    document.getElementById('infotext-reg').innerText = 'Invalid email address. Requires @ symbol.';
    warnRegInfoText = true;
    clearRegInfoText(3000);
    return;
  }

  if (password !== confirmPassword) {
    document.getElementById('infotext-reg').innerText = 'Passwords do not match.';
    warnRegInfoText = true;
    clearRegInfoText(3000);
    return;
  }

  const users = loadUsers();
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    document.getElementById('infotext-reg').innerText = 'Username already exists.';
    warnRegInfoText = true;
    clearRegInfoText(3000);
    return;
  }

  const newUser = { name, username, email, password };
  users.push(newUser);
  saveUsers(users);
  document.getElementById('infotext-reg').style.color = 'green';
  document.getElementById('infotext-reg').innerText = 'Registration successful.';
  warnRegInfoText = true;
  clearRegInfoText(3000);
  document.getElementById('name').value = '';
  document.getElementById('username').value = '';
  document.getElementById('email').value = '';
  document.getElementById('password').value = '';
  document.getElementById('confirm-password').value = '';
  switchPane();
}

// Login
function login() {
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;

  if (!username || !password) {
    document.getElementById('infotext-login').innerText = 'Please fill in all fields.';
    warnLogInfoText = true;
    return;
  }

  const users = loadUsers();
  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    document.getElementById('infotext-login').style.color = 'green';
    document.getElementById('infotext-login').innerText = 'Login successful.';
    warnLogInfoText = true;
    clearLogInfoText(3000);
    goToIndex();
    document.getElementById('login-username').value = '';
    document.getElementById('login-password').value = '';
    localStorage.setItem('isLoggedIn', 'true');
  } else {
    document.getElementById('infotext-login').innerText = 'Invalid username or password.';
    warnLogInfoText = true;
  }
}

document.getElementById('regbtn').addEventListener('click', register);
document.getElementById('loginbtn').addEventListener('click', login);

async function clearRegInfoText(ms) { 
  setTimeout(() => {
    document.getElementById('infotext-reg').innerText = '';
    warnRegInfoText = false;
  }, ms);
}

async function clearLogInfoText(ms) { 
  setTimeout(() => {
    document.getElementById('infotext-login').innerText = '';
    warnRegInfoText = false;
  }, ms);
}

async function switchPane() {
  setTimeout(() => {
    container.classList.toggle('active');
    document.getElementById('infotext-reg').style.color = 'red';
  }, 2000);
}

async function goToIndex() {
  setTimeout(() => {
    window.location.href = "index.html";
    document.getElementById('infotext-login').style.color = 'red';
  }, 3000);
}

document.getElementById('name','username','email','password','confirm-password').addEventListener("input", () => {
  if (warnRegInfoText){
    clearRegInfoText(2000);
  }
});

document.getElementById('login-username','login-password').addEventListener("input", () => {
  if (warnLogInfoText){
    clearLogInfoText(2000);
  }
});
function protectPage() {
  const overlay = document.getElementById('auth-overlay');
  const message = document.getElementById('auth-message');
  if (localStorage.getItem('isLoggedIn') !== 'true') {
    message.style.display = 'block';
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 2000);
  } else {
    overlay.style.opacity = '0';
    setTimeout(() => {
      overlay.style.display = 'none';
    }, 1000);
  }
}

function redirectIfLoggedIn() {
  if (localStorage.getItem('isLoggedIn') === 'true') {
    window.location.href = 'index.html';
  }
}

function logout() {
  localStorage.removeItem('isLoggedIn');
  window.location.href = 'login.html';
}
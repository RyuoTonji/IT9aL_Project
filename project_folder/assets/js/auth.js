function protectPage() {
  if (localStorage.getItem('isLoggedIn') !== 'true') {
    alert('Please log in to access this page');
    window.location.href = 'login.html';
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
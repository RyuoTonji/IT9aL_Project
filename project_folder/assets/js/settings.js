function updateProfile() {
  const name = document.getElementById('name').value;
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (!name || !username || !email) {
    alert('Please fill in all required fields');
    return;
  }

  if (password && password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  let users = JSON.parse(localStorage.getItem('users')) || [];
  const userIndex = users.findIndex(u => u.username === currentUser.username);

  if (userIndex === -1) {
    alert('User not found');
    return;
  }

  users[userIndex] = {
    ...users[userIndex],
    name,
    username,
    email,
    password: password || users[userIndex].password
  };

  localStorage.setItem('users', JSON.stringify(users));

  const updatedUser = {
    ...currentUser,
    name,
    username,
    email
  };
  localStorage.setItem('currentUser', JSON.stringify(updatedUser));

  const successMessage = document.getElementById('success-message');
  successMessage.style.display = 'block';


  setTimeout(function () {
    successMessage.style.display = 'none';
  }, 3000);

  window.location.reload();
}
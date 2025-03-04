document.addEventListener('DOMContentLoaded', function() {
    
    function checkLoginState() {
        
        const currentUser = localStorage.getItem('currentUser');
        
        
        const currentPage = window.location.pathname.split('/').pop();
        
        
        const protectedPages = [
            'index.html', 
            'profile.html', 
            'settings.html', 
            'contact.html'
        ];

        
        console.log('Current Page:', currentPage);
        console.log('Current User:', currentUser);
        console.log('Protected Pages:', protectedPages);

        
        if (protectedPages.includes(currentPage) && !currentUser) {
            console.log('Redirecting to login - no user logged in');
            alert('Please log in to access this page');
            window.location.href = 'login.html';
            return false;
        }

    
        if (currentPage === 'login.html' && currentUser) {
            console.log('Redirecting to index - user already logged in');
            window.location.href = 'index.html';
            return false;
        }

        return true;
    }

    
    checkLoginState();

    
    const logoutLinks = document.querySelectorAll('a[href="login.html"]');
    logoutLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            window.location.href = 'login.html';
        });
    });
});


function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const users = loadUsers();
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = "index.html";
        alert('Login successful');
        document.getElementById('login-username').value = '';
        document.getElementById('login-password').value = '';
    } else {
        alert('Incorrect username or password');
    }
}
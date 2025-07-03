// Select elements from the DOM
const container = document.getElementById('user-container');
const errorDiv = document.getElementById('error-message');
const reloadBtn = document.getElementById('reloadBtn');

// Fetch data from API
function fetchUsers() {
  // Clear previous content
  container.innerHTML = '';
  errorDiv.textContent = '';

  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
      return response.json(); // Parse JSON
    })
    .then(users => {
      // Loop through users and display their data
      users.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.classList.add('user-card');

        userDiv.innerHTML = `
          <h2>${user.name}</h2>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
        `;

        container.appendChild(userDiv);
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      errorDiv.textContent = 'Failed to load user data. Please check your internet connection.';
    });
}

// Load users when the page first loads
window.addEventListener('load', fetchUsers);

// Reload button functionality
reloadBtn.addEventListener('click', fetchUsers);

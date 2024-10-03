const url_api = 'https://localhost:7101/api/home';

// User loading when the page is loaded
document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('tbody_users_id')) {
        loadUsers();
    }

    // Forms processing
    if (document.getElementById('addUserForm')) {
        document.getElementById('addUserForm').addEventListener('submit', addUser);
    }

    if (document.getElementById('editUserForm')) {
        const userId = new URLSearchParams(window.location.search).get('id');
        loadUser(userId); 
        document.getElementById('editUserForm').addEventListener('submit', editUser);
    }

    if (document.getElementById('deleteUserForm')) {
        document.getElementById('deleteUserForm').addEventListener('submit', deleteUser);
    }
});

// Loading all users
function loadUsers() {
    fetch(url_api)
        .then(response => response.json())
        .then(data => {
            const users_table = document.getElementById("tbody_users_id");
            users_table.innerHTML = '';
            data.forEach(user => {
                users_table.innerHTML += `
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.firstName}</td>
                        <td>${user.lastName}</td>
                        <td>${user.emailName}</td>
                    </tr>`;
            });
        })
        .catch(error => console.error('Error fetching users:', error));
}

// Adding a user
function addUser(event) {
    event.preventDefault();
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;

    const newUser = { firstName, lastName, emailName: email };

    fetch(url_api, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
    })
        .then(response => response.json())
        .then(() => {
            window.location.href = 'index.html';
        })
        .catch(error => console.error('Error adding user:', error));
}

// Loading user data for editing
function loadUser(id) {
    fetch(`${url_api}/${id}`)
        .then(response => response.json())
        .then(user => {
            document.getElementById('userId').value = user.id;
            document.getElementById('firstName').value = user.firstName;
            document.getElementById('lastName').value = user.lastName;
            document.getElementById('email').value = user.emailName;
        })
        .catch(error => console.error('Error fetching user:', error));
}

// Edit a user
function editUser(event) {
    event.preventDefault();
    const id = document.getElementById('userId').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;

    const updatedUser = { id, firstName, lastName, emailName: email };

    fetch(`${url_api}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
    })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text) });
            }
            return response.json();
        })
        .then(data => {
            window.location.href = 'index.html';
        })
        .catch(error => console.error('Error updating user:', error));
}


// Deleting a user
function deleteUser(event) {
    event.preventDefault();
    const id = document.getElementById('userId').value;

    fetch(`${url_api}/${id}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error when deleting a user');
            }
            return response.json();
        })
        .then(data => {
            window.location.href = 'index.html';
        })
        .catch(error => console.error('Error deleting user:', error));
}

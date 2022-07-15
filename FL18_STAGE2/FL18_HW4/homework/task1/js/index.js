const userList = document.getElementById('userList');
const spinner = document.getElementById('spinner');

function appendUser(user) {
    userList.innerHTML += `<li class="user-list-item" data-id="${user.id}">
                  <input type="name" name="name" value="${user.name}"/>
                  <input type="text" name="username" value="${user.username}"/>
                  <input type="email" name="email" value="${user.email}"/>
                  <input type="phone" name="phone" value="${user.phone}"/>
                  <button type="button">Delete</button>
            </li>`;
}

fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((json) => {
        json.forEach((user) => {
            appendUser(user);
            userList.querySelectorAll('input').forEach((input) => {
                input.onchange = (event) => {
                    spinner.classList.add('spinner');
                    const editId = event.target.parentNode.getAttribute('data-id') - 1;
                    editUser(
                        Object.assign({}, json[editId], {
                            [event.target.getAttribute('name')]: event.target.value
                        })
                    )
                        .then((response) => response.json())
                        .finally(() => spinner.classList.remove('spinner'));
                };
            });
        });
    });

const editUser = (user) =>
    fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    });

userList.addEventListener('click', ({target}) => {
    if (target.type === 'button') {
        const deleteId = target.parentNode.getAttribute('data-id');
        spinner.classList.add('spinner');
        deleteUser(deleteId)
            .then(() => target.parentNode.remove())
            .finally(() => spinner.classList.remove('spinner'));
    }
});

const deleteUser = (id) =>
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'DELETE'
    }).then((response) => response.json());

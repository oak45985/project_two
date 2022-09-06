async function liForm(event) {
    event.preventDefault();

    const email = document.querySelector('#email-li').value.trim();
    const password = document.querySelector('#pw-li').value.trim();

    if (email && pw) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert(response.statusText);
        }
    }
}

async function suForm(event) {
    event.preventDefault();
    
    const username = document.querySelector('#user-su').value.trim();
    const email = document.querySelector('#email-su').value.trim();
    const webpage = document.querySelector('#userwp-su').value.trim();
    const password = document.querySelector('#pw-su').value.trim();

    if (username && email && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                webpage,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            console.log('User Created');
            document.location.replace('/profile');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.li-form').addEventListener('submit', liForm);
document.querySelector('.su-form').addEventListener('submit', suForm);
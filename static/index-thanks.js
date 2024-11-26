/// boton de abrir el popup
function open_modal() {
    document.getElementById("active-reader-modal1").showModal();
}

/// al cargar la pagina se abre el popup despues de 3seg
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        open_modal();
    }, 3000); // 3000 milisegundos = 3 segundos
});

/// send client data to api
function subscribe_now() {
    const email = document.getElementById(`email-btn-0001`).value;
    const name = document.getElementById(`name-btn-0001`).value;
    const send_btn = document.getElementById('btn-0001');

    // a simple data validation on client-side
    if (!name || !email) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    send_btn.disabled = true;
    send_btn.innerText = 'Por favor, espere';
    

    fetch('/mailers/subscribe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email_address: email,
            name: name,
            tags: 'qr_reader'
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            send_btn.innerText = data.message;
            if (data.link) {
                email.readOnly = true;
                name.readOnly = true;
                document.getElementById("add-message-1").style.display = 'block';
                document.getElementById("add-message-2").style.display = 'block';
            } else {
                send_btn.disabled = false;
                document.getElementById("add-message-1").style.display = 'none';
                document.getElementById("add-message-2").style.display = 'none';
            }
        } else {
            alert('Hubo un error al suscribirse. Por favor, inténtalo de nuevo más tarde.');
            // Restore the original txt
            send_btn.innerText = 'Suscribirme';
            document.getElementById("add-message-1").style.display = 'none';
            document.getElementById("add-message-2").style.display = 'none';
            send_btn.disabled = false;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // Restaurar el texto y reactivar el enlace en caso de error
        send_btn.innerText = 'Suscribirme';
        document.getElementById("add-message-1").style.display = 'none';
        document.getElementById("add-message-2").style.display = 'none';
        send_btn.disabled = false;
    });
}

/// send client data to api
function resend() {
    const email = document.getElementById(`email-btn-0001`).value;
    const name = document.getElementById(`name-btn-0001`).value;
    const send_btn = document.getElementById('btn-0001');

    // a simple data validation on client-side
    if (!name || !email) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    send_btn.disabled = true;
    send_btn.innerText = 'Por favor, espere';
    

    fetch('/mailers/resend_playbook', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email_address: email,
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            send_btn.innerText = data.message;
            document.getElementById("add-message-1").style.display = 'block';
            document.getElementById("add-message-2").style.display = 'block';
        } else {
            alert('Hubo un error al suscribirse. Por favor, inténtalo de nuevo más tarde.');
            // Restore the original txt
            send_btn.innerText = 'Suscribirme';
            document.getElementById("add-message-1").style.display = 'none';
            document.getElementById("add-message-2").style.display = 'none';
            send_btn.disabled = false;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // Restaurar el texto y reactivar el enlace en caso de error
        send_btn.innerText = 'Suscribirme';
        document.getElementById("add-message-1").style.display = 'none';
        document.getElementById("add-message-2").style.display = 'none';
        send_btn.disabled = false;
    });
}
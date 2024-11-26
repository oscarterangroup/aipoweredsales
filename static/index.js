function open_modal() {
    document.getElementById("newsletter-modal").showModal();
}

/// send client data to api
function subscribe_now() {
    const email = document.getElementById(`email-btn-0002`).value;
    const name = document.getElementById(`name-btn-0002`).value;
    const send_btn = document.getElementById('btn-0002');

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
            tags: 'new_reader'
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            send_btn.innerText = data.message;
            send_btn.disabled = false
        } else {
            alert('Hubo un error al suscribirse. Por favor, inténtalo de nuevo más tarde.');
            // Restore the original txt
            send_btn.innerText = 'Suscribirme';
            send_btn.disabled = false;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // Restaurar el texto y reactivar el enlace en caso de error
        send_btn.innerText = 'Suscribirme';
        send_btn.disabled = false;
    });
}
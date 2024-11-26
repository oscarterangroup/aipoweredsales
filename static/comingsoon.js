//////////////////////////////// countdown //////////////////////////////////////

(function () {
    const second = 1000,
          minute = second * 60,
          hour = minute * 60,
          day = hour * 24;
  
    //I'm adding this section so I don't have to keep updating this pen every year :-)
    //remove this if you don't need it
    birthday = "04/17/2024"
    
    const countDown = new Date(birthday).getTime(),
        x = setInterval(function() {    
  
          const now = new Date().getTime(),
                distance = countDown - now;
  
          document.getElementById("days").innerText = Math.floor(distance / (day)),
            document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour)),
            document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute)),
            document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);
  
          //do something later when date is reached
          if (distance < 0) {
            document.getElementById("headline").innerText = "Disponible YA!...";
            document.getElementById("countdown").style.display = "none";
            document.getElementById("content").style.display = "block";
            clearInterval(x);
          }
          //seconds
        }, 0)
    }());

/// send preorder data to server
function preorder_now() {
    const email = document.getElementById("email-pre").value;
    const name = document.getElementById("name-pre").value;
    const send_btn = document.getElementById("btn-0001"); // Obtener el enlace por su ID
    
    // a simple data validation on client-side
    if (!name || !email) {
        alert('Por favor, completa todos los campos.');
        document.getElementById("add-message").style.display = 'none';
        return;
    }

    if (!validarEmail(email)) {
        alert('El email no tiene un formato válido.');
        document.getElementById("add-message").style.display = 'none';
        return;
    } 
    
    send_btn.innerText = 'Por favor, espere';
    send_btn.disabled = true;

    fetch('/mailers/subscribe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email_address: email,
            name: name,
            tags: 'preorder'
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            send_btn.innerText = data.message;
            document.getElementById("add-message").style.display = 'block';
            document.getElementById("add-message").textContent = 'Tan pronto el libro este disponible en amazon te dejaremos saber.';
            send_btn.disabled = false;
        } else {
            alert('Hubo un error. Por favor, inténtalo de nuevo más tarde.');
            // Restore the original txt
            send_btn.innerText = 'Suscribirme';
            document.getElementById("add-message").style.display = 'none';
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


function preorder() {
    document.getElementById("preorder-modal").showModal()
}

function validarEmail(email) {
    // Expresión regular para validar un formato de email básico
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
// Función para mostrar mensajes
function showMessage(message) {
  const msgDiv = document.createElement("div");
  msgDiv.className = "message";
  msgDiv.textContent = message;
  document.body.appendChild(msgDiv);
  setTimeout(() => msgDiv.remove(), 3000);
}

// Validar el formulario de registro
function validateRegisterForm() {
  const name = document.getElementById("signupName").value;
  const phone = document.getElementById("signupPhone").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  const nameRegex = /^[A-Za-z\s]+$/;
  const phoneRegex = /^[0-9]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  if (!name.match(nameRegex)) return "Nombre debe contener solo letras.";
  if (!phone.match(phoneRegex)) return "Número debe contener solo números.";
  if (!email.match(emailRegex)) return "Email no es válido.";
  if (!password.match(passwordRegex))
    return "Contraseña debe tener letras y números.";

  return null;
}

// Registro de usuario
function register() {
  const error = validateRegisterForm();
  if (error) {
    showMessage(error);
    return;
  }

  const email = document.getElementById("signupEmail").value;
  const name = document.getElementById("signupName").value;
  const user = {
    name: name,
    phone: document.getElementById("signupPhone").value,
    email: email,
    password: document.getElementById("signupPassword").value,
  };

  // Guardar en localStorage
  localStorage.setItem(email, JSON.stringify(user));
  showMessage("Registro completado");

  // Enviar correo usando EmailJS
  sendMailWithEmailJS(signupName, signupEmail);
}

// Login de usuario
function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const user = JSON.parse(localStorage.getItem(email));

  if (user && user.password === password) {
    showMessage("LogIn exitoso");
  } else {
    showMessage("Email o contraseña incorrectos");
  }
}

function sendMailWithEmailJS(signupName, signupEmail) {
  emailjs
    .send("service_8bv3q86", "template_7ni3w34", {
      user_name: name,
      user_email: email,
      message: `Hola ${name},\n\n¡Tu registro ha sido exitoso!`,
    })
    .then((response) => {
      console.log(
        "Correo enviado exitosamente:",
        response.status,
        response.text
      );
      showMessage("Correo enviado exitosamente");
    })
    .catch((error) => {
      console.error("Error al enviar el correo:", error);
      showMessage("Error al enviar el correo");
    });
}
// Mostrar mensajes de usuario
function showMessage(message) {
  const msgDiv = document.createElement("div");
  msgDiv.className = "alert alert-info";
  msgDiv.textContent = message;
  document.body.appendChild(msgDiv);
  setTimeout(() => msgDiv.remove(), 3000);
}

// Validar formulario de registro
function validateRegisterForm() {
  const name = document.getElementById("signupName").value.trim();
  const phone = document.getElementById("signupPhone").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();

  const nameRegex = /^[A-Za-z\s]+$/;
  const phoneRegex = /^[0-9]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  if (!name.match(nameRegex)) return "El nombre debe contener solo letras.";
  if (!phone.match(phoneRegex)) return "El teléfono debe contener solo números.";
  if (!email.match(emailRegex)) return "El correo electrónico no es válido.";
  if (!password.match(passwordRegex)) {
    return "La contraseña debe tener al menos 6 caracteres, incluyendo letras y números.";
  }

  return null;
}

// Función de registro
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

  // Guardar usuario en localStorage
  localStorage.setItem(email, JSON.stringify(user));
  showMessage("Registro completado exitosamente");

  // Enviar correo con EmailJS
  sendMailWithEmailJS(name, email);
}

// Enviar correo con EmailJS
function sendMailWithEmailJS(name, email) {
  emailjs
    .send("service_8bv3q86", "template_7ni3w34", {
      user_name: name,
      user_email: email,
      message: `Hola ${name},\n\n¡Tu registro ha sido exitoso!`,
    })
    .then((response) => {
      console.log("Correo enviado exitosamente:", response.status, response.text);
      showMessage("Correo de confirmación enviado exitosamente.");
    })
    .catch((error) => {
      console.error("Error al enviar el correo:", error);
      showMessage("Hubo un problema al enviar el correo.");
    });
}

// Función de login
function login() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  const user = JSON.parse(localStorage.getItem(email));

  if (user && user.password === password) {
    showMessage(`Bienvenido de nuevo, ${user.name}`);
  } else {
    showMessage("Email o contraseña incorrectos.");
  }
}

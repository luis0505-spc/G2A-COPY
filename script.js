const games = [
  {
    id: 1,
    title: "Farming Simulator 25",
    image: "https://cdn1.epicgames.com/spt-assets/416837697afc4fc78afcc57963d5a6df/farming-simulator-25-vow90.jpg",
    price: 59.99,
    originalPrice: 79.99,
    discount: 25,
    sellers: 9,
  },
  {
    id: 2,
    title: "Call of Duty: Black Ops 6",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRGsaakn2mqO7dI-J0wY2toY-dUytRhVbh1g&s",
    price: 59.49,
    originalPrice: 69.99,
    discount: 15,
    sellers: 12,
  },
  {
    id: 3,
    title: "S.T.A.L.K.E.R. 2",
    image: "https://i.blogs.es/bf6a93/stalker-2/1366_2000.jpeg",
    price: 39.99,
    originalPrice: 49.99,
    discount: 20,
    sellers: 38,
  },
  {
    id: 4,
    title: "Microsoft Flight Simulator 2024",
    image: "https://store-images.s-microsoft.com/image/apps.2689.14068704152123556.9c7da5a6-dbc9-4dcc-bb8d-4ff55c5973bf.31b7ef35-eca7-4155-b56c-081f71b84a73?q=90&w=480&h=270",
    price: 53.99,
    originalPrice: 59.99,
    discount: 10,
    sellers: 10,
  },
  {
    id: 5,
    title: "Red Dead Redemption 2",
    image: "https://images-na.ssl-images-amazon.com/images/I/51rJZtfw9GL.AC_.jpg",
    price: 59.99,
    originalPrice: 69.99,
    discount: 10,
    sellers: 15,
  },
  {
    id: 6,
    title: "Garry's Mod",
    image: "https://steamcdn-a.akamaihd.net/steam/apps/4000/header.jpg?t=1600623227",
    price: 39.99,
    originalPrice: 49.99,
    discount: 15,
    sellers: 20,
  }
];

// Función para renderizar los juegos disponibles
function renderGames() {
  const gamesContainer = document.getElementById("games-container");
  gamesContainer.innerHTML = "";

  games.forEach((game) => {
    const gameElement = document.createElement("div");
    gameElement.classList.add("game-card");
    gameElement.innerHTML = `
      <img src="${game.image}" alt="${game.title}">
      <div class="game-info">
        <h3 class="game-title">${game.title}</h3>
        <p>
          <span class="game-price">€${game.price.toFixed(2)}</span>
          <span class="game-original-price">€${game.originalPrice.toFixed(2)}</span>
          <span class="discount-badge">-${game.discount}%</span>
        </p>
        <p>${game.sellers} vendedores</p>
        <button class="add-to-cart" data-id="${game.id}">Agregar al Carrito</button>
      </div>
    `;
    gamesContainer.appendChild(gameElement);
  });
}

// Función para agregar un juego al carrito (solo si se hace clic)
function addToCart(gameId) {
  const game = games.find((g) => g.id === gameId);
  if (game) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Verificar si el juego ya está en el carrito
    const existingGame = cart.find((item) => item.id === gameId);
    if (existingGame) {
      existingGame.quantity += 1; // Si ya está, aumentar la cantidad
    } else {
      // Si no está, agregarlo al carrito con cantidad 1
      cart.push({ ...game, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart)); // Guardar el carrito actualizado en localStorage
    updateCartCount();
  }
}

// Función para actualizar el número de artículos en el carrito
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("cart-count").textContent = cart.length;
}

// Inicializar los event listeners y cargar juegos disponibles
function initializeEventListeners() {
  document.getElementById("games-container").addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart")) {
      const gameId = parseInt(e.target.getAttribute("data-id"));
      addToCart(gameId);
    }
  });
}

// Inicializar la página de inicio
document.addEventListener("DOMContentLoaded", () => {
  renderGames();
  updateCartCount();
  initializeEventListeners();
});

// Función para renderizar los juegos en el carrito (en carrito.html)
function renderCartItems() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartItemsContainer.innerHTML = ""; // Limpiar contenido previo

  let total = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Tu carrito está vacío.</p>";
  } else {
    cart.forEach((game) => {
      const itemElement = document.createElement("div");
      itemElement.classList.add("cart-item");
      itemElement.innerHTML = `
        <img src="${game.image}" alt="${game.title}" class="cart-item-image">
        <div class="cart-item-details">
          <h3>${game.title}</h3>
          <p>Precio: €${game.price.toFixed(2)}</p>
          <p>Cantidad: ${game.quantity}</p>
          <button class="increase-quantity" data-id="${game.id}">+1</button>
          <button class="decrease-quantity" data-id="${game.id}">-1</button>
          <button class="remove-item" data-id="${game.id}">Eliminar</button>
        </div>
      `;
      cartItemsContainer.appendChild(itemElement);
      total += game.price * game.quantity; // Sumar al total
    });

    // Mostrar el total en el carrito
    document.getElementById("cart-total").textContent = `Total: €${total.toFixed(2)}`;
  }
}

// Función para aumentar la cantidad de un juego
function increaseQuantity(gameId) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const game = cart.find((item) => item.id === gameId);
  if (game) {
    game.quantity += 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCartItems(); // Volver a renderizar el carrito actualizado
  }
}

// Función para disminuir la cantidad de un juego
function decreaseQuantity(gameId) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const game = cart.find((item) => item.id === gameId);
  if (game && game.quantity > 1) {
    game.quantity -= 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCartItems(); // Volver a renderizar el carrito actualizado
  }
}

// Función para eliminar un juego del carrito
function removeItem(gameId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((item) => item.id !== gameId); // Eliminar el juego del carrito
  localStorage.setItem("cart", JSON.stringify(cart)); // Guardar el carrito actualizado
  renderCartItems(); // Volver a renderizar el carrito actualizado
}

// Agregar los eventos para aumentar, disminuir y eliminar juegos del carrito
document.addEventListener("DOMContentLoaded", () => {
  renderCartItems();
  document.getElementById("cart-items").addEventListener("click", (e) => {
    if (e.target.classList.contains("increase-quantity")) {
      const gameId = parseInt(e.target.getAttribute("data-id"));
      increaseQuantity(gameId);
    } else if (e.target.classList.contains("decrease-quantity")) {
      const gameId = parseInt(e.target.getAttribute("data-id"));
      decreaseQuantity(gameId);
    } else if (e.target.classList.contains("remove-item")) {
      const gameId = parseInt(e.target.getAttribute("data-id"));
      removeItem(gameId);
    }
  });
});

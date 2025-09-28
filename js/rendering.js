import { cartManager } from "./CartManager.js";
import { favoritesManager } from "./FavoriteManager.js";

export function updateFavoriteIcon(icon, isFav) {
    if (isFav) {
        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid");
        icon.style.color = "red";
    } else {
        icon.classList.remove("fa-solid");
        icon.classList.add("fa-regular");
        icon.style.color = "";
    }
}

export function updateCartIcon(icon, inCart) {
    if (icon.classList.contains("cart-icon")) {
        if (inCart) {
            icon.classList.remove("fa-shopping-cart");
            icon.classList.add("fa-cart-plus");
            icon.style.color = "green";
        } else {
            icon.classList.remove("fa-cart-plus");
            icon.classList.add("fa-shopping-cart");
            icon.style.color = "";
        }
    }
}

export function createCard(product, card_class='card') {
    const productCard = document.createElement("div");
    productCard.className = card_class;
    productCard.dataset.id = product.sku;
    productCard.innerHTML = card_class === 'fixed-card' ? `
        <div class="image-container">
            <img src="${product.image_path}" alt="${product.name}" class="card-img">
        </div>
        <div class="card-content">
            <span class="item-name">${product.name}</span>
            <span class="price">$${product.price}</span>
        </div>
        <a href="#" class="cart" >
            <i class="fas cart-icon ${cartManager.isInCart(product.sku) ? "fa-cart-plus" : "fa-shopping-cart"} fa-1x" data-product-id="${product.sku}" style="color:${cartManager.isInCart(product.sku) ? "green" : ""}"></i>
        </a>
        <a href="#" class="favorite" >
            <i class="${favoritesManager.isFavorite(product.sku) ? "fas" : "far"} favorite-icon fa-heart fa-1x" data-product-id="${product.sku}" style="color:${favoritesManager.isFavorite(product.sku) ? "red" : ""}"></i>
        </a>
    ` : `
        <div class="image-container">
            <img src="${product.image_path}" alt="${product.name}" class="card-img" data-img>
        </div>
        <div class="card-body">
            <h3 class="card-title">${product.name}</h3>
            <p class="card-subtitle">Category: ${product.category}</p>
            <p class="card-text">${product.description}</p>
        </div>
        <div class="card-footer">
            <span class="price">$${product.price}</span>
            <button class="cart-btn" data-product-id="${product.sku}">${cartManager.isInCart(product.sku) ? "Remove from Cart" : "Add to Cart"}</button>
        </div>
        <a href="#" class="favorite">
            <i class="${favoritesManager.isFavorite(product.sku) ? "fas" : "far"} favorite-icon fa-heart fa-1x" data-product-id="${product.sku}" style="color:${favoritesManager.isFavorite(product.sku) ? "red" : ""}"></i>
        </a>
    `;
    return productCard;
}


function setupCardEventListeners(card, product) {
    const favIcon = card.querySelector(".favorite-icon");
    favIcon.addEventListener("click", e => {
        e.preventDefault();
        const isFav = favoritesManager.toggle(product);
        updateFavoriteIcon(favIcon, isFav);
        showFeedback(isFav ? "Added to favorites" : "Removed from favorites");
    });

    const cartIcon = card.querySelector(".cart-icon");
    if (cartIcon) {
        cartIcon.addEventListener("click", e => {
            e.preventDefault();
            const inCart = cartManager.toggle(product);
            updateCartIcon(cartIcon, inCart);
            showFeedback(inCart ? "Added to cart" : "Removed from cart");
        });
    }

    const cartBtn = card.querySelector(".cart-btn");
    if (cartBtn) {
        cartBtn.addEventListener("click", e => {
            e.preventDefault();
            const inCart = cartManager.toggle(product);
            cartBtn.textContent = inCart ? "Remove from Cart" : "Add to Cart";
            showFeedback(inCart ? "Added to cart" : "Removed from cart");
        });
    }
}

export function displayProducts(containerId, products, card_class='card') {
    const container = document.getElementById(containerId);
    container.innerHTML = "";
    loadCards(container,products,card_class)
}

export function loadCards(container, products, card_class) {
    products.forEach(product => {
        const card = createCard(product, card_class);
        container.appendChild(card);
        setupCardEventListeners(card, product);
    });
}

export function displayFavorites() {
    const favorites = favoritesManager.getAll();
    displayProducts('favorites-cards', favorites);
}

function showFeedback(message) {
    const notif = document.createElement('div');
    notif.textContent = message;
    notif.style.cssText = `
        position: fixed; bottom: 30px; right: 24px; background: var(--color-2); color: white;
        padding: 12px 24px; border-radius: 6px; font-weight: 600; font-size: 15px; z-index: 9999;
        opacity: 0; transition: opacity 0.3s; pointer-events: none;
    `;
    document.body.appendChild(notif);
    setTimeout(() => notif.style.opacity = "1", 50);
    setTimeout(() => {
        notif.style.opacity = "0";
        setTimeout(() => notif.remove(), 300);
    }, 1800);
}

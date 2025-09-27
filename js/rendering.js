import { cartManager } from "./CartManager.js";
import { favoritesManager } from "./FavoriteManager.js";

export function updateFavoriteIcon(icon, isFav) {
    console.log(icon.dataset.productId)
    console.log("isFav " , isFav)
    if (isFav) {
        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid");
        icon.style.color = "red";
    } else {
        icon.classList.remove("fa-solid");
        icon.classList.add("fa-regular");
        icon.style.color = "";
    }
    console.log(icon.classList)
}

export function updateCartIcon(icon, inCart) {
    console.log(icon.dataset.productId);
    console.log("inCart:", inCart);

    if (inCart) {
        icon.classList.remove("fa-shopping-cart"); 
        icon.classList.add("fa-cart-plus"); 
        icon.style.color = "green";
    } else {
        icon.classList.remove("fa-cart-plus"); 
        icon.classList.add("fa-shopping-cart"); 
        icon.style.color = "";
    }

    console.log(icon.classList);
}


export function createCard(product, card_class='card') {
    const productCard = document.createElement("div");
    productCard.className = card_class;
    productCard.dataset.id = product.sku;
    productCard.innerHTML = card_class === 'fixed-card'?`
            <div class="image-container">
                <img src="${product.image_path}" alt="${product.name}" class="card-img">
            </div>
            <div class="card-content">
                <span class="item-name">${product.name}</span>
                <span class="price">$${product.price}</span>
            </div>
            <a href="#" class="cart" id="cart-icon">
                <i class="fas fa-shopping-cart cart-icon fa-1x" data-product-id="${product.sku}"></i>
            </a>
            <a href="#" class="favorite">
                <i class="fa-regular fa-heart fa-1x favorite-icon" data-product-id="${product.sku}"></i>
            </a>
        ` :  `
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
                    <button class="cart-btn" id="cart-btn" data-product-id="${product.sku}">Add to Cart</button>
            </div>
            <a href="#" class="favorite">
                <i class="fa-regular fa-heart fa-1x favorite-icon" data-product-id="${product.sku}"></i>
            </a>
        `;
    return productCard;    

}

export function displayProducts(container,products,card_class='card') {
    const cards = document.getElementById(container);
    cards.innerHTML = "";
    products.forEach(product => {
        const productCard = createCard(product,card_class)
        cards.appendChild(productCard);
    });

    document.querySelectorAll(".favorite-icon").forEach(icon => {
        const productId = icon.dataset.productId;
        const product = products.find(p => p.sku == productId);

        updateFavoriteIcon(icon, favoritesManager.isFavorite(productId));

        icon.addEventListener("click", e => {
            console.log(product)
            console.log("event on icon")
            e.preventDefault();
            const isFav = favoritesManager.toggle(product);
            updateFavoriteIcon(icon, isFav);
            console.log("update icon state")
        });
    });
}

export function loadCards(cards, products, card_class) {
    products.forEach(product => {
        const productCard = createCard(product, card_class);
        cards.appendChild(productCard);
    });

    document.querySelectorAll(".cart-icon, .cart-btn").forEach(cartEl => {
        const productId = cartEl.dataset.productId;
        const product = products.find(p => p.sku == productId);

        updateCartIcon(cartEl, cartManager.isInCart(productId));

        cartEl.addEventListener("click", e => {
            console.log(product);
            console.log("event on cart element");
            e.preventDefault();
            const inCart = cartManager.toggle(product);
            updateCartIcon(cartEl, inCart);

            if (cartEl.classList.contains("cart-btn")) {
                cartEl.textContent = inCart ? "Remove from Cart" : "Add to Cart";
            }

            console.log("update cart state");
        });
    });

    document.querySelectorAll(".favorite-icon").forEach(icon => {
        const productId = icon.dataset.productId;
        const product = products.find(p => p.sku == productId);

        updateFavoriteIcon(icon, favoritesManager.isFavorite(productId));

        icon.addEventListener("click", e => {
            console.log(product);
            console.log("event on favorite icon");
            e.preventDefault();
            const isFav = favoritesManager.toggle(product);
            updateFavoriteIcon(icon, isFav);
            console.log("update favorite icon state");
        });
    });
}




export function displayFavorites() {
    const favorites = favoritesManager.getAll();
    console.log('favorites : ' , favorites)
    displayProducts('favorites-cards',favorites);
}

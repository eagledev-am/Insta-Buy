import { displayFavorites } from "./rendering.js"
import { favoritesManager } from "./FavoriteManager.js";


document.getElementById('favorites-cards').addEventListener('click', (e) => {

    console.log("action");

    const icon = e.target.closest('.favorite-icon');
    if (!icon) return; // clicked something else

    const productId = icon.dataset.productId;
    favoritesManager.remove(productId);

    displayFavorites();  
});


document.addEventListener('DOMContentLoaded',
    ()=>{
        displayFavorites()
    }
)
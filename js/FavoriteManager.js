class Favorites {
    constructor(key = "favorites") {
        this.key = key;
    }

    getAll() {
        return JSON.parse(localStorage.getItem(this.key)) || [];
    }

    add(product) {
        const favorites = this.getAll();
        const exists = favorites.some(fav => fav.sku === product.sku);
        if (!exists) {
            favorites.push(product);
            localStorage.setItem(this.key, JSON.stringify(favorites));
        }
    }

    remove(productId) {
        let favorites = this.getAll();
        favorites = favorites.filter(fav => fav.sku !== productId);
        localStorage.setItem(this.key, JSON.stringify(favorites));
    }

    toggle(product) {
        const favorites = this.getAll();
        const exists = favorites.some(fav => fav.sku === product.sku);

        if (exists) {
            this.remove(product.sku);
            return false; // removed
        } else {
            this.add(product);
            return true; // added
        }
    }

    isFavorite(productId) {
        
        return this.getAll().some(fav => fav.sku === productId);
    }
}

export const favoritesManager = new Favorites();
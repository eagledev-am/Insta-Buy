class Favorites {
    constructor(key = "favorites") {
        this.key = key;
    }

    getAll() {
        try {
            const data = localStorage.getItem(this.key);
            if (!data) return [];
            const parsed = JSON.parse(data);
            return Array.isArray(parsed) ? parsed : [];
        } catch (e) {
            localStorage.removeItem(this.key);
            return [];
        }
    }

    add(product) {
        if (!product || !product.sku) {
            return;
        }

        const favorites = this.getAll();
        const exists = favorites.some(fav => fav.sku === product.sku);

        if (!exists) {
            favorites.push(product);
            try {
                localStorage.setItem(this.key, JSON.stringify(favorites));
            } catch (e) {
                console.error("Failed to save favorites:", e);
            }
        }
    }

    remove(productId) {
        if (!productId) return;

        const favorites = this.getAll();
        const filtered = favorites.filter(fav => fav.sku !== productId);

        try {
            localStorage.setItem(this.key, JSON.stringify(filtered));
        } catch (e) {
            console.error("Failed to update favorites:", e);
        }
    }

    toggle(product) {
        if (!product || !product.sku) {
            console.log("Invalid product for toggle:", product);
            return false;
        }

        if (this.isFavorite(product.sku)) {
            this.remove(product.sku);
            return false; // removed
        } else {
            this.add(product);
            return true; // added
        }
    }

    isFavorite(productId) {
        if (!productId) return false;

        const favorites = this.getAll();
        return favorites.some(fav => fav.sku === productId);
    }

    clear() {
        localStorage.removeItem(this.key);
    }
}

export const favoritesManager = new Favorites();

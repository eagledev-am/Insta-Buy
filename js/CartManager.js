class Cart {
    constructor(key = "cart") {
        this.key = key;
    }

    getAll() {
        return JSON.parse(localStorage.getItem(this.key)) || [];
    }

    save(cart) {
        localStorage.setItem(this.key, JSON.stringify(cart));
    }

    add(product) {
        const cart = this.getAll();
        const existing = cart.find(item => item.sku === product.sku);

        if (existing) {
            existing.quantity += 1; // increase qty if exists
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        this.save(cart);
    }

    remove(productId) {
        let cart = this.getAll();
        cart = cart.filter(item => item.sku !== productId);
        this.save(cart);
    }

    decrement(productId) {
        const cart = this.getAll();
        const item = cart.find(i => i.sku === productId);

        if (item) {
            item.quantity -= 1;
            if (item.quantity <= 0) {
                this.remove(productId);
            } else {
                this.save(cart);
            }
        }
    }

    clear() {
        this.save([]);
    }

    isInCart(productId) {
        return this.getAll().some(item => item.sku === productId);
    }

    toggle(product) {
        if (this.isInCart(product.sku)) {
            this.remove(product.sku);
            return false; // removed
        } else {
            this.add(product);
            return true; // added
        }
    }
}

export const cartManager = new Cart();

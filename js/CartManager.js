class Cart {
    constructor(key = "cart") {
        this.key = key;
    }

    getAll() {
       try{
            const data = localStorage.getItem(this.key)
            if(!data) return []
            const parsed = JSON.parse(data)
            return Array.isArray(parsed)? parsed : []
       }
       catch(e){
            localStorage.removeItem(this.key)
            return []
       }
    }

    save(cart) {
        try{
        localStorage.setItem(this.key, JSON.stringify(cart));
        }catch(e){
            console.error("Failed to update cart")
        }
    }

    add(product) {
        if(!product || !product.sku){
            return;
        }

        let cart = this.getAll();
        const existing = cart.find(item => item.sku === product.sku);

        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        this.save(cart);
    }

    remove(productId) {
        if(!productId) return
        let cart = this.getAll();
        cart = cart.filter(item => item.sku !== productId);
        this.save(cart);
    }

    decrement(productId) {
        if(!productId) return 

        let cart = this.getAll();
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
        if(!productId) return false
        return this.getAll().some(item => item.sku === productId);
    }

    toggle(product) {
        if (this.isInCart(product.sku)) {
            this.remove(product.sku);
            return false; 
        } else {
            this.add(product);
            return true; 
        }
    }
}

export const cartManager = new Cart();

import { cartManager } from './CartManager.js';

const SHIPPING = 15.99;
const TAX_RATE = 0.08; 

function formatMoney(amount) {
    return `$${amount.toFixed(2)}`;
}

export function renderCart() {
    const cartItems = cartManager.getAll();
    const cartList = document.getElementById('cart-items');
    cartList.innerHTML = '';

    if (cartItems.length === 0) {
        cartList.innerHTML = '<div style="text-align:center; padding: 40px 0; color:#aaa;">Your cart is empty.</div>';
    }

    cartItems.forEach(item => {
        const el = document.createElement('div');
        el.className = 'cart-item';
        el.dataset.sku = item.sku;
        el.innerHTML = `
            <div class="item-image">
                <img src="${item.image_path}" alt="${item.name}">
            </div>
            <div class="item-details">
                <div class="item-name">${item.name}</div>
                <div class="item-category">${item.category}</div>
                <div class="item-price">${formatMoney(item.price)} each</div>
            </div>
            <div class="quantity-controls">
                <button class="quantity-btn decrement">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn increment">+</button>
            </div>
            <div class="item-total">${formatMoney(item.price * item.quantity)}</div>
            <a href="#" class="remove-btn" title="Remove item"><i class="fa-solid fa-trash"></i></a>
        `;

        el.querySelector('.decrement').addEventListener('click', () => {
            cartManager.decrement(item.sku);
            renderCart();
        });
        el.querySelector('.increment').addEventListener('click', () => {
            cartManager.increment(item.sku);
            console.log("dasgdasg")
            renderCart();
        });
        el.querySelector('.remove-btn').addEventListener('click', (e) => {
            e.preventDefault();
            cartManager.remove(item.sku);
            renderCart();
        });

        cartList.appendChild(el);
    });

    const subtotal = cartManager.getAll().reduce((sum, i) => sum + (i.price * i.quantity), 0);
    const tax = subtotal * TAX_RATE;
    const total = subtotal + SHIPPING + tax;
    document.getElementById('subtotal').textContent = formatMoney(subtotal);
    document.getElementById('tax').textContent = formatMoney(tax);
    document.getElementById('total').textContent = formatMoney(total);
    document.getElementById('checkout-btn').disabled = cartItems.length === 0;
}

document.addEventListener('DOMContentLoaded', renderCart);

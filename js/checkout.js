import { renderCart } from "./cart.js";
import { cartManager } from "./CartManager.js";

const checkoutBtn = document.getElementById('checkout-btn');
const SHIPPING = 15.99;
const TAX_RATE = 0.08; 

function closePopup() {
    const overlay = document.getElementById('overlay');
    overlay.classList.remove('active');
    overlay.innerHTML = "";
    document.body.style.overflow = 'auto';
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closePopup();
    }
});

function handleSubmit(event) {
    event.preventDefault();
    alert("Order placed successfully!");
    closePopup();
    cartManager.clear();
    renderCart();
}

checkoutBtn.addEventListener('click', () => {
    const overlay = document.getElementById('overlay');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    const subtotal = cartManager.getAll().reduce((sum, i) => sum + (i.price * i.quantity),0);
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax + SHIPPING;
    overlay.innerHTML = `
        <div class="popup">
            <button class="close-btn" type="button">&times;</button>
            <div class="popup-header">
                <h3>Checkout</h3>
                <p>Complete your order</p>
            </div>
            <form class="checkout-form">
                <div class="cart-summary">
                    <h3>Order Summary</h3>
                    <div class="summary-row">
                        <span class="summary-label">Subtotal:</span>
                        <span class="summary-value" id="subtotal">$${subtotal.toFixed(2)}</span>
                    </div>
                    <div class="summary-row">
                        <span class="summary-label">Shipping:</span>
                        <span class="summary-value">$${SHIPPING.toFixed(2)}</span>
                    </div>
                    <div class="summary-row">
                        <span class="summary-label">Tax:</span>
                        <span class="summary-value" id="tax">$${tax.toFixed(2)}</span>
                    </div>
                    <div class="summary-row">
                        <span class="summary-label">Total:</span>
                        <span class="summary-value" id="total">$${total.toFixed(2)}</span>
                    </div>
                </div>

                <div class="form-group">
                    <label>Full Name *</label>
                    <input type="text" required placeholder="John Doe">
                </div>
                <div class="form-group">
                    <label>Email Address *</label>
                    <input type="email" required placeholder="john@example.com">
                </div>
                <div class="form-group">
                    <label>Phone Number *</label>
                    <input type="tel" required placeholder="+1 (555) 000-0000">
                </div>
                <div class="form-group">
                    <label>Shipping Address *</label>
                    <input type="text" required placeholder="123 Main Street">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>City *</label>
                        <input type="text" required placeholder="New York">
                    </div>
                    <div class="form-group">
                        <label>Zip Code *</label>
                        <input type="text" required placeholder="10001">
                    </div>
                </div>
                <div class="form-group">
                    <label>Country *</label>
                    <select required>
                        <option value="">Select Country</option>
                        <option value="us">United States</option>
                        <option value="uk">United Kingdom</option>
                        <option value="ca">Canada</option>
                        <option value="au">Australia</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Additional Notes (Optional)</label>
                    <textarea placeholder="Any special instructions for delivery..."></textarea>
                </div>
                <div class="form-group">
                    <label>Payment Method *</label>
                    <select required>
                        <option value="">Select Payment Method</option>
                        <option value="credit-card">Credit Card</option>
                        <option value="paypal">PayPal</option>
                        <option value="bank-transfer">Bank Transfer</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Card Number *</label>
                    <input type="number" required placeholder="1234 5678 9012 3456" maxlength="19">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Expiry Date *</label>
                        <input type="month" required>
                    </div>
                    <div class="form-group">
                        <label>CVV *</label>
                        <input type="number" required placeholder="123" maxlength="3">
                    </div>
                </div>
                <input type="submit" class="submit-btn" value="Complete Order">
            </form>
        </div>
    `;

    overlay.onclick = (e) => {
        if (e.target === overlay) {
            closePopup();
        }
    };

    overlay.querySelector('.close-btn').onclick = closePopup;

    overlay.querySelector('.checkout-form').onsubmit = handleSubmit;
});

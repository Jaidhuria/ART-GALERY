  const cartItemsContainer = document.getElementById('cart-items');
        const subtotalDisplay = document.getElementById('subtotal');
        const deliveryDisplay = document.getElementById('delivery');
        const totalDisplay = document.getElementById('total');

        let subtotal = 0;
        let delivery = 0;
        let total = 0;
        let discount = 0;

        function loadCart() {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            cartItemsContainer.innerHTML = '';
            subtotal = 0;

            cart.forEach((item, index) => {
                if (!item.quantity) item.quantity = 1;

                const div = document.createElement('div');
                div.className = 'cart-item';

                div.innerHTML = `
                    <div class="info">
                        <span><strong>${item.name}</strong></span>
                        <span>Price: ₹${item.price} x ${item.quantity} = ₹${item.price * item.quantity}</span>
                    </div>
                    <div class="controls">
                        <button onclick="changeQty(${index}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="changeQty(${index}, 1)">+</button>
                        <button onclick="removeItem(${index})">Remove</button>
                    </div>
                `;

                cartItemsContainer.appendChild(div);
                subtotal += item.price * item.quantity;
            });

            delivery = subtotal > 0 ? 50 : 0;
            updateSummary();
        }

        function changeQty(index, delta) {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart[index].quantity += delta;

            if (cart[index].quantity < 1) {
                cart[index].quantity = 1;
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            loadCart();
        }

        function removeItem(index) {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            loadCart();
        }

        function applyVoucher() {
            const code = document.getElementById('voucher').value.trim().toUpperCase();
            if (code === 'WELCOME15') {
                discount = 0.15 * subtotal;
                alert("Voucher Applied: 15% off!");
            } else {
                discount = 0;
                alert("Invalid Voucher Code");
            }
            updateSummary();
        }

        function updateSummary() {
            const discountedSubtotal = subtotal - discount;
            total = discountedSubtotal + delivery;

            subtotalDisplay.textContent = `₹${discountedSubtotal.toFixed(2)}`;
            deliveryDisplay.textContent = `₹${delivery}`;
            totalDisplay.textContent = `₹${total.toFixed(2)}`;
        }

        loadCart();
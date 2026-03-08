document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalEl = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout-btn');
    const cartBadge = document.getElementById('cart-badge');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];


    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            productsContainer.innerHTML = ''; 
            products.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('col-md-4', 'mb-4');
                productDiv.innerHTML = `
                    <div class="card product-card">
                        <img src="${product.image}" class="card-img-top" alt="${product.name}">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">${product.description}</p>
                            <div class="mt-auto d-flex justify-content-between align-items-center">
                                <h5>$${product.price.toFixed(2)}</h5>
                                <button class="btn btn-primary" onclick="window.addToCart(${product.id}, '${product.name}', ${product.price})">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                `;
                productsContainer.appendChild(productDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            productsContainer.innerHTML = '<p class="text-danger">Could not load products. Please try again later.</p>';
        });

  
    window.addToCart = function(id, name, price) {
        const existingItem = cart.find(item => item.id === id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }
        updateCart();
    }

    
    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        let totalItems = 0;
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<li class="list-group-item">Your cart is empty.</li>';
        } else {
            cart.forEach(item => {
                total += item.price * item.quantity;
                totalItems += item.quantity;
                const li = document.createElement('li');
                li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
                li.textContent = `${item.name} - $${item.price.toFixed(2)} x ${item.quantity}`;
                cartItemsContainer.appendChild(li);
            });
        }
        cartTotalEl.textContent = total.toFixed(2);
        cartBadge.textContent = totalItems;
        localStorage.setItem('cart', JSON.stringify(cart));
    }


    checkoutButton.addEventListener('click', () => {
        if(cart.length > 0) {
            alert('Thank you for your purchase!');
            cart = [];
            updateCart();
        } else {
            alert('Your cart is empty!');
        }
    });

  
    updateCart();
});

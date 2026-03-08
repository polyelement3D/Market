document.addEventListener('DOMContentLoaded', () => {
    const orderDetailsContainer = document.getElementById('order-details');

    // Get order ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('id');

    if (!orderId) {
        orderDetailsContainer.innerHTML = '<p class="text-danger text-center">No order ID found. Please check the URL.</p>';
        return;
    }

    // Get orders from localStorage
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const order = orders.find(o => o.id === orderId);

    if (!order) {
        orderDetailsContainer.innerHTML = `<p class="text-danger text-center">Order with ID <strong>${orderId}</strong> not found.</p>`;
        return;
    }

    // Render the order details
    let itemsHtml = '';
    order.items.forEach(item => {
        itemsHtml += `
            <li class="list-group-item d-flex justify-content-between lh-sm">
                <div>
                    <h6 class="my-0">${item.name}</h6>
                    <small class="text-muted">Quantity: ${item.quantity}</small>
                </div>
                <span class="text-muted">$${(item.price * item.quantity).toFixed(2)}</span>
            </li>
        `;
    });

    orderDetailsContainer.innerHTML = `
        <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-primary">Order Summary</span>
            <span class="badge bg-primary rounded-pill">${order.items.length}</span>
        </h4>
        <ul class="list-group mb-3">
            ${itemsHtml}
            <li class="list-group-item d-flex justify-content-between">
                <span>Total (USD)</span>
                <strong>$${order.total.toFixed(2)}</strong>
            </li>
        </ul>
        <div class="card p-2">
            <p class="mb-0"><strong>Order ID:</strong> ${order.id}</p>
            <p class="mb-0"><strong>Order Date:</strong> ${new Date(order.date).toLocaleString()}</p>
        </div>
    `;
});

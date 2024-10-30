const fetchOrders = () => {
    const token = localStorage.getItem('authToken');

    if (!token) {
        console.error("User is not authenticated.");
        window.location.href = '/login'; // Redirect to login page
        return;
    }

    fetch('http://127.0.0.1:8000/api/orders/', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Error fetching orders');
        }
        return response.json();
    })
    .then((orders) => {
        const orderTableBody = document.querySelector('#order-table tbody');
        if (orderTableBody) {
            orderTableBody.innerHTML = ''; // Clear previous rows

            orders.forEach((order) => {
                const course = order.course; // Get course details
                const teacher = course.teacher; // Get teacher details
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${order.id}</td>
                    <td>${course.title}</td>
                    <td>${teacher.first_name} ${teacher.last_name}</td>
                    <td>$${parseFloat(course.price).toFixed(2)}</td>
                    <td>${course.description.substring(0, 100)}...</td>
                    <td>${new Date(order.order_date).toLocaleDateString()}</td>
                    <td>${order.ordered ? 'Yes' : 'No'}</td>
                `;
                orderTableBody.appendChild(row);
            });
        } else {
            console.error('Order table body not found');
        }
    })
    .catch((error) => console.error('Error fetching orders:', error));
};

// Ensure the fetchOrders function is called after the DOM is loaded
document.addEventListener('DOMContentLoaded', fetchOrders);

// Fetch course details and display them
document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id');

    const courseDetailsUrl = `https://scl-nine.vercel.app/api/courses/${courseId}`;

    // Fetch course details from the API
    fetch(courseDetailsUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error fetching course details');
            }
            return response.json();
        })
        .then(data => {
            // Populate course details on the page
            document.getElementById('course-title').textContent = data.title;
            document.getElementById('course-description').textContent = data.description;
            document.getElementById('course-rating').textContent = `⭐ ${data.rating || 'N/A'}`;

            // Handle image URLs from imgBB
            const imageUrl = data.image_url || 'default-image-url'; 
            document.getElementById('course-img').src = imageUrl;
            document.getElementById('course-img').alt = data.title;

            document.getElementById('sidebar-img').src = imageUrl;
            document.getElementById('sidebar-img').alt = data.title;

            const price = data.price || 'N/A';
            const originalPrice = data.original_price || '10000';
            document.querySelector('.course-fee').innerHTML = `
                <p>Course Fee</p>
                <p><span>$${price}</span> <s>$${originalPrice}</s></p>
                <p>29-Day Money-Back Guarantee</p>
            `;
        })
        .catch(error => {
            console.error('Error fetching course details:', error);
            alert('Could not load course details. Please try again later.'); // User-friendly error message
        });

    // Handle enroll button click to show the payment modal
    document.getElementById('enroll-button').addEventListener('click', function () {
        const modal = document.getElementById('payment-modal');
        const modalCourseTitle = document.getElementById('modal-course-title');
        const modalCoursePrice = document.getElementById('modal-course-price');

        // Populate modal with course details
        modalCourseTitle.textContent = document.getElementById('course-title').textContent;
        modalCoursePrice.textContent = `Price: $${document.querySelector('.course-fee span').textContent}`;

        modal.style.display = 'flex'; // Show the modal
        document.body.style.overflow = 'hidden'; // Prevent scrolling on the body
    });

    // Handle close modal action
    document.querySelector('.close').addEventListener('click', function () {
        closeModal();
    });

    // Close modal function
    function closeModal() {
        document.getElementById('payment-modal').style.display = 'none'; // Hide the modal
        document.body.style.overflow = 'auto'; // Restore body scrolling
    }

    // Close modal when clicking outside of the modal content
    window.addEventListener('click', function (event) {
        const modal = document.getElementById('payment-modal');
        if (event.target === modal) {
            closeModal();
        }
    });

    // Handle proceed to payment button click in the modal
    document.getElementById('proceed-payment-button').addEventListener('click', function () {
        const authToken = localStorage.getItem('authToken'); // Ensure this key is correct

        // Check if the token exists
        if (!authToken) {
            alert('You must be logged in to initiate payment.');
            window.location.href = 'login.html'; // Redirect to login page if not authenticated
            return;
        }

        const paymentUrl = `https://scl-nine.vercel.app/api/initiate-payment/${courseId}/`;

        // Initiate payment
        fetch(paymentUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${authToken}` // Include the auth token
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.payment_url) {
                window.location.href = data.payment_url; // Redirect to the payment URL
            } else {
                alert('Payment initiation failed: ' + data.error); // Display error from server
            }
        })
        .catch(error => {
            console.error('Payment initiation failed:', error);
            alert('Payment initiation failed: ' + error.message); // User-friendly error message
        });
    });
});

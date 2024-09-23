document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id');
    const courseDetailsUrl = `https://scl-nine.vercel.app/api/courses/${courseId}`;
    const enrollUrl = 'https://scl-nine.vercel.app/api/enroll/';

    // Fetch course details
    fetch(courseDetailsUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById('course-title').textContent = data.title;
            document.getElementById('course-description').textContent = data.description;
            document.getElementById('course-rating').textContent = `⭐ ${data.rating || 'N/A'}`;

            const imageUrl = data.image_url ? data.image_url : 'default-image-url'; 
            document.getElementById('course-img').src = imageUrl;
            document.getElementById('course-img').alt = data.title;

            document.getElementById('sidebar-img').src = imageUrl;
            document.getElementById('sidebar-img').alt = data.title;
        })
        .catch(error => {
            console.error('Error fetching course details:', error);
        });

    // Handle enrollment
    document.getElementById('enroll-button').addEventListener('click', function () {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
            alert('Please log in or sign up to enroll in a course.');
            window.location.href = 'login.html';  // Redirect to login page if not authenticated
            return;
        }

        const csrfToken = getCookie('csrftoken');

        fetch(enrollUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
                'Authorization': `Token ${authToken}`
            },
            body: JSON.stringify({ course_id: courseId })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json().then(error => Promise.reject(error));
        })
        .then(data => {
            showModal('You have successfully enrolled in the course!');
        })
        .catch(error => {
            console.error('Error enrolling in course:', error);
            showModal('Sorry!! You have already enrolled in this course. Please try enrolling in another course. Thank You!!');
        });
    });

    // Helper function to get CSRF token from cookies
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    // Modal functionality
    const modal = document.getElementById('enrollment-modal');
    const closeBtn = document.querySelector('.modal .close');

    const showModal = (message) => {
        document.getElementById('modal-message').textContent = message;
        modal.style.display = 'block';
    };

    closeBtn.onclick = function() {
        modal.style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
});

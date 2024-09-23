document.addEventListener('DOMContentLoaded', function () {
    const enrollmentHistoryUrl = 'https://scl-nine.vercel.app/api/history/';
    const authToken = localStorage.getItem('authToken');

    fetch(enrollmentHistoryUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${authToken}`  // Include authentication token
        }
    })
    .then(response => response.json())
    .then(data => {
        const historyContainer = document.getElementById('enrollment-history');
        historyContainer.innerHTML = ''; // Clear existing content

        data.forEach(enrollment => {
            const enrollmentItem = document.createElement('div');
            enrollmentItem.className = 'enrollment-item';

            enrollmentItem.innerHTML = `
                <h3>${enrollment.course.title}</h3>
                <p>${enrollment.course.description}</p>
                <p>Enrolled on: ${new Date(enrollment.enrolled_at).toLocaleDateString()}</p>
            `;

            historyContainer.appendChild(enrollmentItem);
        });
    })
    .catch(error => {
        console.error('Error fetching enrollment history:', error);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const historyUrl = 'https://scl-nine.vercel.app/api/history/';
    const authToken = localStorage.getItem('authToken');

    // Fetch enrollment history
    fetch(historyUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${authToken}`
        }
    })
    .then(response => response.json())
    .then(data => {
        const historyTableBody = document.getElementById('history-table-body');
        historyTableBody.innerHTML = ''; // Clear existing content

        if (data.length === 0) {
            historyTableBody.innerHTML = '<tr><td colspan="5">No enrollment history found.</td></tr>';
        } else {
            data.forEach(enrollment => {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${enrollment.course.title}</td>
                    <td>${enrollment.course.description}</td>
                    <td>${enrollment.course.department}</td>
                    <td>${enrollment.course.teacher.first_name} ${enrollment.course.teacher.last_name}</td>
                    <td>${new Date(enrollment.date_enrolled).toLocaleDateString()}</td>
                `;

                historyTableBody.appendChild(row);
            });
        }

        // Populate student details
        const student = data[0]?.student; // Assuming all enrollments are for the same student

        if (student) {
            document.getElementById('student-image').src = student.profile_image || 'https://via.placeholder.com/120';
            document.getElementById('student-name').textContent = `${student.first_name} ${student.last_name}`;
            document.getElementById('student-email').textContent = `Email: ${student.email}`;
            document.getElementById('student-username').textContent = `Username: ${student.username}`;
        }
    })
    .catch(error => {
        console.error('Error fetching enrollment history:', error);
    });
});

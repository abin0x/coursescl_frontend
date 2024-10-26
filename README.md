# Online School Project

## Overview

The **Online School** is an e-learning platform that offers a variety of courses for learners. This platform includes essential features such as course modules, quizzes, resources, and instructor interactions, allowing users to enroll in courses, learn at their own pace, and track their progress effectively.

## Features

### User Registration and Authentication
- User registration, login, and logout functionality.
- Email verification for new registrations. Users receive an email with a verification link upon registration.
- Account activation is required to log in.

### Course Creation
- Teachers can create courses tailored for students.
- Courses include key details such as title, description, department, image, and other relevant information.

### Course Management
- Teachers can update and delete their own courses.
- Each teacher can view and modify only the courses they have created.

### Course Listings
- All available courses are displayed on the homepage.
- Each course shows essential information, including title, description, department, and more.
- Students can filter courses by department for easier navigation.

### Enrollment Tracking
- Displays enrollment count when a student enrolls in a course.
- Teachers can view the number of students enrolled in their courses.

## Implementation Steps

### 1. Setup and Configuration
- Create a new Django project and set up the Django Rest Framework.
- Configure the email backend for sending verification emails.

### 2. User Authentication
- Utilize Django's built-in authentication system along with Django Rest Framework's authentication features.
- Implement email verification using either `django-allauth` or a custom email verification logic.

### 3. Course Creation and Management
- Create models for **Course**, **Department**, and other relevant entities.
- Implement views and serializers for creating, updating, and deleting courses.
- Ensure that only the course creator (teacher) can modify their courses.

### 4. Course Listings and Filtering
- Create views and serializers to list all courses and filter them by department.
- Implement the frontend (if applicable) to display the courses and provide filtering options.

### 5. Enrollment Tracking
- Create a model to track enrollments.
- Update the course detail view to include the enrollment count.
- Allow teachers to view enrollment statistics for their courses.

## Installation

To get started with the project, follow these steps:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd online-school

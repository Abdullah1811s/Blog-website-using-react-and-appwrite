# Blog Website

## Description

This project is a blog website built with React and Vite. It features a complete blog management system with functionalities to create, read, update, and delete blog posts. The website uses Appwrite as the backend for authentication and database management, TinyMCE for rich text editing, React Hook Form for form handling, and React Redux for state management.

## Features

- **User Authentication**: Users can sign up, log in, and log out.
- **Blog Management**: Users can create, read, edit, and delete blog posts.
- **Rich Text Editing**: Integrated TinyMCE editor for creating and editing blog content.
- **State Management**: Utilizes React Redux for managing application state.
- **Form Handling**: Uses React Hook Form for efficient and easy form handling.

## Technologies Used

- **React**: Frontend library for building user interfaces.
- **Vite**: Development server and build tool.
- **Appwrite**: Backend server for authentication and database management.
- **TinyMCE**: Rich text editor for blog content.
- **React Hook Form**: Library for handling form state and validation.
- **React Redux**: State management library for React applications.

## Getting Started

### Prerequisites

- Node.js (>= 14.x)
- npm or yarn

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2. **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3. **Configure Appwrite:**

    - Set up your Appwrite backend and create necessary collections and documents.
    - Update the configuration in `src/config.js` with your Appwrite credentials.

4. **Run the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

    Open your browser and navigate to `http://localhost:3000` to view the application.

## Usage

- **Authentication**: Users can access the login and signup pages via `/login` and `/signup` routes.
- **Blog Management**: Access and manage blog posts through the `/all-posts` and `/add-post` routes.
- **Rich Text Editor**: Use TinyMCE for writing and editing blog posts

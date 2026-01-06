# Employee Management System

## Project Overview
This project is an **Employee Management System** built with **React, TypeScript, and Vite**. It enables users to **Add, Edit, Delete, Search, and Filter** employees in a seamless, responsive interface. The application features a modern UI with smooth animations and a robust layout designed for both desktop and mobile use.

## Tech Stack Used
- **Frontend Framework**: React 18+ (Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM (v6)
- **State Management**: React Context API
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Utility**: clsx, tailwind-merge (for dynamic class handling)

## Steps to Run the Project Locally
Follow these steps to set up and run the application on your local machine:

1. **Prerequisites**: Ensure you have `Node.js` (v16 or higher) installed.

2. **Clone the Repository**:
   ```bash
   git clone https://github.com/Syedhussainsaber/Bookxpert-Assignment.git
   cd Bookxpert-Assignment
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Run Development Server**:
   ```bash
   npm run dev
   ```
   open http://localhost:5173 in your browser.

5. **Build for Production**:
   ```bash
   npm run build
   ```

## Assumptions & Design Decisions
1. **Authentication**:
   - A simple mock authentication is implemented.
   - **Credentials**: Username: `admin`, Password: `admin123`.
   - Access to the dashboard is protected via a `ProtectedRoute` wrapper.

2. **Data Persistence**:
   - `localStorage` is used to persist employee data and login state, simulating a database. This ensures data remains available after page reloads.

3. **Responsive Design**:
   - The sidebar navigation automatically converts to a hamburger menu drawer on mobile screens.
   - The employee table is horizontally scrollable on smaller devices to maintain readability.
   - Action buttons in forms stack vertically on mobile to prevent overflow.

4. **Image Handling**:
   - Profile images are stored as Base64 strings to keep the demo self-contained without external storage dependencies.
   - A file size limit of 2MB is enforced for uploads.

5. **UI/UX Choices**:
   - **Framer Motion** was chosen to add a "premium" feel with subtle entry animations and hover effects.
   - **Tailwind CSS** allows for rapid, consistent styling with a custom color palette (Indigo primarily).

## Features
- **Dashboard**: Visual statistics of total, active, and inactive employees.
- **Employee List**:
  - Search by name.
  - Filter by Gender and Active Status.
  - Print functionality for hard copies.
- **CRUD Operations**: Complete Create, Read, Update, Delete capabilities.
- **Validation**: Form inputs are validated (e.g., required fields, age limit check).

## Folder Structure
```
src/
├── components/     # Reusable UI & Feature components
├── context/        # Global State (Auth, Employee)
├── pages/          # Page views (Login, Dashboard, Employees)
├── utils/          # Helper functions
└── App.tsx         # Main entry with Routing
```

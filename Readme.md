# TRAVEL Listings 🌍

TRAVEL Listings is a premium full-stack web application designed for modern travelers to discover, create, and share beautiful destinations across the globe. Inspired by leading travel platforms, it offers a high-end experience for browsing holiday spots, reading community feedback, and managing your own travel portfolio with integrated geocoding and interactive maps.

---

## ✨ Features

- **📍 Interactive Maps:** View the exact location of every listing with integrated MapTiler and MapLibre GL maps.
- **🗺️ Smart Geocoding:** Automatically converts text locations (e.g., "Paris, France") into precise map coordinates.
- **📸 Cloud Image Management:** High-performance image hosting and optimization powered by **Cloudinary**.
- **🏨 Explore Destinations:** Discover a curated collection of holiday spots with vibrant imagery and detailed descriptions.
- **🛠️ Full CRUD Capability:** Authenticated users can seamlessly Create, Read, Update, and Delete their own listings.
- **⭐ Review & Rating System:** Integrated star-rating system (Starability) for users to share and manage their travel experiences.
- **🔒 Secure Authentication:** Robust signup and login flows powered by **Passport.js**.
- **🛡️ Smart Authorization:** Role-based permissions ensuring only owners can modify their listings and reviews.
- **📱 Premium Responsive UI:** A stunning, modern interface built with Bootstrap that feels native on mobile, tablet, and desktop.
- **✅ Data Integrity:** strict server-side validation using **Joi** schemas.

---

## 🛠️ Tech Stack

**Frontend:**
- HTML5 & Vanilla CSS
- **Bootstrap 5** for responsive layout
- **EJS (Embedded JavaScript)** for dynamic server-side rendering
- **MapLibre GL** for interactive map rendering
- **Starability.css** for accessible star ratings

**Backend:**
- **Node.js & Express.js**
- **Mongoose** for MongoDB object modeling
- **Passport.js** (Local Strategy) for authentication
- **Cloudinary & Multer** for cloud-based file uploads
- **Dotenv** for secure environment variable management

**Database:**
- **MongoDB** (NoSQL database)

---

## 🚀 Getting Started

Follow these steps to set up the project on your local machine:

### 1. Prerequisites
Ensure you have **Node.js** and **MongoDB** installed on your system.

### 2. Clone the Repository
```bash
git clone https://github.com/kishuvansh/Wanderlust.git
cd major
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Environment Variables
Create a `.env` file in the root directory and add your credentials:
```env
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_secret
MAPTILER_KEY=your_maptiler_api_key
```

### 5. Setup Database
Initialize the database with seed data:
```bash
node init/index.js
```

### 6. Start the Server
```bash
# For development with hot-reload
npx nodemon app.js

# For production
npm start
```
The application will be live at `http://localhost:8080`.

---

## 📂 Project Structure

- `/controllers`: Application logic and request handling.
- `/models`: Mongoose schemas for Listings, Reviews, and Users.
- `/route`: Express routing for different features.
- `/view`: EJS templates for page structure.
- `/public`: Static assets (Custom CSS, Client-side JS, Images).
- `/utils`: Error handling classes and utility functions.
- `/init`: Database seeding logic.

---

## 📜 License
This project is licensed under the ISC License.

---

Made with ❤️ by [VANSH](https://github.com/kishuvansh)

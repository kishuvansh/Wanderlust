# Wanderlust 🌍

Wanderlust is a full-stack web application designed to help users discover, create, and share travel listings from around the world. Inspired by popular travel platforms like Airbnb, Wanderlust offers a seamless experience for browsing holiday destinations, reading community reviews, and managing your own travel spots.

---

## ✨ Features

- **Explore Listings:** Browse through a wide variety of holiday spots with high-quality images and detailed descriptions.
- **Manage Listings (CRUD):** Logged-in users can easily create, view, edit, and delete their own travel listings.
- **Review System:** Share your travel experiences! Users can add ratings and comments to any listing, as well as delete their own reviews.
- **User Authentication:** Secure signup, login, and logout functionality powered by Passport.js.
- **Authorization:** Smart permissions ensure that only owners can edit or delete their listings and reviews.
- **Responsive Design:** Clean and modern user interface that works beautifully across different devices.
- **Robust Validation:** Form data is validated using Joi schemas to ensure data integrity.

---

## 🛠️ Tech Stack

**Frontend:**
- HTML, CSS (Bootstrap for styling)
- EJS (Embedded JavaScript) for dynamic templating
- `ejs-mate` for reusable layouts

**Backend:**
- Node.js & Express.js
- Mongoose for MongoDB integration
- Passport.js for local authentication
- `connect-flash` for alert messages

**Database:**
- MongoDB (Local or Atlas)

---

## 🚀 Getting Started

Follow these steps to set up the project on your local machine:

### 1. Prerequisites
Ensure you have **Node.js** and **MongoDB** installed.

### 2. Clone the Repository
```bash
git clone <repository-url>
cd major
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Setup Database
Initialize the database with sample data:
```bash
node init/index.js
```

### 5. Start the Server
Run the application using the following npm commands:
- For development (with hot reload):
```bash
npm run dev
```
- For production:
```bash
npm start
```
The server will start at `http://localhost:8080`.

---

## 📂 Project Structure

- `/controllers`: Contains the logic for the application routes.
- `/models`: Mongoose schemas for Listings, Reviews, and Users.
- `/route`: Defines the API endpoints and connects them to controllers.
- `/view`: EJS templates for rendering pages.
- `/public`: Static assets including CSS, client-side JS, and images.
- `/utils`: Error handling and utility functions.
- `/init`: Database initialization scripts and seed data.

---

## 📜 License
This project is licensed under the ISC License.

---

Made with ❤️ by [VANSH](https://github.com/kishuvansh)
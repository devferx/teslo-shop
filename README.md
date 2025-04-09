<h1 align="center">Welcome to Teslo Shop 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://twitter.com/devferx" target="_blank">
    <img alt="Twitter: devferx" src="https://img.shields.io/twitter/follow/devferx.svg?style=social" />
  </a>
</p>

> Teslo Shop is a modern e-commerce platform for clothing, built with cutting-edge technologies to deliver a seamless shopping experience.

### 🏠 [Homepage](https://teslo-shop-sigma.vercel.app/)

### ✨ [Demo](https://teslo-shop-sigma.vercel.app/)

## 🚀 Features

- User authentication and authorization with NextAuth.js
- Product management with Prisma and PostgreSQL
- Responsive design with Tailwind CSS
- Image handling with Cloudinary
- Payment integration with PayPal
- State management with Zustand
- Form validation with React Hook Form and Zod
- Carousel and sliders with Swiper.js

## 🛠️ Technologies Used

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Next.js API routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js
- **State Management**: Zustand
- **Form Handling**: React Hook Form, Zod
- **Image Management**: Cloudinary
- **Payment Gateway**: PayPal
- **Other Tools**: Docker, ESLint, Prettier, PostCSS, Swiper.js


## 📦 Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/devferx/teslo-shop.git
    cd teslo-shop
    ```

2. Create a copy of the `.env.example` file, rename it to `.env`, and fill in the necessary environment variables:
    ```sh
    cp .env.example .env
    ```

3. Install the dependencies:
   ```sh
    npm install
    ```

4. Start the database using Docker:
   ```sh
    docker-compose up
    ```

5. Apply the Prisma migrations:
   ```sh
    npx prisma migrate dev
    ```

6. Seed the database with initial data:
   ```sh
    npm run seed
    ```

7. Start the development server:
   ```sh
    npm run dev
    ```

## Author

👤 **Fernando Quinteros Gutierrez**

* Twitter: [@devferx](https://twitter.com/devferx)
* Github: [@devferx](https://github.com/devferx)
* LinkedIn: [@devferx](https://linkedin.com/in/devferx)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/devferx/teslo-shop/issues). 

## Show your support

Give a ⭐️ if this project helped you!


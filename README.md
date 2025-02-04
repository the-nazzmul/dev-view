
# CasePix

**CasePix** is a sleek and intuitive e-commerce platform that allows users to design and purchase custom phone cases with their own images. The application offers a seamless design experience, allowing users to upload, position, and customize their images on a phone case effortlessly.  

Users can finalize their design and proceed to checkout after signing in. The platform integrates **Stripe** for secure payments and includes an **admin dashboard** for monitoring sales, order statuses, and business performance.

## 🚀 Features

- 🖼️ **Custom Case Designer** – Users can upload and position images on phone cases.
- 🔒 **Secure Authentication** – Powered by **Kinde** for authentication.
- 💳 **Payments via Stripe** – Secure transactions using **Stripe** payment gateway.
- 📦 **Order Management** – Track orders and view order history.
- 📊 **Admin Dashboard** – Manage sales, orders, and business performance.
- 🎨 **Responsive UI** – Built with **React**, **Next.js**, and **Tailwind CSS**.
- 🌍 **Cloud Storage** – Uses **UploadThing** for seamless file uploads.
- ⚡ **Optimized Performance** – Image processing with **Sharp**.
- 📧 **Email Notifications** – Integrated with **Resend** for sending transactional emails.

## 📂 Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Tech Stack](#tech-stack)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## 🛠️ Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18+ recommended)
- [PostgreSQL](https://www.postgresql.org/)
- [Stripe Account](https://stripe.com/)
- [UploadThing Account](https://uploadthing.com/)
- [Kinde Authentication](https://kinde.com/)

### Steps

1. **Clone the repository**:

   ```sh
   git clone https://github.com/your-username/casepix.git
   cd casepix
   ```

2. **Install dependencies**:

   ```sh
   npm install
   ```

3. **Set up the database**:

   ```sh
   npx prisma migrate dev
   ```

4. **Run the development server**:

   ```sh
   npm run dev
   ```

5. Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory and configure the following environment variables:

```env
# Kinde Authentication
KINDE_CLIENT_ID=your_kinde_client_id
KINDE_CLIENT_SECRET=your_kinde_client_secret
KINDE_ISSUER_URL=https://your-kinde-domain.kinde.com
KINDE_SITE_URL=http://localhost:3000
KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000/auth-callback
KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000

# UploadThing
UPLOADTHING_SECRET=your_uploadthing_secret
UPLOADTHING_APP_ID=your_uploadthing_app_id

# Database (PostgreSQL)
DATABASE_URL=your_database_url

# Stripe Payments
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Server URL
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

⚠️ **Important**: Never expose your `.env` file in public repositories.

---

## 💡 Usage

1. **User Flow**:
   - Users can design a phone case by uploading an image.
   - They can adjust the image's position, size, and orientation.
   - After signing in, users can proceed to checkout.
   - Payments are securely processed through **Stripe**.
   - Users receive an email confirmation upon successful purchase.

2. **Admin Dashboard**:
   - View and manage orders.
   - Monitor sales performance.
   - Track customer purchases.

---

## ⚙️ Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, Framer Motion, Radix UI
- **Backend**: Next.js API routes, Prisma ORM, PostgreSQL
- **Authentication**: Kinde
- **Payments**: Stripe
- **File Uploads**: UploadThing
- **Image Processing**: Sharp
- **State Management**: React Query (TanStack)
- **Email Notifications**: Resend

---

## 🤝 Contributing

We welcome contributions! To get started:

1. Fork the project.
2. Create a new feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m "Add new feature"`).
4. Push to the branch (`git push origin feature-name`).
5. Open a **Pull Request**.

---

## 📝 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

### 📬 Contact

For any inquiries, reach out to [your-email@example.com](mailto:your-email@example.com).

---

### 🔥 Notes:
- Be sure to **regenerate** your **API keys, database credentials, and secrets** since they were exposed.
- Consider using **dotenv files** with `.gitignore` to prevent accidental leaks.

Would you like any modifications or additional sections in the README? 😊

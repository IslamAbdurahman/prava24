<div align="center">
  <img src="public/favicon.ico" alt="Logo" width="80" height="80">

  <h1 align="center">Prava24 - Ultimate Driving Test Platform</h1>

  <p align="center">
    A comprehensive, modern, and engaging web application built for mastering driving license tests.
    <br />
    <a href="https://your-domain.com/api/documentation"><strong>Explore the API Docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/islamabdurahman">Report Bug</a>
    ·
    <a href="https://github.com/islamabdurahman">Request Feature</a>
  </p>
</div>

<div align="center">

![Laravel](https://img.shields.io/badge/Laravel-12.0-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![React](https://img.shields.io/badge/React-19.0-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Inertia](https://img.shields.io/badge/Inertia.js-Modern-9553E9?style=for-the-badge&logo=inertia)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

</div>

---

## 🌟 About The Project

**Prava24** is an advanced, fully-featured driving school and license testing platform. Built with cutting-edge technologies, it provides users with real-world ticket questions, sign categorizations, and detailed attempts tracking, all wrapped in a premium, highly responsive user interface.

### ✨ Key Features

*   🚦 **Comprehensive Testing Engine**: Practice with real exam tickets, questions, and attempt tracking.
*   🔐 **Multi-Provider Authentication**: Secure login via Google, GitHub, Telegram, and standard credentials.
*   💳 **Integrated Payments**: Built-in support for Payme, Click, Oson, Uzcard, Paynet, and Stripe using `goodoneuz/pay-uz`.
*   🌍 **Multilingual**: Out-of-the-box support for English, Russian, and Uzbek.
*   📊 **Analytics & Dashboards**: Beautiful charts and statistics utilizing ApexCharts and Chart.js.
*   🤖 **Telegram Bot Integration**: Seamless user interactions and authentications over Telegram.
*   📖 **Interactive Documentation**: Auto-generated API specs with Swagger UI.
*   📱 **PWA Ready**: Installable as an app on any device for offline/native-like experience.

## 🛠 Built With

This project brings together the latest and greatest in the ecosystem:

*   **Backend:** [Laravel 12](https://laravel.com), [Spatie Permissions](https://spatie.be/docs/laravel-permission), [L5-Swagger](https://github.com/DarkaOnLine/L5-Swagger), [Telegram Bot SDK](https://github.com/irazasyed/telegram-bot-sdk)
*   **Frontend:** [React 19](https://reactjs.org/), [Inertia.js](https://inertiajs.com/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS v4](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/)
*   **Tools:** [Vite](https://vitejs.dev/), [ESLint](https://eslint.org/), [Prettier](https://prettier.io/)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

Ensure you have the following installed:
*   PHP ^8.2
*   Composer
*   Node.js & NPM
*   MySQL/PostgreSQL

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/islamabdurahman/prava24.git
    cd prava24
    ```

2.  **Install PHP dependencies:**
    ```sh
    composer install
    ```

3.  **Install NPM packages:**
    ```sh
    npm install
    ```

4.  **Environment Setup:**
    ```sh
    cp .env.example .env
    ```
    *Don't forget to configure your `DB_*` settings and OAuth credentials in the `.env` file.*

5.  **Generate Application Key & Storage Link:**
    ```sh
    php artisan key:generate
    php artisan storage:link
    ```

6.  **Run Migrations & Seeders:**
    ```sh
    php artisan migrate --seed
    php artisan db:seed --class="Goodoneuz\PayUz\database\seeds\PayUzSeeder"
    ```

7.  **Serve the Application:**
    Start the Vite development server and Laravel server simultaneously:
    ```sh
    npm run dev
    ```

---

## 🔒 Default Credentials

You can instantly test the dashboard using the seeded admin account:
*   **Email:** `admin@gmail.com`
*   **Password:** `123456`

---

## 📚 API Documentation

We use **L5-Swagger** to generate elegant API documentation.

Generate the docs:
```bash
php artisan l5-swagger:generate
```
Access the UI:  
👉 [http://localhost:8000/api/documentation](http://localhost:8000/api/documentation)

---

## 💰 Payment Integration Guide

We process payments efficiently through the `web.php` routing implementation using the [Pay-Uz](https://github.com/goodoneuz/pay-uz) library.

```php
// Redirect to payment system
Route::any('/pay/{paysys}/{key}/{amount}', function($paysys, $key, $amount) {
    $model = \Goodoneuz\PayUz\Services\PaymentService::convertKeyToModel($key);
    $url = request('redirect_url', '/');
    
    (new \Goodoneuz\PayUz\PayUz)->driver($paysys)->redirect($model, $amount, 860, $url);
});
```

---

## ☕ Support & Contributions

If you love the project, consider treating me to a coffee! Your support fuels further development.

<a href="https://payme.uz/@longevity" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

### Security
For any security-related concerns, please email **abdurahmanislam304@gmail.com** instead of using the public issue tracker.

---

## 👨‍💻 Connect with Me

*   **GitHub**: [@islamabdurahman](https://github.com/islamabdurahman)
*   **GitLab**: [@islamabdurahman](https://gitlab.com/islamabdurahman)
*   **YouTube**: [Islam Abdurahman](https://www.youtube.com/@IslamAbdurahman)
*   **Telegram**: [@LiveLongevity](https://t.me/LiveLongevity)

---

<p align="center">
  <i>Crafted with ❤️ for modern web developers.</i>
</p>

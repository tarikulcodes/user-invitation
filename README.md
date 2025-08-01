# User Invitation System

A Laravel + React application for managing user invitations with role-based access control. Users can send invitations via email, and recipients can register using invitation links.

## Features

- Send user invitations via email
- Role-based user management
- Email verification system
- User authentication and registration
- Dashboard with user and invitation management
- Responsive UI with modern React components

## Getting Started

### Prerequisites

- PHP 8.1+
- Composer
- Node.js 18+
- MySQL or SQLite database

### Installation

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd user-invitation
    ```

2. **Install PHP dependencies**

    ```bash
    composer install
    ```

3. **Install Node.js dependencies**

    ```bash
    npm install
    ```

4. **Environment setup**

    ```bash
    cp .env.example .env
    php artisan key:generate
    ```

5. **Configure database**
   Update your `.env` file with database credentials:

    ```env
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=user_invitation
    DB_USERNAME=your_username
    DB_PASSWORD=your_password
    ```

6. **Configure email settings**
   Update your `.env` file with email credentials (required for invitations):

    ```env
    MAIL_MAILER=smtp
    MAIL_HOST=your-smtp-host
    MAIL_PORT=587
    MAIL_USERNAME=your-email@example.com
    MAIL_PASSWORD=your-email-password
    MAIL_ENCRYPTION=tls
    MAIL_FROM_ADDRESS=your-email@example.com
    MAIL_FROM_NAME="User Invitation System"
    ```

7. **Run database migrations**

    ```bash
    php artisan migrate
    ```

8. **Seed the database (optional)**
    ```bash
    php artisan db:seed
    ```

### Running the Application

1. **Start the development server**

    ```bash
    composer run dev
    ```

2. **Visit the application**
   Open your browser and go to `http://localhost:8000`

## Usage

1. After seeding, log in with one of the seeded accounts:
    - **Admin**: `admin@test.com` / `password`
    - **User**: `user@test.com` / `password`
2. Access the dashboard (only admin can manage users and send invitations)
3. Recipients will receive invitation emails with registration links
4. Users can register using the invitation tokens

## Built With

- **Backend**: Laravel 12, PHP 8.1+
- **Frontend**: React 18, TypeScript, Inertia.js
- **Styling**: Tailwind CSS, shadcn/ui components
- **Database**: MySQL/SQLite
- **Build Tool**: Vite

# ClarityVue 📷

A modern, scalable photo portfolio platform built with cutting-edge web technologies. Designed for photographers and creators to showcase their work with enterprise-level reliability and performance.

**[Live Application](https://www.clarityvue.com)**

**[Demo Video]()**

---

## 🎯 Project Overview

ClarityVue is a comprehensive photo portfolio platform that enables users to create, manage, and share professional photo albums. The application features secure user authentication, real-time image uploads, and public profile sharing capabilities. Built with scalability in mind, it provides a seamless experience for both creators and viewers.

### Core Features

- **Secure User Authentication**: Complete authentication system with social sign-on and profile management
- **Album Management**: Intuitive dashboard for creating, organizing, and editing photo albums
- **Image Upload**: High-performance file uploads with automatic optimization and global distribution
- **Public Profiles**: Responsive public pages for showcasing curated photo collections
- **Cloud Storage**: Scalable image storage with high availability and global access

---

## 🛠️ Technology Stack

| Category           | Technology                                                                                                                                           | Purpose                                                      |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| **Framework**      | [![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)                      | Server-side rendering, API routes, and optimized performance |
| **Language**       | [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/) | Type safety and reduced runtime errors                       |
| **Runtime**        | [![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)                      | Server-side execution environment                            |
| **Database**       | [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)     | Robust relational data storage with ACID compliance          |
| **Cloud DB**       | [![Neon](https://img.shields.io/badge/Neon-00C7B1?style=for-the-badge&logo=neon&logoColor=white)](https://neon.tech/)                                | Serverless PostgreSQL with auto-scaling                      |
| **ORM**            | [![Drizzle ORM](https://img.shields.io/badge/Drizzle%20ORM-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black)](https://orm.drizzle.team/)      | Type-safe database queries and migrations                    |
| **Authentication** | [![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)](https://clerk.dev/)                             | User authentication, session management, and social login    |
| **Validation**     | [![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)](https://zod.dev/)                                     | Runtime validation to prevent security vulnerabilities       |
| **Storage**        | [![AWS S3](https://img.shields.io/badge/AWS%20S3-569A31?style=for-the-badge&logo=amazon-s3&logoColor=white)](https://aws.amazon.com/s3/)             | Scalable cloud storage with high availability                |
| **Deployment**     | [![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)                         | Edge deployment with automatic scaling                       |
| **Code Quality**   | [![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/)                         | Code quality and consistency standards                       |

---

## 📊 Database Schema

### Database Design

The application uses a well-structured relational database design with proper indexing and foreign key relationships.

![Database Schema](/public/assets/schema.svg)

### Key Database Features

- **Optimized Indexing**: Strategic indexes for efficient query performance
- **Foreign Key Constraints**: Proper relationships with cascade delete
- **UUID Primary Keys**: Scalable and secure identifier system
- **Timestamp Tracking**: Automatic created_at and updated_at fields
- **Data Integrity**: ACID compliance with transaction support

---

## 🚀 Architecture Highlights

### Scalability Features

- **Horizontal Scaling**: Stateless design supports unlimited server instances
- **Auto-scaling**: Cloud-native deployment with automatic resource allocation
- **Global Distribution**: Edge deployment ensures low-latency access worldwide
- **Database Sharding**: Ready for multi-tenant architecture expansion

### Security Implementation

- **JWT Authentication**: Secure session management with automatic token refresh
- **Row-level Security**: Database-level access control for user data
- **Input Validation**: Comprehensive validation prevents injection attacks
- **File Upload Security**: Presigned URLs with expiration prevent unauthorized access
- **Environment Security**: Secure credential management and cross-origin protection

### Performance Optimization

- **Server-side Rendering**: Optimized for search engines and initial load times
- **Image Optimization**: Automatic compression and format conversion
- **Database Indexing**: Strategic indexes for efficient query performance
- **Caching Strategy**: Intelligent cache invalidation and revalidation
- **Global Content Delivery**: Distributed content delivery for optimal user experience

---

## 🎓 Technical Achievements

### Development Excellence

- **Type Safety**: Complete TypeScript coverage with strict mode enforcement
- **Code Quality**: Comprehensive linting and formatting standards
- **Documentation**: Detailed JSDoc comments and architectural documentation
- **Testing**: Unit tests for critical business logic and error handling

### Production Readiness

- **Error Handling**: Comprehensive error boundaries and user-friendly messages
- **Monitoring**: Built-in performance analytics and error tracking
- **Deployment**: Automated deployment pipeline with zero-downtime updates
- **Backup Strategy**: Automated database backups and disaster recovery

### Business Logic

- **User Management**: Complete user lifecycle from registration to profile management
- **Content Management**: Efficient album and image organization with drag-and-drop
- **Public Sharing**: Secure public profile generation with customizable URLs
- **Data Integrity**: Transaction-based operations ensure data consistency

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/clarityvue-app.git
   cd clarityvue-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```bash
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/register
   NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/dashboard
   NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/dashboard
   CLERK_WEBHOOK_SECRET=

   DATABASE_URL=

   AWS_ACCESS_KEY_ID=
   AWS_SECRET_ACCESS_KEY=

   AWS_REGION=
   S3_BUCKET_NAME=
   ```

4. **Set up the database**

   ```bash
   # Generate and run migrations
   npm run db:generate
   npm run db:migrate
   ```

5. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

### Available Scripts

| Command               | Description                  |
| --------------------- | ---------------------------- |
| `npm run dev`         | Start development server     |
| `npm run build`       | Build for production         |
| `npm run start`       | Start production server      |
| `npm run lint`        | Run ESLint                   |
| `npm run db:generate` | Generate database migrations |
| `npm run db:migrate`  | Run database migrations      |
| `npm run db:studio`   | Open Drizzle Studio          |

---

_Built with enterprise-grade practices, focusing on scalability, security, and maintainability for production environments._

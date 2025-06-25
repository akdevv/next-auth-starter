# 🚀 Next Auth Starter

A production-ready Next.js authentication starter with modern features, comprehensive security, and excellent developer experience.

## ✨ Features

### 🔐 Authentication & Security
- **Multiple Auth Methods**: Email/password, Google OAuth, magic links
- **Two-Factor Authentication (2FA)**: TOTP with backup codes
- **Session Management**: Secure sessions with device tracking
- **Email Verification**: Automatic email verification flow
- **Password Security**: bcrypt hashing with strength validation
- **Rate Limiting**: Built-in protection against brute force attacks

### 📧 Email System
- **Transactional Emails**: Welcome, verification, password reset
- **React Email Templates**: Beautiful, responsive email designs
- **Security Notifications**: Login alerts and suspicious activity
- **Resend Integration**: Reliable email delivery service

### 🛡️ Advanced Security
- **CSRF Protection**: Built-in cross-site request forgery protection
- **Secure Headers**: Comprehensive security headers configuration
- **Input Validation**: Zod schemas for type-safe validation
- **Audit Logging**: Complete authentication event tracking

### 👤 User Management
- **Profile Management**: User profiles with avatar support
- **Device Management**: View and revoke active sessions
- **Account Recovery**: Multiple recovery options including backup codes
- **Account Deletion**: GDPR-compliant data removal

## 🎯 Why This Project?

Building authentication from scratch is complex, time-consuming, and security-critical. This starter provides:

- ✅ **Production-ready** authentication flows
- ✅ **Security best practices** built-in
- ✅ **Modern tech stack** with excellent DX
- ✅ **Comprehensive documentation** and examples
- ✅ **Type-safe** development experience
- ✅ **Scalable architecture** for growth

## 🛠️ Tech Stack

### Core Framework
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[React 19](https://react.dev/)** - Latest React with concurrent features

### Authentication & Security  
- **[NextAuth.js v5](https://next-auth.js.org/)** - Complete authentication solution
- **[Prisma](https://www.prisma.io/)** - Type-safe database ORM
- **[PostgreSQL](https://www.postgresql.org/)** - Robust relational database
- **[bcrypt](https://github.com/kelektiv/node.bcrypt.js)** - Password hashing
- **[otplib](https://github.com/yeojz/otplib)** - 2FA/TOTP implementation

### UI & Styling
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful, accessible React components
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible UI primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful & consistent icons

### Email & Communication
- **[Resend](https://resend.com/)** - Modern email API
- **[React Email](https://react.email/)** - React components for emails

### Development Tools
- **[Bun](https://bun.sh/)** - Fast JavaScript runtime & package manager
- **[ESLint](https://eslint.org/)** - Code linting and quality
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+** or **Bun**
- **PostgreSQL** database (we recommend [Supabase](https://supabase.com/))
- **Google Cloud Console** account (for OAuth)
- **Resend** account (for emails)

### 1. Clone & Install

```bash
git clone https://github.com/akdevv/next-auth-starter.git
cd next-auth-starter

# Install dependencies (recommended: use Bun)
bun install
# or npm install
```

### 2. Environment Setup

```bash
# Copy environment template
cp .env.example .env

# Fill in your environment variables
# See docs for detailed setup: /docs/getting-started/environment-variables
```

Required environment variables:
```env
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
AUTH_SECRET="your-secret-key"
DATABASE_URL="your-postgresql-url"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
NEXT_PUBLIC_RESEND_API_KEY="your-resend-api-key"
```

### 3. Database Setup

```bash
# Generate Prisma client
bun prisma generate

# Push schema to database
bun prisma db push

# (Optional) Seed database
bun prisma db seed
```

### 4. Start Development

```bash
bun dev
```

Visit [http://localhost:3000](http://localhost:3000) - your auth system is ready! 🎉

## 📖 Documentation

Complete documentation is available at `/docs` when running the project:

- **[Getting Started](/docs/getting-started)** - Setup and configuration
- **[Authentication](/docs/auth)** - Auth flows and security
- **[Database](/docs/database)** - Schema and migrations  
- **[Security Features](/docs/security-features)** - Security implementations
- **[Additional Concepts](/docs/additional)** - Educational resources

## 🛠️ Development

### Available Scripts

```bash
# Development
bun dev              # Start development server with Turbopack
bun build            # Build for production
bun start            # Start production server
bun lint             # Run ESLint

# Database
bun prisma studio    # Open database browser
bun prisma migrate   # Run migrations
bun prisma generate  # Generate Prisma client
bun prisma reset     # Reset database

# Email Development
bun email            # Preview emails locally
```

### Project Structure

```
next-auth-starter/
├── app/                 # Next.js App Router
│   ├── api/            # API routes
│   ├── auth/           # Authentication pages
│   └── profile/        # User profile pages
├── components/         # React components
│   ├── auth/          # Auth-specific components
│   ├── ui/            # shadcn/ui components
│   └── shared/        # Shared components
├── content/           # Documentation (MDX)
├── emails/            # Email templates
├── lib/               # Utilities and configurations
├── prisma/            # Database schema and migrations
├── server/            # Server actions and utilities
└── schema/            # Zod validation schemas
```

## 🔐 Security Features

- **🛡️ CSRF Protection** - Built-in token validation
- **🔒 Session Security** - Secure cookie-based sessions
- **⚡ Rate Limiting** - Prevent brute force attacks
- **📧 Email Verification** - Verify email ownership
- **🔐 2FA Support** - TOTP with QR codes
- **🔑 Backup Codes** - Emergency account recovery
- **🚨 Security Alerts** - Login notifications
- **🔄 Session Management** - Multi-device session control

## 🌟 Production Ready

This starter includes production-ready features:

- **Performance Optimized** - Server-side rendering, code splitting
- **SEO Friendly** - Meta tags, structured data
- **Accessibility** - WCAG compliant components  
- **Mobile Responsive** - Works on all devices
- **Error Handling** - Graceful error boundaries
- **Monitoring Ready** - Built-in logging and analytics hooks

## 🚀 Deployment

Deploy to your favorite platform:

### Vercel (Recommended)
```bash
vercel deploy
```

### Docker
```bash
docker build -t next-auth-starter .
docker run -p 3000:3000 next-auth-starter
```

### Other Platforms
- **Netlify** - Static export support
- **Railway** - Database included
- **AWS/GCP/Azure** - Serverless functions

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [NextAuth.js](https://next-auth.js.org/) for authentication
- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Vercel](https://vercel.com/) for hosting and platform
- [Supabase](https://supabase.com/) for database infrastructure

## 📞 Support

- 📖 **Documentation**: Visit `/docs` in your running project
- 💬 **Issues**: [GitHub Issues](https://github.com/akdevv/next-auth-starter/issues)
- 🐛 **Bug Reports**: Use issue templates
- 💡 **Feature Requests**: Open a discussion

---

Built with ❤️ by the community. Star ⭐ if this project helped you!

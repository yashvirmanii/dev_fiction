# DevTools Pro

A professional-grade developer utilities platform built with Next.js 14, featuring enterprise-level architecture, security, and performance optimizations.

## 🚀 Features

- **9+ Developer Tools**: JSON formatter, Base64 encoder/decoder, JWT decoder, and more
- **Enterprise Architecture**: Scalable, maintainable, and production-ready
- **Type Safety**: Full TypeScript implementation with strict type checking
- **Security First**: Input sanitization, rate limiting, and XSS protection
- **Performance Optimized**: Code splitting, lazy loading, and caching strategies
- **Accessibility**: WCAG 2.1 AA compliant
- **Testing**: Comprehensive unit and integration tests
- **Dark Mode**: System-aware theme switching

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Validation**: Zod
- **Testing**: Jest + Testing Library
- **Deployment**: Vercel

## 📁 Project Structure

\`\`\`
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── tools/             # Tool pages
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # Base UI components
│   ├── tools/            # Tool-specific components
│   └── dashboard/        # Dashboard components
├── lib/                  # Utility functions
│   ├── tools/           # Tool processors
│   ├── security/        # Security utilities
│   └── validation/      # Input validation
├── hooks/               # Custom React hooks
├── types/               # TypeScript type definitions
└── __tests__/          # Test files
\`\`\`

## 🚦 Getting Started

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/your-username/devtools-pro.git
   cd devtools-pro
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables (optional)**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   For production rate limiting with Redis:
   \`\`\`env
   UPSTASH_REDIS_REST_URL=your_redis_url
   UPSTASH_REDIS_REST_TOKEN=your_redis_token
   NEXT_PUBLIC_GA_ID=your_analytics_id
   \`\`\`

4. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🧪 Testing

\`\`\`bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
\`\`\`

## 🔒 Security Features

- **Input Sanitization**: All user inputs are sanitized to prevent XSS
- **Rate Limiting**: API endpoints are protected with rate limiting
- **CSRF Protection**: Built-in CSRF protection with Next.js
- **Security Headers**: Content Security Policy and other security headers
- **Validation**: Strict input validation with Zod schemas

## 📈 Performance Optimizations

- **Code Splitting**: Automatic code splitting with Next.js
- **Lazy Loading**: Dynamic imports for tool components
- **Image Optimization**: Next.js Image component with WebP/AVIF
- **Caching**: Aggressive caching strategies
- **Bundle Analysis**: Built-in bundle analyzer

## 🌐 Deployment

### Vercel (Recommended)

1. **Connect your repository to Vercel**
2. **Set environment variables in Vercel dashboard** (optional)
3. **Deploy automatically on push to main branch**

### Manual Deployment

\`\`\`bash
# Build the application
npm run build

# Start the production server
npm start
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [docs.devtools-pro.com](https://docs.devtools-pro.com)
- **Issues**: [GitHub Issues](https://github.com/your-username/devtools-pro/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/devtools-pro/discussions)

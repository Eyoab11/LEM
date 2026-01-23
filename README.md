# Levy Eromo Media Website

A modern, responsive portfolio website for Levy Eromo Media built with Next.js, featuring smooth animations and a fully functional contact form.

## 🚀 Features

- **Modern Design**: Clean, professional layout with smooth animations
- **Responsive**: Optimized for all devices and screen sizes
- **Contact Form**: Fully functional contact form with email delivery
- **Fast Performance**: Built with Next.js 16 and optimized for speed
- **Type Safe**: Written in TypeScript for better development experience

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Email Service**: Resend
- **Icons**: Lucide React

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd lem
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Add your Resend API key to `.env.local`:
```env
RESEND_API_KEY=your_resend_api_key_here
```

## 🚀 Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## 📧 Contact Form

The contact form is powered by Resend for reliable email delivery:

- **Recipient**: info@levyeromomedia.com
- **Features**: Form validation, loading states, success/error messages
- **Delivery**: Professional HTML emails with reply-to functionality
- **Environment**: Uses `RESEND_API_KEY` from environment variables

### Environment Variables

- **Development**: Uses `.env.local` (already configured)
- **Production**: Uses `.env` or hosting platform environment variables

## 🏗️ Build

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## 📁 Project Structure

```
├── app/                    # Next.js app router
│   ├── api/               # API routes
│   ├── contact/           # Contact page
│   └── ...               # Other pages
├── components/            # React components
│   ├── layout/           # Layout components
│   ├── sections/         # Page sections
│   └── ui/              # UI components
├── public/               # Static assets
├── types/               # TypeScript definitions
└── ...
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   ```
   RESEND_API_KEY=your_resend_api_key_here
   ```
4. Deploy!

### Other Platforms

For other hosting platforms, ensure you:
1. Set the `RESEND_API_KEY` environment variable in your hosting platform
2. **OR** create a `.env` file in production with:
   ```
   RESEND_API_KEY=your_resend_api_key_here
   ```
3. Build the project with `npm run build`
4. Serve the `.next` directory

**Important**: Never commit `.env` files with real API keys to version control!

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is private and proprietary to Levy Eromo Media.

## 📞 Support

For support or questions, contact: info@levyeromomedia.com

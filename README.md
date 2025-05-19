# Jaega Resto

A modern web application built with [React.js](https://reactjs.org/), [Tailwind CSS](https://tailwindcss.com/), and [Supabase](https://supabase.com/).

## Features

- ⚡ Fast, responsive UI with React and Tailwind CSS
- 🔒 Authentication, database, and storage powered by Supabase
- 🛠️ Easy to customize and extend

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Supabase account](https://supabase.com/) and project

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Supabase**

   - Create a `.env.local` file in the root directory.
   - Add your Supabase credentials:
     ```
     VITE_SUPABASE_URL=https://your-project.supabase.co
     VITE_SUPABASE_ANON_KEY=your-anon-key
     ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Visit**
   ```
   http://localhost:5173
   ```
   (URL may vary depending on your setup.)

## Project Structure

```
src/
  components/      // Reusable UI components
  pages/           // Page-level components
  utils/           // Utility functions
  App.jsx          // Main app component
  main.jsx         // Entry point
tailwind.config.js // Tailwind CSS configuration
```

## Scripts

- `dev` — Start development server
- `build` — Build for production
- `preview` — Preview production build

## Deployment

You can deploy your app to [Vercel](https://vercel.com/), [Netlify](https://www.netlify.com/), or any static hosting provider.

## Resources

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Supabase Docs](https://supabase.com/docs)

## License

[MIT](LICENSE)

---

> Made with ❤️ using React, Tailwind CSS, and Supabase.

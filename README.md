# Mini Blog

A modern, lightweight blog application built with React and Vite. Features a clean, minimalist design with support for multiple languages, theme switching, and markdown-based articles.

## Features

- 📝 **Markdown Support** - Write articles in markdown with full GitHub Flavored Markdown (GFM) support
- 🌍 **Internationalization** - Built-in support for multiple languages (Czech/English)
- 🎨 **Theme Switching** - Multiple color themes (Light, Dark, Gradient)
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- 🏷️ **Categories & Tags** - Organize articles with categories and tags
- 🔍 **Code Highlighting** - Syntax highlighting for code blocks using Prism.js
- ⚡ **Fast & Lightweight** - Built with Vite for optimal performance
- 🔒 **Secure** - HTML sanitization with DOMPurify

## Tech Stack

- **React 19** - UI framework
- **React Router 7** - Client-side routing
- **React Intl** - Internationalization
- **Vite 7** - Build tool and dev server
- **Remark** - Markdown processing
- **Prism.js** - Syntax highlighting
- **DOMPurify** - HTML sanitization
- **Lucide React** - Icon library
- **BEM CSS** - CSS methodology

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd mini-blog

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

```bash
# Build for production
npm run build

# Preview the production build
npm run preview
```

## Project Structure

```
mini-blog/
├── public/
│   └── data/
│       ├── articles.json        # Article list with metadata
│       ├── categories.json      # Category definitions
│       └── articles/            # Individual article files
│           ├── article-xxx.json
│           └── ...
├── src/
│   ├── components/              # React components
│   │   ├── ArticleCard/
│   │   ├── ArticleList/
│   │   ├── ArticleView/
│   │   ├── Footer/
│   │   ├── Header/
│   │   ├── LanguageSwitcher/
│   │   └── StyleSwitcher/
│   ├── pages/                   # Page components
│   │   ├── HomePage/
│   │   └── ArticlePage/
│   ├── services/                # API services
│   ├── locales/                 # i18n translations
│   ├── styles/                  # Global styles
│   └── App.jsx                  # Main app component
└── package.json
```

## Article Format

### articles.json

Contains a list of all articles with metadata:

```json
[
  {
    "id": "article-001",
    "title": "Article Title",
    "title.en": "Article Title (EN)",
    "date": "2024-01-15",
    "filename": "articles/article-001.json",
    "description": "Short article description",
    "description.en": "Short article description (EN)",
    "tags": ["tag1", "tag2"],
    "tags.en": ["tag1", "tag2"],
    "category": "BU",
    "metadata": {
      "readingTime": "5 min"
    }
  }
]
```

### Individual Articles (article-xxx.json)

Each article file contains the full content in Markdown:

```json
{
  "id": "article-001",
  "title": "Article Title",
  "title.en": "Article Title (EN)",
  "date": "2024-01-15",
  "description": "Short description",
  "description.en": "Short description (EN)",
  "tags": ["tag1", "tag2"],
  "tags.en": ["tag1", "tag2"],
  "category": "BU",
  "markdown": "# Article Title\n\nYour markdown content here...",
  "markdown.en": "# Article Title\n\nYour markdown content here...",
  "metadata": {
    "author": "Author Name",
    "readingTime": "5 min"
  }
}
```

### categories.json

Defines available categories with colors:

```json
[
  {
    "code": "BU",
    "label": {
      "cs": "Budhismus",
      "en": "Buddhism"
    },
    "colors": {
      "background": "#FDDC9B",
      "text": "#9C4A07",
      "border": "#9C4A07"
    }
  }
]
```

## Customization

### Color Themes

Edit `src/styles/global.css` to customize the color palette. The app supports three themes:
- Light (default)
- Dark
- Gradient

### Adding New Languages

1. Add a new translation file in `src/locales/` (e.g., `de.json`)
2. Import it in `src/App.jsx`
3. Update the `LanguageSwitcher` component

### Styling

Components follow BEM (Block Element Modifier) methodology. Each component has its own CSS file:
- `ComponentName.jsx` - Component logic
- `ComponentName.css` - Component styles

## Build & Deploy

The built files will be in the `dist/` directory. You can deploy them to any static hosting service:

- GitHub Pages
- Netlify
- Vercel
- AWS S3
- Or any web server

## License

This project is private and proprietary.

---

**Note**: This is a read-only blog application. For article management, use the separate admin-blog application.

# 🍿 usePopcorn

A modern, responsive movie search and watchlist application built with React. Discover movies, view detailed information, rate your favorites, and maintain your personal watchlist.

## ✨ Features

- **🔍 Movie Search**: Search through thousands of movies using the OMDB API
- **📖 Detailed Information**: View comprehensive movie details including plot, cast, director, and ratings
- **⭐ Personal Ratings**: Rate movies with an interactive star rating system
- **📝 Watchlist Management**: Add movies to your watchlist and track your viewing history
- **📊 Statistics Dashboard**: View your watching statistics including average ratings and total runtime
- **⌨️ Keyboard Navigation**: Use Escape key to close movie details
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices
- **🎨 Intuitive UI**: Clean, modern interface with collapsible sections

## 🛠️ Tech Stack

- **Frontend**: React 18+ with Hooks
- **API**: OMDB (Open Movie Database)
- **Styling**: CSS3 with modern styling practices
- **Build Tool**: Create React App / Vite
- **State Management**: React useState and useEffect hooks

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16.0 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- OMDB API key (free registration at [omdbapi.com](http://www.omdbapi.com/))

## 🔧 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/usepopcorn.git
   cd usepopcorn
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up API key**

   - Get your free API key from [OMDB API](http://www.omdbapi.com/apikey.aspx)
   - Replace the `KEY` variable in the code with your API key:

   ```javascript
   const KEY = "your_api_key_here";
   ```

4. **Start the development server**

   ```bash
   npm start
   # or
   yarn start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000` to see the application

## 🎯 Usage

### Searching for Movies

1. Type in the search box (minimum 3 characters)
2. Browse through the search results
3. Click on any movie to view detailed information

### Managing Your Watchlist

1. Click on a movie from search results
2. Rate the movie using the star rating system
3. Click "Add to Watchlist" to save it
4. View your watchlist statistics in the summary section
5. Remove movies from your watchlist using the delete button

### Keyboard Shortcuts

- **Escape**: Close movie details panel

## 🏗️ Project Structure

```
src/
├── components/
│   ├── App.js              # Main application component
│   ├── StarRating.js       # Star rating component
│   └── ...
├── styles/
│   └── index.css           # Application styles
├── utils/
│   └── helpers.js          # Utility functions
└── index.js                # Application entry point
```

## 🔄 Component Architecture

```
App
├── NavBar
│   ├── Logo
│   ├── Search
│   └── NumResults
└── Main
    ├── Box (Search Results)
    │   ├── MovieList
    │   └── Movie
    └── Box (Watchlist/Details)
        ├── MovieDetails
        ├── Summary
        └── WatchedList
```

## 🎨 Key Features Implementation

### State Management

- Centralized state in the main App component
- Local state for component-specific data
- Proper state lifting for shared data

### API Integration

- Async/await for API calls
- Error handling and loading states
- Request cancellation with AbortController

### User Experience

- Responsive design
- Loading indicators
- Error messages
- Keyboard navigation
- Visual feedback

### Performance Optimizations

- Request cleanup to prevent memory leaks
- Conditional rendering
- Efficient re-renders with proper dependencies

## 📱 Responsive Design

The application is fully responsive and works on:

- 💻 Desktop (1200px+)
- 💻 Laptop (768px - 1199px)
- 📱 Tablet (481px - 767px)
- 📱 Mobile (320px - 480px)

## 🧪 Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode on [http://localhost:3000](http://localhost:3000)

### `npm test`

Launches the test runner in interactive watch mode

### `npm run build`

Builds the app for production to the `build` folder

### `npm run eject`

**Note: this is a one-way operation. Once you eject, you can't go back!**

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Contributing Guidelines

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Known Issues

- None at the moment. Please report any bugs you find!

## 🔮 Future Enhancements

- [ ] User authentication and cloud sync
- [ ] Movie recommendations based on watchlist
- [ ] Social features (share watchlists)
- [ ] Advanced filtering and sorting options
- [ ] Offline mode with local storage
- [ ] Dark/Light theme toggle
- [ ] Export watchlist functionality
- [ ] Movie trailers integration

## 🙏 Acknowledgments

- [OMDB API](http://www.omdbapi.com/) for providing movie data
- [React](https://reactjs.org/) team for the amazing framework
- Icons and emojis from various sources

## 📞 Support

If you have any questions or need help with setup, please:

- Open an issue on GitHub
- Check existing issues for solutions
- Contact the maintainer

## ⭐ Star History

If you found this project helpful, please consider giving it a star on GitHub!

---

**Made with ❤️ and ☕ by [Mohamed Tamer]**
**LinkedIn [www.linkedin.com/in/mohamed-tamer-nassr]**

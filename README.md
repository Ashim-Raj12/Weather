# 🌤️ Weather App

A beautiful, modern weather application built with React and Vite that provides real-time weather information for any location worldwide. Features automatic location detection, city search with autocomplete, and a stunning glassmorphism UI design.

<<<<<<< HEAD
## 🚀 Live Demo

[Weather Go](https://weather-one-phi-44.vercel.app/)

=======
>>>>>>> 84a164fda8fbac9a54a7f53907fe84de8c24d1a0
## ✨ Features

- **🌍 Global Weather Data** - Get current weather conditions for any city worldwide
- **📍 Auto-Detect Location** - Automatically fetches weather for your current location on page load
- **🔍 Smart Search** - City search with real-time autocomplete suggestions
- **🎨 Beautiful UI** - Modern glassmorphism design with smooth animations
- **📱 Responsive Design** - Works perfectly on desktop and mobile devices
- **🌡️ Detailed Weather Info** - Temperature, feels-like, wind speed, direction, and weather conditions
- **⏰ Real-time Updates** - Shows last updated time for weather data

## 🚀 Quick Start

### Prerequisites

Make sure you have Node.js (version 16 or higher) installed on your system.

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Ashim-Raj12/Weather.git
   cd Weather
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the app in action!

## 🛠️ Built With

- **React 19** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **Tailwind CSS 4** - Utility-first CSS framework with modern features
- **Open-Meteo API** - Free weather API for accurate weather data
- **ESLint** - Code linting and quality assurance

## 📖 How to Use

### Searching for Weather

1. **Type a city name** in the search input - the app will show autocomplete suggestions as you type
2. **Select a city** from the dropdown or press Enter to search
3. **View detailed weather information** including temperature, wind conditions, and weather emoji

### Using Your Location

- The app automatically detects your location when you first load it (if you grant permission)
- Weather data for your current location is displayed immediately
- If location access is denied, you can still search for any city manually

### Weather Information Displayed

- **🌡️ Temperature** - Current temperature in Celsius
- **💨 Wind Speed** - Wind speed in km/h with compass direction
- **🧭 Wind Direction** - Degrees and compass direction (N, NE, E, etc.)
- **🕐 Last Updated** - Timestamp of when the weather data was fetched
- **🌤️ Weather Condition** - Visual emoji representing current weather

## 🔧 API Integration

This app uses the [Open-Meteo API](https://open-meteo.com/) which provides:

- **Geocoding API** - Convert city names to coordinates and vice versa
- **Weather Forecast API** - Real-time weather data with current conditions
- **Free & No API Key Required** - Perfect for development and learning

The API endpoints used:

- `https://geocoding-api.open-meteo.com/v1/search` - For city search and reverse geocoding
- `https://api.open-meteo.com/v1/forecast` - For current weather data

## 🎨 UI/UX Features

- **Glassmorphism Design** - Frosted glass effect with backdrop blur
- **Gradient Backgrounds** - Beautiful color transitions
- **Smooth Animations** - Hover effects and transitions
- **Responsive Layout** - Adapts to different screen sizes
- **Loading States** - Visual feedback during API calls
- **Error Handling** - User-friendly error messages

## 📁 Project Structure

```
weather-app/
├── public/
│   └── weather.svg          # App icon
├── src/
│   ├── api/
│   │   └── weatherApi.js    # API integration functions
│   ├── components/
│   │   ├── WeatherForm.jsx  # Search input with autocomplete
│   │   └── WeatherDisplay.jsx # Weather data display component
│   ├── App.jsx              # Main application component
│   ├── main.jsx             # React entry point
│   └── index.css            # Global styles and Tailwind imports
├── package.json             # Dependencies and scripts
├── vite.config.js          # Vite configuration
└── eslint.config.js        # ESLint configuration
```

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🙏 Acknowledgments

- [Open-Meteo](https://open-meteo.com/) for providing free weather data
- [Tailwind CSS](https://tailwindcss.com/) for the amazing utility-first CSS framework
- [Vite](https://vitejs.dev/) for the fast build tool and development experience

---

**Note**: This app requires location access to automatically detect your weather. If you prefer not to share your location, you can still search for any city manually.

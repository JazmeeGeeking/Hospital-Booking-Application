# 🏥 Hospital Appointment Booking App

A modern, user-friendly React Native mobile application for booking hospital appointments with doctors. The app features an intuitive interface for exploring doctors, booking appointments, managing schedules, and finding nearby hospitals using location services.

## ✨ Features

### Core Functionality
- **Home Dashboard**: Personalized home screen with quick access to appointments and services
- **Doctor Exploration**: Browse and search doctors by specialization, name, or location
- **Appointment Booking**: Easy-to-use booking system with date and time slot selection
- **Schedule Management**: View and manage your upcoming and past appointments
- **Nearby Hospitals**: Find hospitals near your location using GPS and maps integration
- **Location Services**: Real-time location tracking for finding nearby healthcare facilities

### User Experience
- **Modern UI/UX**: Clean, intuitive interface with smooth navigation
- **Bottom Tab Navigation**: Easy access to all main features
- **Real-time Availability**: Check doctor availability in real-time
- **Appointment Status**: Track appointment status (pending, confirmed, cancelled)
- **Responsive Design**: Works seamlessly on both iOS and Android devices

## 🛠️ Tech Stack

### Frontend
- **React Native** (0.72.10) - Cross-platform mobile framework
- **Expo** (~49.0.15) - Development platform and tooling
- **TypeScript** - Type-safe development
- **React Navigation** - Navigation library
  - `@react-navigation/bottom-tabs` - Bottom tab navigation
  - `@react-navigation/native-stack` - Stack navigation
- **React Native Maps** - Maps integration for location services
- **Expo Location** - Location services
- **Moment.js** - Date and time manipulation
- **AsyncStorage** - Local data persistence

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Expo CLI** (`npm install -g expo-cli`)
- **MongoDB** (for backend)
- **Git**
- **iOS Simulator** (for Mac) or **Android Studio** (for Android development)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/JazmeeGeeking/Hospital-Booking-Application.git
cd Hospital-Appointment-Booking__React-Native-main
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/hospital-appointment
JWT_SECRET=your-secret-key-here
```

### 4. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# On macOS/Linux
mongod

# On Windows
# Start MongoDB service from Services or use MongoDB Compass
```

### 5. Start the Backend Server

```bash
cd backend
node server.js
```

The backend server will run on `http://localhost:3000`

## 📱 Running the App

### Start the Expo Development Server

```bash
npm start
```

This will open the Expo Developer Tools. You can then:

- Press `i` to open iOS simulator
- Press `a` to open Android emulator
- Scan the QR code with Expo Go app on your physical device

### Platform-Specific Commands

```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## 📁 Project Structure

```
Hospital-Appointment-Booking__React-Native-main/
├── assets/
│   └── images/          # App icons, images, and assets
├── backend/
│   ├── models/          # MongoDB models (User, Doctor, Appointment)
│   └── server.js        # Express server and API routes
├── src/
│   ├── components/      # Reusable components (MapsView, etc.)
│   ├── screens/         # Screen components
│   │   ├── HomeScreen.tsx
│   │   ├── ExploreScreen.tsx
│   │   ├── BookAppointmentScreen.tsx
│   │   ├── MyScheduleScreen.tsx
│   │   └── NearbyHospitalsScreen.tsx
│   └── services/        # Service utilities (locationService, etc.)
├── App.tsx              # Main app component with navigation
├── app.json             # Expo configuration
├── package.json         # Dependencies and scripts
└── tsconfig.json        # TypeScript configuration
```

## 🔌 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login user

### Doctors
- `GET /api/v1/doctors` - Get list of doctors (with filters)
- `GET /api/v1/doctors/:id` - Get doctor details
- `GET /api/v1/doctors/:id/availability/:date` - Get doctor availability for a date
- `POST /api/v1/doctors/:id/availability/days` - Get availability for date range

### Appointments
- `GET /api/v1/appointments` - Get user's appointments (requires auth)
- `POST /api/v1/appointments` - Create new appointment (requires auth)
- `POST /api/v1/appointments/:id/cancel` - Cancel appointment (requires auth)
- `POST /api/v1/appointments/:id/reschedule` - Reschedule appointment (requires auth)

## 🎨 Screens

1. **Home Screen**: Dashboard with upcoming appointments and quick actions
2. **Explore Screen**: Browse and search for doctors
3. **Book Appointment Screen**: Select doctor, date, and time slot
4. **Schedule Screen**: View and manage all appointments
5. **Nearby Hospitals Screen**: Map view showing nearby hospitals

## 🔐 Environment Variables

### Backend (.env)
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/hospital-appointment
JWT_SECRET=your-secret-key-here
```

## 📝 Available Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android emulator
- `npm run ios` - Run on iOS simulator
- `npm run web` - Run in web browser

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**JazmeeGeeking**

- GitHub: [@JazmeeGeeking](https://github.com/JazmeeGeeking)

## 🙏 Acknowledgments

- React Native community
- Expo team for the amazing development platform
- All contributors and users of this project

## 📞 Support

If you encounter any issues or have questions, please open an issue on the GitHub repository.

---

Made with ❤️ using React Native and Expo


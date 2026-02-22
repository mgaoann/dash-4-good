# Dash 4 Good
A community-powered platform connecting organizations with food banks through volunteer delivery.

Dash 4 Good helps reduce food waste and fight hunger by connecting organizations with surplus food to nearby food banks through community volunteers. Restaurants and grocery stores can post pickup and delivery requests, while volunteers can claim and complete deliveries—making food rescue fast, efficient, and collaborative.

## Features
- **Role-Based Workflows:** Tailored experiences for Organizations (posting requests) and Volunteers (claiming deliveries).
- **Real-Time Database:** Live synchronization of requests. When a volunteer claims a task, the organization's dashboard updates instantly.
- **In-App Messaging:** Built-in, real-time chat connecting organizations and volunteers to coordinate pickups and drop-offs.
- **Open-Source Mapping & Routing:** Integrated with OpenStreetMap (OSRM) for free, real-time route rendering, ETAs, and distance calculations without paywalls.
- **Custom Geocoding:** Uses Nominatim API to convert physical addresses into precise map coordinates.
- **Modern Flat UI:** A clean, high-contrast, accessible design completely free of system alerts or intrusive popups.

## Tech Stack
- **Frontend:** React Native, Expo, Expo Router
- **Backend & Database:** Firebase Authentication, Firebase Cloud Firestore
- **Maps & Geolocation:** `react-native-maps`, OpenStreetMap (OSRM API for routing, Nominatim API for geocoding)
- **Icons:** Lucide React Native

## MVP Focus
Our hackathon focus was to design and build a fully functional MVP that demonstrates how technology can empower communities to combat hunger and reduce waste without relying on expensive enterprise APIs.

### MVP Workflows
- **Organizations:** Post pickup/delivery requests (food type, quantity, pickup address, urgency), track live status, and view historical completed deliveries.
- **Volunteers:** View nearby pending requests, claim deliveries, utilize a live map for navigation to the drop-off, and track personal impact stats (meals delivered, hours volunteered).
- **Authentication:** Secure Signup/Login with persistent sessions.

## Contributors
- **Ayesha Dawodi** – Led the frontend architecture and backend integration. Re-designed the app with a modern "Flat UI" system. Fully integrated Firebase Authentication and Cloud Firestore for real-time data syncing across dashboards. Engineered the in-app chat system, and built the completely free, open-source live map routing and geocoding features using OpenStreetMap.
- **Maggie Gao** - Implemented Organization Dashboard page, Organization Profile page, Sign Up/Log In pages, and misc. bug fixes.

## Mission
Inspired by the UN Sustainable Development Goals (SDG 1: No Poverty & SDG 2: Zero Hunger), Dash 4 Good aims to make food access more equitable, one delivery at a time.

---

## How to Run the App

### Prerequisites
Make sure you have these installed before running the project:
- [Node.js](https://nodejs.org/) **v18+**
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

### 1. Clone the Repository
```bash
git clone [https://github.com/mgaoann/dash-4-good.git](https://github.com/mgaoann/dash-4-good.git)
cd dash-4-good/frontend
cd frontend
```
### 2. Environment Variables Setup

Because the app is securely connected to Firebase, you need to provide the environment variables. Create a file named `.env.` in the root of the `frontend` directory and add your Firebase configuration:

Plaintext

```
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Install Dependencies

npm install

## Run the App

Start the development server:

- npx expo start

## Then choose one of the following:

- Press w → open in your web browser

- Press a → open on an Android emulator

- Press i → open on an iOS simulator (Mac only)

- Or scan the QR code in the Expo Go app on your phone




# 🛍️ FakeStore — React Native Shopping App

A clean, modern React Native e-commerce app built with [FakeStore API](https://fakestoreapi.com). Browse products, search in real time, and view detailed product pages with smooth animations.

---

## 📱 Screenshots

![WhatsApp Image 2026-02-23 at 12 25 29 PM](https://github.com/user-attachments/assets/4c6b8d4f-a55c-4c5b-bf4c-e22cd8c7f2e9)
![WhatsApp Image 2026-02-23 at 12 25 28 PM](https://github.com/user-attachments/assets/dc480ed0-e8a2-4786-952b-a6d74d1771c3)
![WhatsApp Image 2026-02-23 at 12 25 48 PM (1)](https://github.com/user-attachments/assets/f035517a-b0d7-459e-a65f-37eb13a81bd1)



---

## ✨ Features

- **Product Listing** — Fetches live product data from the FakeStore API
- **Real-time Search** — Filter products as you type via Redux
- **Pull-to-Refresh** — Swipe down to reload the product list
- **Product Detail Screen** — Animated hero image, star ratings (full/half/empty), price, tags, and description
- **Entry Animations** — Fade, slide, and scale transitions using React Native's `Animated` API
- **Redux State Management** — Centralized state with actions for fetching and searching products
- **Stack Navigation** — React Navigation with a styled custom header and back button

---

## 🗂️ Project Structure

```
ProductApp/
├── android/              # Android native code (auto-generated)
├── ios/                  # iOS native code (auto-generated)
├── src/
│   ├── components/       # Reusable UI components
│   │   └── ProductItem.js  # Component for each product in the list
│   ├── screens/          # Screen components
│   │   ├── ProductListScreen.js  # Main list screen
│   │   └── ProductDetailScreen.js  # Detail screen
│   ├── redux/            # Redux-related files
│   │   ├── actions/      # Action creators
│   │   │   └── productActions.js
│   │   ├── reducers/     # Reducers
│   │   │   ├── productReducer.js
│   │   │   └── index.js  # Root reducer
│   │   └── store.js      # Redux store configuration
│   ├── navigation/       # Navigation setup
│   │   └── AppNavigator.js
│   ├── services/         # API services
│   │   └── api.js        # Axios instance and API calls
│   └── App.js            # Main entry point (move from root)
├── index.js              # Entry file (points to src/App.js)
├── package.json
└── ...other files
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [React Native CLI](https://reactnative.dev/docs/environment-setup) or Expo
- Android Studio / Xcode for device emulation

### Installation

```bash
# 1. Clone the repository
 https://github.com/Rohit-Jorvekar/Think_Digital_Task_E-commerce-.git


# 2. Install dependencies
npm install

# 3. Install iOS pods (macOS only)
cd ios && pod install && cd ..

# 4. Start the app
npx react-native run-android
# or
npx react-native run-ios
```

---

## 📦 Dependencies

| Package | Purpose |
|---|---|
| `react-native` | Core framework |
| `@react-navigation/native` | Navigation container |
| `@react-navigation/stack` | Stack navigator |
| `react-redux` | State management |
| `redux` | Store |
| `axios` | HTTP client |

Install all at once:

```bash
npm install @react-navigation/native @react-navigation/stack react-redux redux axios react-native-screens react-native-safe-area-context
```

---

## 🔌 API

This app uses the free [FakeStore API](https://fakestoreapi.com).

| Endpoint | Description |
|---|---|
| `GET /products` | Fetch all products |
| `GET /products/:id` | Fetch single product |

No API key required.


```

---

## 🎨 Design Highlights

- **Color palette** — Purple accent (`#6C63FF` / `#5B4FE9`), light grey background
- **Hero section** — Soft circular gradient behind product image
- **Star ratings** — Pixel-accurate half-star support via CSS clipping
- **Pills / Tags** — Category, shipping, and stock status indicators
- **Smooth animations** — `Animated.parallel` for fade + spring slide + scale on mount

---

## 🛠️ Customization

- Swap the base URL in `src/api/api.js` to point to your own backend
- Add cart functionality by extending the Redux store
- Enable the commented-out back arrow in `ProductDetailScreen.js` if you prefer an in-screen button over the header back button

---

## 📄 License

MIT © [Rohit Jorvekar](https://github.com/Rohit-Jorvekar)

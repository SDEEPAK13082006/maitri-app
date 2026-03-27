# 🎨 MAITRI Client - Frontend UI

React.js + Vite + Tailwind CSS frontend for MAITRI.

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Frontend runs on `http://localhost:5173`

## 📁 Structure

```
client/src/
├── components/           # Reusable UI components
│   ├── Navbar.jsx
│   ├── Button.jsx
│   ├── Card.jsx
│   ├── Alert.jsx
│   ├── LoadingSpinner.jsx
│   └── MoodSelector.jsx
├── pages/                # Full page components
│   ├── LandingPage.jsx
│   ├── LoginPage.jsx
│   ├── SignupPage.jsx
│   ├── DashboardPage.jsx
│   ├── ChatPage.jsx
│   └── HealthPage.jsx
├── services/             # API calls
│   ├── api.js            # Axios setup
│   └── endpoints.js      # API service methods
├── context/              # State management
│   ├── AuthContext.jsx   # Auth state
│   └── ProtectedRoute.jsx # Route protection
├── styles/               # Global styles
│   └── globals.css       # Tailwind + custom CSS
├── App.jsx               # Main app component
└── main.jsx              # React entry point
```

## 🎨 Pages

### Landing Page (`/`)
- Welcome message
- Feature highlights
- Sign up / Login buttons
- Hero section

### Login Page (`/login`)
- Email and password form
- Form validation
- Error messages
- Link to signup

### Signup Page (`/signup`)
- Full registration form
- Password matching
- Mission info (optional)
- Account creation

### Dashboard (`/dashboard`)
- Welcome panel
- Daily health summary
- Mood trend chart
- Health statistics
- Alert system

### Chat Page (`/chat`)
- ChatGPT-like interface
- Real-time messages
- AI responses
- Suggested actions

### Health Tracker (`/health`)
- Mental health tab
  - Mood logging
  - Stress level
  - Notes
- Physical health tab
  - Sleep hours
  - Water intake
  - Exercise tracking
  - Quick buttons

## 🔌 Components

### Button
Customizable button with variants:
```jsx
<Button variant="primary|secondary|neon|outline|ghost" size="sm|md|lg">
  Click me
</Button>
```

### Card
Glassmorphism card with animation:
```jsx
<Card className="...">
  Content here
</Card>
```

### Alert
Alert messages with types:
```jsx
<Alert type="success|error|warning|info" message="Message" />
```

### MoodSelector
10-emoji mood selector:
```jsx
<MoodSelector value={mood} onChange={setMood} />
```

## 🔗 API Services

### Auth Service
```js
authService.signup(data)
authService.login({ email, password })
authService.getProfile()
authService.updateProfile(data)
```

### Dashboard Service
```js
dashboardService.getDashboard()
```

### Mood Service
```js
moodService.logMood(data)
moodService.getMoodHistory(days)
moodService.getTodaysMood()
moodService.updateMood(moodId, data)
```

### Health Service
```js
healthService.logHealthData(data)
healthService.getHealthData(date)
healthService.getHealthSummary()
```

### Chat Service
```js
chatService.sendMessage(data)
chatService.getChatHistory(limit)
chatService.createConversation(data)
chatService.getConversation(conversationId)
```

## 🎯 Features

- **Responsive Design**: Works on desktop, tablet, mobile
- **Dark Theme**: Space-themed UI with glassmorphism
- **Smooth Animations**: Framer Motion for transitions
- **Charts**: Recharts for data visualization
- **Form Validation**: Client-side validation
- **Error Handling**: User-friendly error messages
- **Loading States**: Spinners for async operations
- **Protected Routes**: Authentication guard

## 💅 Styling

### Tailwind CSS
- Pre-configured with space theme colors
- Custom CSS variables
- Responsive utilities

### Custom Styles (`globals.css`)
- Glassmorphism effect
- Custom animations
- Scrollbar styling
- Badge components
- Loading spinner

### Theme Colors
```
Primary: #1a1a2e (Deep Blue)
Secondary: #16213e (Darker Blue)
Accent: #0f3460 (Accent Blue)
Neon: #e94560 (Neon Pink)
```

## 🧪 Development

### Hot Reload
Vite provides instant hot module reload (HMR)

### Browser DevTools
- React Developer Tools extension
- Network tab for API calls
- Console for errors

### Testing API Calls
Add logging in api.js:
```js
API.interceptors.response.use(
  (response) => {
    console.log('API Response:', response)
    return response
  }
)
```

## 📦 Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🚀 Production Build

```bash
npm run build
# Creates optimized dist/ folder
# Upload to hosting service (Vercel, Netlify, etc.)
```

## 🔐 Authentication

- JWT token stored in localStorage
- Auto-attached to API requests
- Auto-refresh on 401 error
- Logout clears token and redirects

## 🎨 Customization

### Change Theme Colors
Edit `tailwind.config.js`:
```js
colors: {
  primary: '#your-color',
  // ...
}
```

### Change Base Font
Edit `globals.css` or `tailwind.config.js`

### Add New Page
1. Create component in `pages/`
2. Add route in `App.jsx`
3. Link from navbar

## 📱 Responsive Breakpoints

- SM: 640px
- MD: 768px
- LG: 1024px
- XL: 1280px

## 🐛 Troubleshooting

**Blank page**: Check console (F12) for errors

**API errors**: Verify backend is running on port 5000

**Styling not loading**: Run `npm install` to ensure Tailwind installed

**Hot reload not working**: Restart dev server

## 📚 Technologies

- React 18 - UI library
- Vite - Build tool
- React Router - Navigation
- Axios - HTTP client
- Framer Motion - Animations
- Recharts - Charts
- Tailwind CSS - Styling

## 🎓 React Patterns

- Functional components with hooks
- Context API for state
- Custom hooks for reusable logic
- Protected routes for auth
- Error boundaries (can add)

---

For complete setup instructions, see [SETUP.md](../SETUP.md)

# Lenme Borrow — Expo App

A pixel-faithful implementation of the Lenme Borrow screen, built with Expo Router, React Hook Form, Zod validation, and persistent auth via SecureStore.

---

## Table of Contents

- [Setup Instructions](#setup-instructions)
- [How to Run the App](#how-to-run-the-app)
- [Project Structure](#project-structure)
- [Libraries Used](#libraries-used)
- [Architecture Decisions](#architecture-decisions)
- [Assumptions Made](#assumptions-made)

---

## Setup Instructions

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18 or later
- [Expo CLI](https://docs.expo.dev/get-started/installation/) — `npm install -g expo-cli`
- [Expo Go](https://expo.dev/client) on your physical device, **or** an iOS Simulator / Android Emulator

### 1. Install dependencies

```bash
npm install
```

### 2. Install Expo-managed native packages

```bash
npx expo install expo-router expo-secure-store expo-constants expo-linking expo-status-bar
npx expo install react-native-screens react-native-safe-area-context
npx expo install react-native-svg
```

### 3. Install JS libraries

```bash
npm install react-hook-form zod @hookform/resolvers
```

### 4. Configure app.json

Expo Router requires a URL scheme and Metro bundler for web. Add the following to your `app.json`:

### 5. Configure package.json entry point

Expo Router takes over the entry point. Set `main` in `package.json`:

---

## How to Run the App

```bash
# Start the Metro bundler
npx expo start

# Run on iOS Simulator
npx expo run:ios

# Run on Android Emulator
npx expo run:android

# Scan with Expo Go on a physical device
# → Press 's' in the terminal to switch to Expo Go mode, then scan the QR code
```

---

## Project Structure

```
app/
├── _layout.tsx                  # Root Stack — wraps AuthProvider + NavigationGuard
├── index.tsx                    # Entry point — shows SplashLoader, then redirects
├── (auth)/
│   ├── _layout.tsx              # Auth group Stack
│   └── login.tsx                # Login screen
└── (main)/
    ├── _layout.tsx              # Main (protected) group Stack
    └── borrow.tsx               # Borrow screen

components/
├── AmountSelector.tsx           # SVG arc dial with +/- step controls
├── AvailableCreditCard.tsx      # Credit balance card + earn banner
├── BottomNavBar.tsx             # 4-tab bottom navigation bar
├── BorrowHeader.tsx             # Purple top bar with menu + gift icon
├── CryptoToggle.tsx             # Crypto ownership toggle row
├── FormInput.tsx                # Controlled input with focus/error states + password toggle
├── OffersBanner.tsx             # Partner offers notification card
├── PrimaryButton.tsx            # Reusable button (filled / outline / ghost variants)
├── SplashLoader.tsx             # Full-screen branded spinner shown on cold launch
└── TotalAmountRow.tsx           # Fee summary row with proceed arrow button

constants/
└── Colors.ts                    # Full design token map including brand primaries

context/
└── AuthContext.tsx              # Auth state + SecureStore persistence (signIn / signOut)

schemas/
└── loginSchema.ts               # Zod schema for email + password validation
```

---

## Libraries Used

| Library                          | Version | Purpose                                             |
| -------------------------------- | ------- | --------------------------------------------------- |
| `expo-router`                    | SDK 51+ | File-based navigation with route groups             |
| `expo-secure-store`              | SDK 51+ | Encrypted on-device token persistence               |
| `react-hook-form`                | ^7.x    | Performant form state management                    |
| `zod`                            | ^3.x    | Schema declaration and runtime validation           |
| `@hookform/resolvers`            | ^3.x    | Bridges Zod schema into React Hook Form             |
| `react-native-svg`               | ^14.x   | SVG rendering for the arc amount dial               |
| `react-native-screens`           | —       | Native navigation primitives (Expo Router peer dep) |
| `react-native-safe-area-context` | —       | Safe area insets (Expo Router peer dep)             |

**Brand / Design:**

- Primary: `#7357F5`
- Secondary: `#4A27E7`
- CTA / Logo accent: `#FFC207`

---

## Architecture Decisions

### 1. Expo Router with route groups

Expo Router's file-based routing was chosen over React Navigation's imperative API because it co-locates layout and screen logic, makes deep linking zero-config, and scales cleanly as more screens are added. Route groups `(auth)` and `(main)` are used to namespace screen sets without affecting the visible URL — a standard Expo Router pattern for separating unauthenticated and authenticated flows.

### 2. Centralised auth via React Context + SecureStore

All auth state lives in a single `AuthContext` that wraps the entire app at the root layout level. `expo-secure-store` is used instead of `AsyncStorage` because it stores values in the device's secure enclave (Keychain on iOS, Keystore on Android), making it appropriate for session tokens. On cold launch, the context reads SecureStore asynchronously before rendering any screen, avoiding a flash of the wrong route.

### 3. NavigationGuard pattern

Rather than protecting individual screens, a single `NavigationGuard` component is rendered inside the root layout. It watches `token`, `isLoading`, and `useSegments()` and performs redirects reactively. This means:

- `signIn()` sets the token → guard redirects to `/(main)/borrow` automatically
- `signOut()` clears the token → guard redirects to `/(auth)/login` automatically
- No screen needs to call `router.replace()` manually after an auth action

### 4. SplashLoader on cold launch

`app/index.tsx` renders a branded full-screen spinner while `isLoading` is true (i.e. while SecureStore is being read). Once resolved it immediately redirects — users with an existing session never see the login screen, and users without one never see a flash of the borrow screen.

### 5. Zod + React Hook Form

Zod schemas are defined once in `schemas/loginSchema.ts` and passed to React Hook Form via `@hookform/resolvers`. This keeps validation rules out of component files, makes them independently testable, and gives full TypeScript inference of form values via `z.infer<typeof loginSchema>`. Field errors surface on blur (`mode: "onTouched"`) to avoid showing errors before the user has interacted with a field.

### 6. Reusable component library

Every UI element is extracted into a standalone component with typed props and no internal side effects. Components accept callback props (`onPress`, `onValueChange`) and hold no auth or navigation logic — that is the responsibility of the screen layer. This makes each component individually reusable and testable.

### 7. Color tokens

All colors are defined in `constants/Colors.ts` as a flat object. The two brand primaries (`#7357F5`, `#4A27E7`) are used directly as string literals in component `StyleSheet`s to keep the relationship with the design file explicit. All other palette values reference the named tokens.

---

## Assumptions Made

- **Authentication is mocked.** The login screen simulates an 800ms network delay and stores a hardcoded fake token. In production, replace the `setTimeout` block in `onSubmit` with your real API call and pass the token returned by your server into `signIn(token)`.

- **Single protected route.** Only `/(main)/borrow` is currently behind the auth guard. As the app grows, all screens added under `app/(main)/` are automatically protected because the `NavigationGuard` checks `segments[0] === "(auth)"` — anything outside that group requires a valid token.

- **Token = session.** The persisted value is treated as a binary "logged in / not logged in" signal. No token expiry, refresh logic, or JWT decoding is implemented. These should be added once a real backend is integrated.

- **Sign-out is on the menu button.** The hamburger icon in `BorrowHeader` calls `signOut()` as a placeholder. In a real app this would live in a drawer or settings screen.

- **Expo SDK 51+.** The project assumes a modern Expo SDK where Expo Router v3, `expo-secure-store` v13+, and file-based routing are all stable. Older SDK versions may require different package versions or configuration.
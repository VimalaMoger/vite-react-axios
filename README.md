# E-Store UI

## Axios in a Vite + React project

Components created:

 ```
Header functional component(Menu items enhancement), About, Contact, Login, Cart
SearchBox and Dropdown
Home, PageTitle, PageHeading
ProductCard, ProductListings, Price, ProductDetail
Checkout
Register, Profile, UserOrders, AdminOrders/Messages with action buttons
Footer
```

Features and enhancements:

- Display Loading.. when page loads and error message in Home page
- Login success action from Login page
- Props and children
- Handling events in React
- Showing toast messages and redirect
- Font Awesome library for icons

React Hooks:

- UseState, useEffect, useMemo, useSubmit, useContext, useReducer,

React Routes:

- Routes definition using Outlet
- Building dynamic Routes and useParams() hook
- Navigating with Link and NavLink, useNavigation, useLocation, useNavigate
- Building error page using errorElement and useRouteError

- Building Cart Context and Auth Context using React Context API
- Protecting Routes based on Auth state

Migrating Cart state from React Context to Redux store

- Redux and useReducer
- Building Redux store: Creating cart slice, and store
- Update React app to use cart state data from redux store

Stripe account creation:

- Implementing Checkout with Stripe with required Address details before proceed with Checkout
- Payment processing using Orders API call for saving Order details in user Profile Orders section

Axios:
- Axios library for API call, including CORS during development
- Axios instance with default settings
- Sending JWT Token in the request for back end validation

Tailwind CSS:

- Dark mode and styling
- Toggle themes

UI:

- Testing end to end registration flow
- Testing end to end register, login operations with new changes
- Testing the app to validate Redux changes around the cart state

Dependencies:

- Node.js v24.11.1
- Npm 11.6.2
- Tailwind CSS 4.2.3
- VITE 8.0.11
- Axios
- React-router-dom
- React stripe js
- Redux/toolkit
- JS cookie
- React toastify

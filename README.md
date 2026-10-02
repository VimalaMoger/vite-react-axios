# E-Store UI
Created a UI with Header, Body and Footer section. Header contains menu items such as Home, About, Login, and Cart. Body section includes Page Title and Heading, Search box, Dropdown filter, and Product Cards. Each Product Card displays the Price, Stock level and Product Title with description along with two clickable buttons: **Add to Cart and View Product**. Once the item is added to the cart, user can either click the View Cart button or access the Cart tab at the top of the page. Cart page contains Checkout button. To proceed with Checkout the user needs to Sign in and enter address details, which are saved to their profile. User is made to Check out page where they enter payment details to successfully complete the order

**Initial set up**
 ``` 
Node.js
Vite :
  npm create vite@latest easystore-ui
  	  - select framework: React
  	  - select a variant: JavaScript
cd to project folder
npm install
     - installs all the required dependencies
npm run dev
     - runs UI application
The terminal will display a local development server URL(http:localhost:5173). Open a browser to view the app
Visual Studio Code editor to open the project

Node.js v24.11.1, NPM 11.6.2, Tailwind CSS 4.2.3, VITE 8.0.11, Axios, Font Awesome library, React stripe js, Redux toolkit, JS cookie, React toastify, Visual Studio code Editor
```

## Project Structure
```bash
       
        │── src/
                ├── api-requests
                    ├── product fetch/save
                    ├── order fetch/save
                    ├── profile fetch/receiver
                    ├── register save
                    ├── payment save
                    ├── login save
                ├── api
                    ├── apiClient
                |── components/
                    ├── footer
                    ├── home
                    ├── login
                    ├── products
                    ├── register
                    ├── search
                    ├── searchfilter
                    ├── userdata
                    ├── About
                    ├── Cart
                    ├── CartCounter
                    ├── CartTotal
                    ├── Checkout
                    ├── Contact
                    ├── ErrorPage
                    ├── Header
                    ├── ItemAddedPopup
                    ├── Order-success
                    ├── ProtectedRoute
                    ├── StockLevel                    
                ├── contexts
                    ├── contextusingRedux
                        ├── cart-slice.js
                        ├── store.js
                    ├── auth-context.jsx
                    ├── auth-reducer.jsx
                │── App.jsx
                │── main.jsx
```

### Features and enhancements:

- Display Loading.. when page loads or Error message in Home page
- Login success action from Login page
- Props and children
- Handling events in React
- Showing toast messages and redirect
- Font Awesome library for icons

### React Hooks:

- UseState, useEffect, useMemo, useSubmit, useContext, useReducer,

### React Routes:

- Routes definition using Outlet
- Building dynamic Routes and useParams() hook
- Navigating with Link and NavLink, useNavigation, useLocation, useNavigate
- Building error page using errorElement and useRouteError

- Building Cart Context and Auth Context using React Context API
- Protecting Routes based on Auth state

### Migrating Cart state from React Context to Redux store

- Redux and useReducer
- Building Redux store: Creating cart slice, and store
- Update React app to use cart state data from redux store

### Stripe account creation:

- Implementing Checkout with Stripe with required Address details before proceed with Checkout
- Payment processing using Orders API call for saving Order details in user Profile Orders section

### Axios:
- Axios library for API call, including CORS during development
- Axios instance with default settings
- Sending JWT Token in the request for back end validation

### Tailwind CSS:

- Dark mode and styling
- Toggle themes

### UI:

- Testing end to end registration flow
- Testing end to end register, login operations with new changes
- Testing the app to validate Redux changes around the cart state

***Build and deployment***

[App to view](https://lighthearted-stroopwafel-c66603.netlify.app/)

```test card 4242 4242 4242 4242```

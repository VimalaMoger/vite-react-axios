import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from './App.jsx';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import HomeComponent from "./components/home/Home";
import About from "./components/About";
import Contact, { contactLoader } from "./components/Contact";
import Login from "./components/login/Login";
import Register, { registerAction } from "./components/register/Register";
import Cart from "./components/Cart";
import ErrorPage from "./components/ErrorPage";
import { productLoader } from "./components/home/Home";
import { profileAction, profileLoader } from "./components/userdata/Profile";
import { contactAction } from "./components/Contact";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductDetail from "./components/products/ProductDetail";
//import CartContextProvider from './contexts/cartContext';
import { AuthContextProvider } from "./contexts/auth-context.jsx";
import { loginAction } from "./components/login/Login";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Checkout from "./components/Checkout.jsx";
import ProfileComponent from "./components/userdata/Profile";
import OrdersComponent from "./components/userdata/Orders.jsx";
import { ordersLoader } from "./components/userdata/Orders.jsx";
import AdminOrdersComponent from "./components/userdata/admin/Orders.jsx";
import { adminViewOrdersLoader } from "./components/userdata/admin/Orders.jsx";
import MessageComponent from "./components/userdata/admin/Messages.jsx";
import { adminMessageLoader } from "./components/userdata/admin/Messages.jsx";
import { loadStripe } from "@stripe/stripe-js"; 
import { Elements } from "@stripe/react-stripe-js";
import OrderSuccessComponent from "./components/Order-success.jsx";
import { Provider } from "react-redux";
import store from "./contexts/contextusingRedux/store.js";

const stripePromise = loadStripe("pk_test_51TvksSCkcD6FriWWjWIV0aUk1MCQLaGdGzE1UhCOEjJ4rfUJUHohO1VGp3pLv2q4Lylg8WIsShpLEf1QhUscGzEU002E2S6GtF");

const routerDefinition = createRoutesFromElements(
  <Route path="/" element={<App />} errorElement={<ErrorPage />}>
    <Route index element={<HomeComponent />} loader={productLoader}></Route>
    <Route path="/home" element={<HomeComponent />} loader={productLoader}></Route>
    <Route path="/products/:productId" element={<ProductDetail/>}></Route>
    <Route path="/about" element={<About />}></Route>
    <Route path="/contact" element={<Contact />} action={contactAction} loader={contactLoader}></Route>
    <Route path="/login" element={<Login />} action={loginAction}></Route>
    <Route path="/register" element={<Register />} action={registerAction}></Route>
    <Route path="/cart" element={<Cart />}></Route>
    <Route element={<ProtectedRoute />}>
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order-success" element={<OrderSuccessComponent />} />
      <Route path="/profile" element={<ProfileComponent />} loader={profileLoader} action={profileAction} 
       shouldRevalidate={({ actionResult }) => {
          return !actionResult?.success;
        }}/>
      <Route path="/orders" element={<OrdersComponent />} loader = {ordersLoader} />
      <Route path="/admin/orders" element={<AdminOrdersComponent />} loader = {adminViewOrdersLoader} />
      <Route path="/admin/messages" element={<MessageComponent />} loader = {adminMessageLoader}/>
    </Route>
  </Route>
);
const appRouter = createBrowserRouter(routerDefinition);
/*const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomeComponent />,
      },
      {
        path: "/home",
        element: <HomeComponent />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
]);*/


createRoot(document.getElementById('root')).render(
  <>
    <Elements stripe={stripePromise}>
      <AuthContextProvider>
        {/* <CartContextProvider> */}
        <Provider store={store}>
          <RouterProvider router={appRouter} />
        </Provider>
      {/* </CartContextProvider> */}
      </AuthContextProvider> 
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          draggable
          pauseOnHover
          theme={localStorage.getItem("theme")==="dark"?"dark":"light"}
          transition={Bounce}
        />
    </Elements>
  </>,
)

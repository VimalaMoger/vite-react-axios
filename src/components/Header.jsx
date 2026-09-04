import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faMoon, faShoppingBasket, faSun, faTags } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import CartCounter from "./CartCounter";
import CartTotalAmount from "./CartTotal";
import { useAuth } from "../contexts/auth-context";
import { toast } from "react-toastify";
//import { useCart } from "../contexts/cartContext";
import { useSelector, useDispatch } from "react-redux";
import { clearBasket } from "../contexts/contextusingRedux/cart-slice";

const HeaderComponent = () => {

  const { getAuthItems, logout } = useAuth();
  const isAuthenticated = getAuthItems()[0]?.isAuthenticated;
  const userName = getAuthItems()[0]?.user.name;
  const [totalCount, setTotalCount] = useState(0);
  const [total, setTotal] = useState(0);
  const location = useLocation();
  const userMenuRef = useRef();
  const navigate = useNavigate();
  //const { clearBasket } = useCart();
  const dispatch = useDispatch();

  const [theme, setTheme] = useState(() => {
    return sessionStorage.getItem('theme') === "dark" ? "dark" : "light";
  });

  const isAdmin = getAuthItems()[0]?.user?.roles?.includes("ROLE_ADMIN");
  const [isUserMenuOpen, setUserMenuOpen]= useState(false);
  const [isAdminMenuOpen, setAdminMenuOpen]= useState(false);
  const toggleAdminMenu = () => setAdminMenuOpen((prev) => !prev);
  const toggleUserMenu = () => setUserMenuOpen((prev) => !prev);

  useEffect(() => {
    if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    setAdminMenuOpen(false);
    setUserMenuOpen(false);
    const handleClickOutside=(even)=>{
      if(userMenuRef.current && !userMenuRef.current.contains(even.target)){
        setAdminMenuOpen(false);
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, [theme, location.pathname]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      /* if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      } */
      sessionStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  const logMeOut =(e) =>{
    e.preventDefault();
    //clearBasket();
    dispatch(clearBasket());
    logout();
    toast.success("Logged out successfully!");
    navigate("/home");
  }

  const dropDownLinkClass = "text-center text-lg font-primary font-semibold text-blue-700 py-2 dark:text-light hover:bg-grey-100 dark:hover:bg-grey-600"

  return (
    <header className="text-blue-700 border-b-2 sticky top-0 z-20 font-medium bg-transparent shadow-md dark:bg-darkbg">
      <div className="mx-auto flex justify-between max-w-6xl p-8 dark:bg-darkbg">
        {/* <Link to="/" className="flex, text-center, decoration-0"> */}
        <NavLink to="/" className={({isActive}) => isActive ? `underline decoration-sky-950 underline-offset-4 decoration-dotted`: `no-underline`}>
          <FontAwesomeIcon icon={faTags} className="h-8 w-8 text-blue-900"/>
          <span className="font-medium">Eazy Stickers</span>
        </NavLink>      
        <nav className="flex">
          <button className="flex items-center justify-around mx-4 h-8 w-8 border border-mint-500 rounded-full dark:border-black transition duration-300 hover:bg-amber-300 dark:hover:bg-grey-600" aria-label="Toggle theme"
            onClick={toggleTheme}>
            <FontAwesomeIcon icon={theme==="dark" ? faMoon: faSun} className="w-4 h-4 dark:text-light text-blue-500"/>
          </button>
          <ul className="flex list-none m-0 p-0 gap-x-8">
            <li>
              <NavLink to="/home" className={({isActive}) => isActive ? `underline decoration-sky-950 underline-offset-4 decoration-2`: `no-underline`}>Home</NavLink>                  
            </li>
            <li>
              <NavLink to="/about" className={({isActive}) => isActive ? `underline decoration-sky-950 underline-offset-4 decoration-2`: `no-underline`}>About</NavLink>                  
            </li>
            <li>
              <NavLink to="/contact" className={({isActive}) => isActive ? `underline decoration-sky-950 underline-offset-4 decoration-2`: `no-underline`}>Contact</NavLink>                  
            </li>
            <li>
              {isAuthenticated ? (
                <div className="relative" ref={userMenuRef}>
                  <button onClick={toggleUserMenu} className="relative text-blue-700">
                    <span className="decoration-sky-950 underline-offset-4 decoration-2">{`Hello ${userName.length > 5 ? `${userName.slice(0,5)}...`: userName}`}</span>
                    <FontAwesomeIcon icon={faAngleDown} className="text-blue-500 dark:text-light w-6 h-6"/>
                  </button>
                  { isUserMenuOpen && (
                    <div className="absolute right-0 w-35 bg-normalbg dark:bg-darkbg border border-gray-300">
                      <ul className="py-2">
                        <li>
                          <Link to="/profile" className={dropDownLinkClass}>Profile</Link>
                        </li>
                        <li>
                          <Link to="/orders" className={dropDownLinkClass}>Orders</Link>
                        </li>
                        { isAdmin && (
                          <li>
                            <button onClick={toggleAdminMenu} className={`${dropDownLinkClass} flex items-center justify-between`}>Admin
                              <FontAwesomeIcon icon={faAngleDown}/>
                            </button>
                            { isAdminMenuOpen && (
                              <ul className="ml-4 mt-2 space-y-2">
                                <li>
                                  <Link to="/admin/orders" className={dropDownLinkClass}>Orders</Link>
                                </li>
                                <li>
                                  <Link to="/admin/messages" className={dropDownLinkClass}>Messages</Link>
                                </li>
                              </ul>
                            )}
                          </li>
                        )}
                        <li>
                          <Link to="/home" onClick={ logMeOut } className={ dropDownLinkClass }>Logout</Link>
                        </li>
                      </ul>
                    </div>
                    )
                  }                  
                </div>           
              ) : (
                <NavLink to="/login" className={({isActive}) => isActive ? `underline decoration-sky-950 underline-offset-4 decoration-2`: `no-underline`}>Login</NavLink>                  
              )}
              
            </li>
            <li className="relative flex flex-row">
              <Link to="/cart">
                <FontAwesomeIcon icon={faShoppingBasket} className="h-18 w-18 text-blue-900"/>
                <CartCounter totalCount={totalCount} setTotalCount={setTotalCount}/>
                <CartTotalAmount totalAmount={total} setTotalAmount={setTotal}/> 
              </Link>                  
            </li>
          </ul>         
          </nav>
      </div>
    </header>
  );
};

export default HeaderComponent;
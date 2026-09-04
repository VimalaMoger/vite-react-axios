import { Outlet, useNavigation } from "react-router-dom";
import HeaderComponent from "./components/Header.jsx";
import FooterComponent from "./components/footer/footer.jsx";
import HomeComponent from "./components/home/Home.jsx";

function App() {
  const navigation = useNavigation();

  return (
    <>
      <HeaderComponent /> 
      {navigation.state === 'loading' ? 
      (<div className="flex items-center justify-center min-h-213">
        <span className="text-gray-600 font-medium w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin">Processing...</span></div>)
      :(<Outlet />)
      }
      <FooterComponent /> 
    </>
  )
}

export default App

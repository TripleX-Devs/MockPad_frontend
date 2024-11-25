import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LoginPage from "./Components/Login";
import { Route, Routes} from 'react-router-dom';
import AllRoutes from "./Routes/AllRoutes";
function App() {
  return (
    
      <div >

        <Routes>
          <Route path="/*" element={<AllRoutes/>}/>
        </Routes>
        {/* <LoginPage /> */}
      </div>
    
  );
}

export default App;

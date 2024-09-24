
import React from "react"
import './asset/css/style.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import PrivateComponents from './components/PrivateComponents'
import Publishers from './pages/Publishers'
import Dashboard from './pages/Dashboard';
import DashboardData from "./ApiData/Dashboard.json";
import PymtApiData from './ApiData/menulist'
import environment from "./ApiData/environment";  
import MatchAPI from "./ApiData/matchAPI";
import Modules from './pages/Modules'
import MenuPage from "./pages/MenuPage"
import BitrateSetting from "./pages/BitrateSetting";
import Permission from "./pages/Permission";
import ManagePermission from "./pages/ManagePermission";
import Roles from './pages/Roles';
import PaymentGateway from './pages/PaymentGateway'
import ChangePassword from "./pages/ChangePassword";
import Errorpage from "./components/404page";
function App() {
  const auth = sessionStorage.getItem('access_token');
  return (
    <div className="App">
      <Router>
        {
          auth ?
            <Routes>
              <Route element={<PrivateComponents />}>                
                <Route exact path='/' element={<Dashboard data={DashboardData} apiData={MatchAPI} />} ></Route>
                <Route path='/dashboard' element={<Dashboard data={DashboardData} apiData={MatchAPI}/>} ></Route>
                <Route path='/publishers' element={<Publishers data={MatchAPI}  />} ></Route>
                <Route path='/module-setting' element={<Modules data={MatchAPI} />} ></Route>
                <Route path='/menus-setting' element={<MenuPage data={MatchAPI} />} ></Route>
                <Route path='/add-networks' element={<Dashboard data={DashboardData} />} ></Route>
                <Route path='/bitrate-setting' element={<BitrateSetting data={MatchAPI} />} ></Route>
                <Route path='/super-admin-edit' element={<Dashboard data={DashboardData} />} ></Route>
                <Route path='/manage-permission' element={<Permission data={MatchAPI} />} ></Route>
                <Route path='/permissions' element={<ManagePermission data={MatchAPI} />} ></Route>
                <Route path='/roles' element={<Roles data={MatchAPI} />} ></Route>
                <Route path='/payment-gateway' element={<PaymentGateway data={PymtApiData} />} ></Route>
                <Route path='/chnage-password' element={<ChangePassword data={MatchAPI} />} ></Route>
                <Route path='/error_page' element={<Errorpage />} ></Route>
              </Route>
            </Routes>
            :
            <Routes>
              <Route exact path='/' element={<Login apidata={environment.apiBaseUrl} />} ></Route>
            </Routes>
        }
      </Router>
    </div>
  );
}

export default App;

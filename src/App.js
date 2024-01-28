/* Main APP File */

import './App.css';
import Header from './components/partials/Header';
import Login from './components/main/Login';
import { Routes, Route } from 'react-router-dom';
import Landing from './components/main/Landing'; //landing page with plain FETCH API
import Landing_EJ2 from './components/main/Landing_EJ2'; //a version of the landing page that makes use of EJ2-Data for better integration with EJ2 Components
import 'alertifyjs/build/css/alertify.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/partials/Footer';


function App() {
  
  return (
    <div className="App">
      <Header/> {/* Header of the page */}
      <Routes> {/* Necessary routes of the application, namely the login and the landing pages */}
        <Route path="/" element={<Login/>}/>
        <Route path="/main" element={<Landing/>}/> {/* Can be switched between Landing and Landing_EJ2 for test purposes */}
      </Routes>
      <Footer/> {/* Footer of the page */}
    </div>
  );
}

export default App;

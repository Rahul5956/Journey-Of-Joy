import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import MainNavBar from './Components/MainNavBar';
import { Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn';
import Header from './Components/Header';
import AboutUs from './pages/AboutUs';
import TourList from './pages/TourList';
import SignUp from './pages/SignUp';

import AddHotels from './pages/AdminController/AddHotels';
import HotelList from './pages/AdminController/DeleteHotel';
import AdminDashboard from './pages/AdminController/AdminDashboard';
import TourLis from './pages/AdminController/TourManagement';
import DestinationManagement from './pages/AdminController/DestinationManagement';
import AddDestination from './pages/AdminController/AddDestination';
import EditDestination from './pages/AdminController/EditDestination';
import HotelManagement from './pages/AdminController/HotelManagement';
import BookingManagement from './pages/AdminController/BookingManagement';
import ReviewManagement from './pages/AdminController/ReviewManagement';
import PaymentManagement from './pages/AdminController/PaymentManagement';
import EditHotel from './pages/AdminController/EditHotel';

import Payment from './pages/Payment';
import PaymentPage from './pages/PaymentPage';
import Logout from './pages/Logout';
import Footer from './Components/Footer';

import ResetPassword from './pages/ResetPassword';




function App() {
  return (
    <div>
      <Header></Header>
      <MainNavBar></MainNavBar>
      <Routes>

      <Route path="/" element={<SignIn/>} />

      {/* <Route path="/" element={<SignIn/>} /> */}

      <Route path="/aboutus" element={<AboutUs/>} />
      <Route path="/TourList" element={<TourList/>} />
      <Route path="/AddHotels" element={<AddHotels/>}/>
      <Route path='/deleteHotelById' element={<HotelList/>}/>
      <Route path="admin/dashboard/tours" element={<TourLis />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/add-destination" element={<AddDestination />} />
      <Route path="/edit-destination/:id" element={<EditDestination />} />
      <Route path="/edit-hotel/:id" element={<EditHotel />} />
      <Route path="admin/dashboard/bookings" element={<BookingManagement />}/>
      <Route path="admin/dashboard/payments" element={<PaymentManagement />}/>
      <Route path="admin/dashboard/reviews" element={<ReviewManagement />}/>
      <Route path="admin/dashboard/destinations" element={<DestinationManagement />}/>
      <Route path="admin/dashboard/hotels" element={<HotelManagement />}/>

      <Route path="/" element={<TourList/>} />
      <Route path="/SignIn" element={<SignIn/>} />
      <Route path="/TourList" element={<TourList/>} />
      <Route path="/payment"element={<Payment/>} ></Route>
      <Route path='/makePayment' element={<PaymentPage/>}/>



      <Route path="/reset-password" element={< ResetPassword/>} />

      <Route path="/SignUp" element={<SignUp></SignUp>}></Route>
      <Route path="/logout" element={<Logout />} />
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;

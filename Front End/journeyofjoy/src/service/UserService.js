import axios from 'axios';

const baseurl = "http://localhost:8080/users"; 

class UserService {

    userSignIn(authDTO) {
        return axios.post(`${baseurl}/signin`, authDTO);
    }

    userRegistration(userRespDTO) {
        return axios.post(`${baseurl}/userRegistration`, userRespDTO);
    }
    getHotelsByDestinationId(destinationId) {
        return axios.get(`${baseurl}/gethotels`, { params: { destinationid: destinationId } });
      }

    bookTour(tourDTO, hotelId) {
        return axios.post(`${baseurl}/createtour?hotelId=${hotelId}`, tourDTO)
      
    }

    searchDestination(location) {
        return axios.get(`${baseurl}/searchDestination`, { params: { Location: location } });
    }

    addTourReview(reviewDTO, tourId) {
        return axios.post(`${baseurl}/addTourReview?tourId=${tourId}`, reviewDTO);
    }

    makeBooking(bookingDTO) {
        return axios.post(`${baseurl}/makeBooking` ,bookingDTO);
    }
    makePayment(paymentDTO, bookingId) {
        return axios.post(`${baseurl}/makePayment?bookingId=${bookingId}`, paymentDTO);
    }

    resetPassword(email, newPassword) {
        return axios.post(`${baseurl}/resetPassword`, null, { params: { email, newPassword } });
    }

}

export default new UserService();

import axios from 'axios';

var baseUrl="http://localhost:8080/Admin"

class AdminService{
    listAllTour(){
        return axios.get(`${baseUrl}/getAllTour`);
    }


    // Destination Management
    listAllDestination(){
        return axios.get(`${baseUrl}/getAllDestination`);
    }
    addNewDestination(DestinationDTO){
        return axios.post(`${baseUrl}/newDestination`, DestinationDTO);
    }
    deleteDestination(DeleteDestinationid){
        return axios.delete(`${baseUrl}/deletedestination/${DeleteDestinationid}`, DeleteDestinationid);
    }
    getDestinationByid(id){
        return axios.get(`${baseUrl}/getDestinationById/${id}`,id);
    }
    updateDestination(id,DestinationDTO){
        return axios.put(`${baseUrl}/${id}`, DestinationDTO);
    }


// Hotel Management
    addNewhotel(HotelDTO){
        return axios.post(`${baseUrl}/newHotel`, HotelDTO);
    }

    listAllHotels(){
        return axios.get(`${baseUrl}/allhotel`);
    }
    
    deleteHotelDetails(hotelId){
        return axios.delete(`${baseUrl}/deletehotel/${hotelId}`, hotelId);
    }
    getHotelByid(id){
        return axios.get(`${baseUrl}/getHotelById/${id}`,id);
    }
    updateHotelDetails(id,HotelDTO){
        return axios.put(`${baseUrl}/Hotel/${id}`, HotelDTO);
    }

// Booking

    getallbooking(){
        return axios.get(`${baseUrl}/allBoking`);
    }

//  Review 
getallReviews(){
    return axios.get(`${baseUrl}/allReviews`);
}

// Payment
getallPayments()
{
    return axios.get(`${baseUrl}/allPayments`);

}
}
export default new AdminService();
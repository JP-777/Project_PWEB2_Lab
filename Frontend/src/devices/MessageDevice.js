import axios from "axios";

const MESSAGE_BASE_REST_API_URL = "http://localhost:8080/messages";

class MessageDevice {
    getMessagesBetweenUsers(userId1, userId2) {
        const token = localStorage.getItem("token");
        return axios.get(`${MESSAGE_BASE_REST_API_URL}/${userId1}/${userId2}`,{
            headers: { Authorization: `Bearer ${token}` },
        });
    }

    sendMessage(message) {
        const token = localStorage.getItem("token");
        return axios.post(`${MESSAGE_BASE_REST_API_URL}/send`, message, {
            headers: { Authorization: `Bearer ${token}` },
        });
    }
}

export default new MessageDevice();
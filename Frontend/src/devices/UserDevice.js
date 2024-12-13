import axios from "axios";

const API_URL = "http://localhost:8080/api"; // Ajusta según tu configuración

const UserDevice = {
    getAllUsers: async () => {
        const token = localStorage.getItem("token");
        return axios.get(`${API_URL}/users/all`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },
    sendFriendRequest: async (userId, recipientId) => {
        const token = localStorage.getItem("token");
        return axios.post(`${API_URL}/friendships/request`, {
            headers: { Authorization: `Bearer ${token}` },
            senderId: userId,
            recipientId: recipientId ,
        });
    },
};

export default UserDevice;

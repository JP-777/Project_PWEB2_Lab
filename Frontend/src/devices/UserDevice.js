import axios from "axios";

const USER_BASE_REST_API_URL = "http://localhost:8080/api/users/all";

class UserDevice {
    getAllUsers() {
        const token = localStorage.getItem("token");
        return axios.get(USER_BASE_REST_API_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }
}

export default new UserDevice();

import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:4500/api/v1/logins",
    headers: {
        "Content-type": "application/json"
    }
});
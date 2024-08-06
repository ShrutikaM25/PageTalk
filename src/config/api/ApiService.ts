import axios from "axios";
import { getItem } from "@/lib/localStorageControl";

const authHeader = () => ({
    Authorization: `Bearer ${getItem("authToken")}`,
});

const client = axios.create({
    baseURL: "https://pagetalk.onrender.com/",
    headers: {
        Authorization: `Bearer ${getItem("access_token")}`,
        // 'Content-Type': 'application/json',
    },
});

const model = axios.create({
    baseURL: "http://66e1-34-124-136-29.ngrok.io/",
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
});

class ApiService {
    static get(path = "", params = {}) {
        return client({
            method: "GET",
            url: path,
            headers: { ...authHeader() },
            params,
        });
    }

    static post(path = "", data = {}, optionalHeader = {}) {
        return client({
            withCredentials: false,
            method: "POST",
            url: path,
            data,
            headers: { ...authHeader(), ...optionalHeader },
        });
    }

    static postModel(path = "", data = {}, optionalHeader = {}) {
        return model({
            method: "POST",
            url: path,
            data,
            headers: { ...optionalHeader },
        });
    }

    static patch(path = "", data = {}) {
        return client({
            method: "PATCH",
            url: path,
            data: JSON.stringify(data),
            headers: { ...authHeader() },
        });
    }

    static delete(path = "", data = {}) {
        return client({
            method: "DELETE",
            url: path,
            data: JSON.stringify(data),
            headers: { ...authHeader() },
        });
    }

    static put(path = "", data = {}) {
        return client({
            method: "PUT",
            url: path,
            data: JSON.stringify(data),
            headers: { ...authHeader() },
        });
    }
}

export { ApiService };

const getItem = (key: string) => {
    const data = typeof window !== "undefined" ? localStorage.getItem(key) : "";

    try {
        return JSON.parse(data!);
    } catch (err) {
        return data;
    }
};

const setItem = (key: string, value: string) => {
    const stringify = typeof value !== "string" ? JSON.stringify(value) : value;
    return localStorage.setItem(key, stringify);
};

const removeItem = (key: string) => {
    localStorage.removeItem(key);
};

const clearLocalStorage = () => {
    localStorage.clear();
};

export { getItem, setItem, removeItem, clearLocalStorage };

import jwt_decode from "jwt-decode";

export const getToken = () => localStorage.getItem("pokebuilderAuthToken");

export const getAuthConfig = (token) => ({
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

export const getUserID = (token) => {
    let userID = "";
    try {
        userID = jwt_decode(token).id;
    } catch {}
    return userID;
};

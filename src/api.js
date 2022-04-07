import axios from 'axios';

const baseURL = `${process.env.REACT_APP_JOUZUDESUNE_API}/api`;
/* Users */

export const getAllUsers = () => {
    return axios.get(`${baseURL}/users`);
}

export const getUser = (id) => {
    return axios.get(`${baseURL}/users/${id}`);
}

export const deleteUser = (id) => {
    return axios.delete(`${baseURL}/users/${id}`);
}

export const addUser = (user) => {
    return axios.post(`${baseURL}/users`, user);
}

export const updateUser = (updatedUser) => {
    return axios.put(`${baseURL}/users/${updatedUser._id}`, updatedUser)
}

// export const uploadProfilePic = (userId, profilePic) => {
//     return axios.post(`${baseURL}/users/${userId}`, profilePic)
// }

export const upload = (uploadData) => {
    return axios.post(`${baseURL}/upload`, uploadData)
}

/* Auth */

export const signup = (user) => {
    return axios.post(`${baseURL}/auth/signup`, user)
}

export const login = (user) => {
    return axios.post(`${baseURL}/auth/login`, user)
}

export const verify = (storedToken) => {
    return axios.get(`${baseURL}/auth/verify`, {
        headers: { Authorization: `Bearer ${storedToken}`}
    })
}

/* Cards */

export const getAllCards = () => {
    return axios.get(`${baseURL}/cards`);
}

export const getCard = (id) => {
    return axios.get(`${baseURL}/cards/${id}`);
}

export const deleteCard = (id) => {
    return axios.delete(`${baseURL}/cards/${id}`);
}

export const addCard = (card) => {
    return axios.post(`${baseURL}/cards`, card);
}

export const updateCard = (updatedCard) => {
    return axios.put(`${baseURL}/cards/${updatedCard._id}`, updatedCard)
}

/* Decks */

export const getAllDecks = () => {
    return axios.get(`${baseURL}/decks`);
}

export const getDeck = (id) => {
    return axios.get(`${baseURL}/decks/${id}`);
}

export const deleteDeck = (id) => {
    return axios.delete(`${baseURL}/decks/${id}`);
}

export const addDeck = (deck) => {
    return axios.post(`${baseURL}/decks`, deck);
}

export const updateDeck = (updatedDeck) => {
    return axios.put(`${baseURL}/decks/${updatedDeck._id}`, updatedDeck)
}


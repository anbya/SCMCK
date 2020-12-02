import axios from "axios";

export const ADD_USER = "ADD_USER";

const API_URL = process.env.REACT_APP_API_URL;

export const addUser = text => {
    return {
        type: ADD_USER,
        text
    };
};


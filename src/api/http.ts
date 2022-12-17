// import {IResponse} from "../types/UserTypes";
import axios from "axios";

export const baseURL = 'https://62f503b3535c0c50e767cf0c.mockapi.io/api/v1';

const $host = axios.create({
    baseURL
});

export {
    $host
}
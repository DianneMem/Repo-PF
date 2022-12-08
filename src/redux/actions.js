import axios from "axios";
export const GET_ALL_BOOKS = "GET_ALL_BOOKS";
export const GET_ALL_USERS = "GET_ALL_USERS";
export const GET_BOOKS_BY_NAME = "GET_BOOKS_BY_NAME";
export const GET_BOOK_DETAILS = "GET_BOOK_DETAILS";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const GET_LANGUAGES = "GET_LANGUAGES";
export const GET_GENDERS = "GET_GENDERS";

const url = "http://localhost:3001";

export function getAllBooks() {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${url}/products`, {});
      return dispatch({
        type: GET_ALL_BOOKS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getAllUsers() {
  return async function (dispatch) {
    try {
      const user = await axios.get(`${url}/users`);
      return dispatch({
        type: GET_ALL_USERS,
        payload: user.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getCategories() {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${url}/categories`);
      return dispatch({
        type: GET_CATEGORIES,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getLanguages() {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${url}/languages`);
      return dispatch({
        type: GET_LANGUAGES,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function getGenders() {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${url}/genders`);
      return dispatch({
        type: GET_GENDERS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getBooksByName(title) {
  return async function (dispatch) {
    try {
      const searchName = await axios.get(`${url}/products?title=${title}`);
      return dispatch({
        type: GET_BOOKS_BY_NAME,
        payload: searchName.data,
      });
    } catch (error) {
      alert("Book not found!!");
      console.log(error);
    }
  };
}

export function getBooksDetails(id) {
  return async function (dispatch) {
    try {
      let detailsBook = await axios.get(`${url}/products/${id}`);
      return dispatch({
        type: GET_BOOK_DETAILS,
        payload: detailsBook.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function createPost(payload) {
  return async function (dispatch) {
    try {
      let post = await axios.post(`${url}/products`, payload);
      console.log(post.data);
    } catch (error) {
      console.log(error);
    }
  };
}

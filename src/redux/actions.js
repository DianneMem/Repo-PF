import axios from "axios";
export const GET_ALL_BOOKS = "GET_ALL_BOOKS";
export const GET_ALL_USERS = "GET_ALL_USERS";
export const GET_BOOKS_BY_NAME = "GET_BOOKS_BY_NAME";
export const GET_BOOK_DETAILS = "GET_BOOK_DETAILS";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const GET_LANGUAGES = "GET_LANGUAGES";
export const GET_GENDERS = "GET_GENDERS";
export const GET_ALL_AUTHOR = "GET_ALL_AUTHOR";
export const GET_ALL_SAGA = "GET_ALL_SAGA";
export const GET_ALL_EDITORIAL = "GET_ALL_EDITORIAL";
export const CHANGE_PAGE="CHANGE_PAGE";
export const FILTER_BOOKS = "FILTER_BOOKS";
export const ORDER_BOOKS = "ORDER_BOOKS";
export const FILTER_PRICE = "FILTER_PRICE";
export const GET_SAGA="GET_SAGA";
export const GET_EDITORIAL="GET_EDITORIAL";
export const GET_AUTHOR="GET_AUTHOR";

const url = "https://pfback-production.up.railway.app";
const localhost = 'http://localhost:3001'

export function filterBooks(payload){
  return async function(dispatch){
    try{
      return dispatch({
        type: FILTER_BOOKS,
        payload
      })
    } catch (error) {
      console.log(error);
    }
  }
};

export function filterPrice(payload){
  return async function(dispatch){
    try{
      return dispatch({
        type: FILTER_PRICE,
        payload
      })
    } catch (error) {
      console.log(error);
    }
  }
};


export function orderBooks(payload){
  return async function(dispatch){
    try{
      return dispatch({
        type: ORDER_BOOKS,
        payload
      })
    } catch (error) {
      console.log(error);
    }
  }
};





export function getAllBooks() {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${url}/products`);
      return dispatch({
        type: GET_ALL_BOOKS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function setPage(payload){
  return async function(dispatch){
    try {
      return dispatch({
        type: CHANGE_PAGE,
        payload
      })
      
    } catch (error) {
      console.log(error);
    }
  }
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

export function getAllAuthor(){
  return async function(dispatch){
    try{
      return dispatch({
        type: GET_ALL_AUTHOR
      })
    } catch (error) {
      console.log(error);
    }
  }
}

export function getAllSaga(){
  return async function(dispatch){
    try{
      return dispatch({
        type: GET_ALL_SAGA
      })
    } catch (error) {
      console.log(error);
    }
  }
}

export function getAllEditorial(){
  return async function(dispatch){
    try{
      return dispatch({
        type: GET_ALL_EDITORIAL
      })
    } catch (error) {
      console.log(error);
    }
  }
}

export function getBooksByName(title) {
  return async function (dispatch) {
    try {
      const searchName = await axios.get(`${url}/products?search=${title}`);
      return dispatch({
        type: GET_BOOKS_BY_NAME,
        payload: searchName.data,
      });
    } catch (error) {
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

export function authorByName(name) {
  return async function (dispatch) {
    try {
      let res = await axios.get(`${url}/filters/author/${name}`);
      return dispatch({
        type: GET_AUTHOR,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function editorialByName(name) {
  return async function (dispatch) {
    try {
      let res = await axios.get(`${url}/userController/editorial/${name}`);
      return dispatch({
        type: GET_EDITORIAL,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function sagaByName(name) {
  return async function (dispatch) {
    try {
      let res = await axios.get(`${url}/filters/saga/${name}`);
      return dispatch({
        type: GET_SAGA,
        payload: res.data,
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

export function createUser(payload) {
  return async function (dispatch) {
    try {
      let post = await axios.post(`${localhost}/users`, payload);
      console.log(post.data);
    } catch (error) {
      console.log(error);
    }
  };
}

export const startUploadingFile=(file=[]) => {
return async function (dispatch) {
  const cloudUrl = "https://api.cloudinary.com/v1_1/deudiau9e/upload";
  const formData = new FormData();
  formData.append("file", file[0]);
  formData.append("upload_preset", "henrypf");

  try {
    let response = await fetch(cloudUrl, {
      method: "POST",
      body: formData
    });
    if(!response.ok)  throw new Error("can't upload image")
    let cloudResponse = await response.json();
    return dispatch({
      type: "IMAGE",
      payload:  cloudResponse.secure_url
    })
  } catch (error) {
    console.log(error);
    
  }
}
}



export function disablePost(id) {
  return async function () {
    try {
      let post = await axios.put(`${url}/products/deletelogic/${id}`);
      console.log(post.data);
    } catch (error) {
      console.log(error);
    }
  };
}

export function deletePost(id) {
  return async function () {
    try {
      let post = await axios.delete(`${url}/products/${id}`);
      console.log(post.data);
    } catch (error) {
      console.log(error);
    }
  };
}


export function disableUser(id) {
  return async function () {
    try {
      let post = await axios.put(`${url}/users/deletelogic/${id}`);
      console.log(post.data);
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteUser(id) {
  return async function () {
    try {
      let post = await axios.delete(`${url}/users/${id}`);
      console.log(post.data);
    } catch (error) {
      console.log(error);
    }
  };
}

export function modifyUser(id, payload) {
  return async function () {
    try {
      let post = await axios.put(`${url}/users/${id}`, payload);
      console.log(post.data);
    } catch (error) {
      console.log(error);
    }
  };
}


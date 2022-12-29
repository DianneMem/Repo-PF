import axios from "axios";
import jwt from "jwt-decode";

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
export const CHANGE_PAGE = "CHANGE_PAGE";
export const FILTER_BOOKS = "FILTER_BOOKS";
export const ORDER_BOOKS = "ORDER_BOOKS";
export const FILTER_PRICE = "FILTER_PRICE";
export const GET_SAGA = "GET_SAGA";
export const GET_EDITORIAL = "GET_EDITORIAL";
export const GET_AUTHOR = "GET_AUTHOR";
export const GET_USER_STRIPE = "GET_USER_STRIPE"
export const GET_TOKEN = "GET_TOKEN";
export const CLEAR_STORAGE = "CLEAR_STORAGE"
export const GET_USER_DETAIL = "GET_USER_DETAIL";
export const CLEAR_IMAGE="CLEAR_IMAGE"
export const GET_MY_PRODUCTS="GET_MY_PRODUCTS"
export const GET_MY_BOOKS="GET_MY_BOOKS"
export const DARK_MODE = "DARK_MODE";


const url = "https://pfback-production.up.railway.app";
const localhost = 'http://localhost:3001'

export function filterBooks(payload) {
  return async function (dispatch) {
    try {
      return dispatch({
        type: FILTER_BOOKS,
        payload
      })
    } catch (error) {
      console.log(error);
    }
  }
};

export function loginUser(payload) {
  if (payload) {
    return async function (dispatch) {
      try {
        let token = await axios.post(`${localhost}/local/login`, payload);
        return dispatch({
          type: GET_TOKEN,
          payload: token.data
        })
      } catch (error) {
        console.log(error.message);
      }
    };
  } else {
    return async function (dispatch) {
      await axios.get("http://localhost:3001/google/signin")
      const token = document.cookie
      console.log("aaaa", token)
      return dispatch({
        type: GET_TOKEN,
        payload: token
      })

    }
  }
}


export function filterPrice(payload) {
  return async function (dispatch) {
    try {
      return dispatch({
        type: FILTER_PRICE,
        payload
      })
    } catch (error) {
      console.log(error);
    }
  }
};


export function clearImage() {
  return async function (dispatch) {
    try {
      return dispatch({
        type: CLEAR_IMAGE
      })
    } catch (error) {
      console.log(error);
    }
  }
};


export function orderBooks(payload) {
  return async function (dispatch) {
    try {
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
      const res = await axios.get(`${localhost}/products`);
      return dispatch({
        type: GET_ALL_BOOKS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function setPage(payload) {
  return async function (dispatch) {
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
      const user = await axios.get(`${localhost}/users`);
      return dispatch({
        type: GET_ALL_USERS,
        payload: user.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getUsersDetail(id) {
  return async function (dispatch) {
    try {
      const user = await axios.get(`${localhost}/users/${id}`);
      return dispatch({
        type: GET_USER_DETAIL,
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
      const res = await axios.get(`${localhost}/categories`);
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
      const res = await axios.get(`${localhost}/languages`);
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
      const res = await axios.get(`${localhost}/genders`);
      return dispatch({
        type: GET_GENDERS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getAllAuthor() {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${localhost}/authors`);
      return dispatch({
        type: GET_ALL_AUTHOR,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getAllSaga() {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${localhost}/sagas`);
      return dispatch({
        type: GET_ALL_SAGA,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getAllEditorial() {
  return async function (dispatch) {
    try {
      const res = await axios.get(`${localhost}/editorials`);
      return dispatch({
        type: GET_ALL_EDITORIAL,
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
      const searchName = await axios.get(`${localhost}/products?search=${title}`);
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
      let detailsBook = await axios.get(`${localhost}/products/${id}`);
      return dispatch({
        type: GET_BOOK_DETAILS,
        payload: detailsBook.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function myProductDetail(id) {
  return async function (dispatch) {
    try {
      let detailsBook = await axios.get(`${localhost}/products/${id}`);
      return dispatch({
        type: GET_MY_BOOKS,
        payload: detailsBook.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function findUserStripe(username) {
  if (username) {
    return async function (dispatch) {
      try {
        let res = await axios.get(`${localhost}/api/checkout?username=${username}`);
        return dispatch({
          type: GET_USER_STRIPE,
          payload: res.data,
        });
      } catch (error) {
        console.log(error);
      }
    };
  } else {
    return async function (dispatch) {
      try {
        const userNameGoogle = jwt(document.cookie)
        const result = userNameGoogle.username
        let res = await axios.get(`${localhost}/api/checkout?username=${result}`);
        return dispatch({
          type: GET_USER_STRIPE,
          payload: res.data,
        });
      } catch (error) {
        console.log(error);
      }
    };
  }
}

export function authorByName(name) {
  return async function (dispatch) {
    try {
      let res = await axios.get(`${localhost}/filters/author/${name}`);
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
      let res = await axios.get(`${localhost}/userController/editorial/${name}`);
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
      let res = await axios.get(`${localhost}/filters/saga/${name}`);
      return dispatch({
        type: GET_SAGA,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function createPost(id, payload) {
  return async function (dispatch) {
    try {
      let post = await axios.post(`${localhost}/products/${id}`, payload);
      console.log(post.data);
    } catch (error) {
      console.log(error);
    }
  };
}



export function modificatePostInProfile(id,productId,payload) {
  return async function (dispatch) {
    try {
      let post = await axios.post(`${localhost}/products/${id}?title=${productId}`, payload);
      console.log(post.data);
    } catch (error) {
      console.log(error);
    }
  };
}


export function addStorage(id, payload) {
  return async function (dispatch) {
    try {
      let post = await axios.post(`${localhost}/users/${id}/storage`, payload);
      console.log(post);
    } catch (error) {
      console.log(error);
    }
  };
}

export function addPurchases(id, payload) {
  return async function (dispatch) {
    try {
      let post = await axios.post(`${localhost}/profile/purchases/${id}`, payload);
      console.log(post);
    } catch (error) {
      console.log(error);
    }
  };
}

export function addReview(id, payload) {
  return async function (dispatch) {
    try {
      let post = await axios.post(`${localhost}/profile/reviews/${id}`, payload);
      console.log(post);
    } catch (error) {
      console.log(error);
    }
  };
}

export function myReview(id, payload) {
  return async function (dispatch) {
    try {
      let post = await axios.post(`${localhost}/profile/myreviews/${id}`, payload);
      console.log(post);
    } catch (error) {
      console.log(error);
    }
  };
}


export function createReview(id,payload) {
  return async function (dispatch) {
    try {
      let post = await axios.post(`${localhost}/profile/reviews/${id}`, payload);
      console.log(post);
    } catch (error) {
      console.log(error);
    }
  };
}

export function addFavorites(id,payload) {
  return async function (dispatch) {
    try {
      let post = await axios.post(`${localhost}/profile/favorites/${id}`, payload);
      console.log("hola", post.data);
    } catch (error) {
      console.log(error);
    }
  };
}

export function addMyProducts(id, payload) {
  return async function (dispatch) {
    try {
      let post = await axios.post(`${localhost}/profile/myproducts/${id}`, payload);
      console.log(post);
    } catch (error) {
      console.log(error);
    }
  };
}



export function createCustomer(payload) {
  if (payload) {
    return async function (dispatch) {
      try {
        let post = await axios.post(`${localhost}/api/checkout/stripe`, payload);
        console.log(post);
      } catch (error) {
        console.log(error);
      }
    };
  } else {
    return async function (dispatch) {
      try {
        const token = jwt(document.cookie)
        const payload = {
          username: token.username,
          email: token.email
        }
        let post = await axios.post(`${localhost}/api/checkout/stripe`, payload);
        console.log("customer", post)
      } catch (error) {
        console.log(error);
      }
    }
  }
}




export const deleteStorageItemById = (id, item) => {
  return async (dispatch) => {
    try {
      const pay = await axios.put(`${localhost}/users/${id}/storage?item=${item}`)
      console.log(pay)
    } catch (e) {
      console.log(e);
    }
  };
};

export const modifyMyPosts = (id,item,payload) => {
  return async (dispatch) => {
    try {
      const pay = await axios.put(`${localhost}/profile/myproducts/${id}?item=${item}`,payload)
      console.log(pay)
    } catch (e) {
      console.log(e);
    }
  };
};


export const deleteFavoriteItemById = (id, item) => {
  return async (dispatch) => {
    try {
      const pay = await axios.put(`${localhost}/users/${id}/favorites?item=${item}`)
      console.log(pay)
    } catch (e) {
      console.log(e);
    }
  };
};

export const clearStorage = (id) => {
  return async (dispatch) => {
    try {
      const pay = await axios.get(`${localhost}/users/${id}/storage`)
      console.log(pay)
    } catch (e) {
      console.log(e);
    }
  };
};

export const clearFavorites = (id) => {
  return async (dispatch) => {
    try {
      const pay = await axios.get(`${localhost}/users/${id}/favorites`)
      console.log(pay)
    } catch (e) {
      console.log(e);
    }
  };
};

export const getMyProducts = (id) => {
  return async (dispatch) => {
    try {
      const pay = await axios.get(`${localhost}/profile/user/${id}/`)
      return dispatch({
        type: GET_MY_PRODUCTS
      })
      console.log(pay)
    } catch (e) {
      console.log(e);
    }
  };
};


export function createUser(payload) {
  return async function (dispatch) {
    try {
      let user = await axios.post(`${localhost}/local/register`, payload);
      console.log("------", user.data);
    } catch (error) {
      console.log(error);
    }
  };
}

export const startUploadingFile = (file = []) => {
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
      if (!response.ok) throw new Error("can't upload image")
      let cloudResponse = await response.json();
      return dispatch({
        type: "IMAGE",
        payload: cloudResponse.secure_url
      })
    } catch (error) {
      console.log(error);

    }
  }
}



export function disablePost(id) {
  return async function () {
    try {
      let post = await axios.put(`${localhost}/products/deletelogic/${id}`);
      console.log(post.data);
    } catch (error) {
      console.log(error);
    }
  };
}



export function deletePost(id) {
  return async function () {
    try {
      let post = await axios.delete(`${localhost}/products/${id}`);
      console.log(post.data);
    } catch (error) {
      console.log(error);
    }
  };
}


export function disableUser(id) {
  return async function () {
    try {
      let post = await axios.put(`${localhost}/users/deletelogic/${id}`);
      console.log(post.data);
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteUser(id) {
  return async function () {
    try {
      let post = await axios.delete(`${localhost}/users/${id}`);
      console.log(post.data);
    } catch (error) {
      console.log(error);
    }
  };
}

export function modifyUser(id, payload) {
  return async function () {
    try {
      let post = await axios.put(`${localhost}/users/${id}`, payload);
      console.log(post.data);
    } catch (error) {
      console.log(error);
    }
  };
}

export function modifyPost(id, payload) {
  return async function () {
    try {
      let post = await axios.put(`${localhost}/products/${id}`, payload);
      console.log(post.data);
    } catch (error) {
      console.log(error);
    }
  };
}

export function recoverPassword(payload) {
  return async function () {
    try {
      let user = await axios.post(`${localhost}/local/recover-password`, payload);
    } catch (error) {
      console.log(error);
    }
  };
}

export function darkMode() {
  return {
    type: DARK_MODE,

  }
}

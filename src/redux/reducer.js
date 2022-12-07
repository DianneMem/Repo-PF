import { GET_ALL_BOOKS, GET_ALL_USERS, GET_BOOKS_BY_NAME, GET_BOOK_DETAILS } from "./actions";


const initialState = {
  users: [],
  allbooks: [],
  books: [],
  detailsBook:{}
};

const rootReducer = (state = initialState, {
  type, payload }) => {

  switch (type) {
    case GET_ALL_BOOKS:
    return {
      ...state,
      books: payload,
      allbooks: payload
    }

    case GET_ALL_USERS:
    return {
      ...state,
      users: payload
    }
    
    case GET_BOOKS_BY_NAME:
    return {
      ...state,
      books: payload
    }
    
    case GET_BOOK_DETAILS:
    return{
    ...state,
    detailsBook: payload
    }
    
    default: return(state); 
  }
};
export default rootReducer;

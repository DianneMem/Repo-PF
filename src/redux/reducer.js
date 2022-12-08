
import {
  CHANGE_PAGE,
  GET_ALL_BOOKS,
  GET_ALL_USERS,
  GET_BOOKS_BY_NAME,
  GET_BOOK_DETAILS,
  GET_CATEGORIES,
  GET_GENDERS,
  GET_LANGUAGES,
} from "./actions";

const initialState = {
  users: [],
  allbooks: [],
  books: [],
  detailsBook: {},
  categories: [],
  languages: [],
  genders: [],
  currentPage:1
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_BOOKS:
      return {
        ...state,
        books: payload,
        allbooks: payload,
      };
    case GET_GENDERS:
      return {
        ...state,
        genders: payload,
      };
    case GET_CATEGORIES:
      return {
        ...state,
        categories: payload,
      };
    case GET_LANGUAGES:
      return {
        ...state,
        languages: payload,
      };
    case GET_ALL_USERS:
      return {
        ...state,
        users: payload,
      };

    case GET_BOOKS_BY_NAME:
      return {
        ...state,
        books: payload,
      };

    case GET_BOOK_DETAILS:
      return {
        ...state,
        detailsBook: payload,
      };
      case CHANGE_PAGE:
        return{
          ...state,
          currentPage:payload
        }

    default:
      return state;
  }
};
export default rootReducer;

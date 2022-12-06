

const initialState = {
  users: [],
  books: [],

};

const rootReducer = (state = initialState, {
  type, payload }) => {

  switch (type) {
    case 'GET_ALL_BOOKS':
      return {
        ...state,
        books: payload
      }

    case 'GET_ALL_USERS':
      return {
        ...state,
        users: payload

      }
    case 'GET_BOOKS_BY_NAME':
      return {
        ...state,
        books: payload
      }
case 'GET_BOOK_DETAILS':
  return{
    ...state,
    detailsBook: payload
  }
  case 'POST_BOOK':
    return {
      ...state,

    }
  }
}
export default rootReducer;

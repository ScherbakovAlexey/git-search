export default (state = [], action) => {
    switch (action.type) {
        case 'FETCH_ITEMS_SUCCESS':
        return action.payload
      default:
        return state
    }
  }
  
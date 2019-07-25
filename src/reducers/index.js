export default (state = {items: [], loading: false, error: false}, action) => {
    switch (action.type) {
        case 'FETCH_ITEMS_SUCCESS':
        return {
            items: action.payload,
            loading: false,
            error: false
        }
        case 'FETCH_ITEMS_ERROR':
        return {
            items: [],
            loading: false,
            error: true
        }
        case 'FETCHING':
        return {
            items: [],
            loading: true,
            error: false
        }
        default:
        return state
    }
  }
  
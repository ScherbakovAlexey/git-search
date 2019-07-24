import {debounce} from 'lodash';

export const asyncGetItems = (value) => dispatch => {
    searchDebounce(value, dispatch);
}

const searchDebounce = debounce((query, dispatch) => {
    let list = [];
    if (query) fetch('https://api.github.com/search/repositories?q=' + query)
    .then((res)=>{
      res.json()
        .then(response => {
          //console.log(response.items);
          if (response.items) {
            if (response.items.length){
              list = response.items.map((item) => {
                return ({
                   'name': item.name,
                   'html_url': item.html_url,
                   'stargazers_count': item.stargazers_count,
                   'watchers_count': item.watchers_count
                })
              });
            } else {
              list[0] = {'name': 'Not found'};
            }
          } else if (response.message) {
            list[0] = {'name': response.message};
          }
        dispatch({type: 'FETCH_ITEMS_SUCCESS', payload: list});
        })
    })
    .catch(()=>{
      list[0] = {'name': 'Something went wrong'};
      dispatch({type: 'FETCH_ITEMS_SUCCESS', payload: list});
    })
  }, 1000);
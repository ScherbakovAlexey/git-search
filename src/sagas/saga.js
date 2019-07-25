import { delay } from 'redux-saga/effects';
import { takeLatest, put, all } from 'redux-saga/effects';

function getResults(response){
    let list = [];
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
      return list;
}

function* getItemsAsync(action){
    try {
        yield delay(1000);
        yield put({ type: 'FETCHING' });
        const res = yield fetch('https://api.github.com/search/repositories?q=' + action.payload);
        const response = yield res.json();
        const items = yield getResults(response); 
        yield put({ type: 'FETCH_ITEMS_SUCCESS', payload: items });
    } catch (err) {
        yield put ({ type: 'FETCH_ITEMS_ERROR' });
    }
}

function* watchGetItems(){
    yield takeLatest('GET_ITEMS', getItemsAsync);
}

export default function* rootSaga(){
    yield all([
        watchGetItems()
    ]);
}
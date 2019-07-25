import React, {Component} from 'react';
import './App.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';

interface Item {
  name: string,
  html_url: string,
  stargazers_count: number,
  watchers_count: number,
}

interface AppProps {
  items: Item[],
  loading: boolean,
  onGetItems(e: React.ChangeEvent<HTMLInputElement>) : void,
  error: boolean
}

interface AppState {
  items: Item[],
  loading: boolean,
  error: boolean
}

class App extends Component<AppProps> {

  render (){
    console.log('test items: ', this.props.items);
    console.log('test loading: ', this.props.loading);
    const listItems = this.props.items.map((item: Item, index: number) => {
      if (item.html_url){
        return (
          <li className="search__form__item"key={index}>
            <div className="search__form__item__link"><a href={item.html_url}>{item.name}</a></div>
            <div>
              <span className="search__form__item__icon"><FontAwesomeIcon icon={faEye} /> Watch {item.watchers_count}</span>
              <span className="search__form__item__icon"><FontAwesomeIcon icon={faStar} /> Star {item.stargazers_count}</span>
            </div>
          </li>
        )
      } else {
        return (
          <li className="search__form__item-error"key={index}>
            {item.name}
          </li>
        )
      }
    });

    return (
      <div className="search__form">
        <input className="search__form__input" onChange={this.props.onGetItems} type="text" placeholder="Search a project ..."/>
        {this.props.loading ? <p>Loading...</p> : 
        this.props.error ? <p className='error'>Error. Something went wrong</p> : 
        <ul className="search__form__list">{listItems}</ul>}
      </div>
    );

  }

}

export default connect(
  (state: AppState) => ({
    items: state.items,
    loading: state.loading,
    error: state.error
  }),
  dispatch => ({
    onGetItems:  (e: React.ChangeEvent<HTMLInputElement>): void => {
      let value = e.target.value.trim();
      if (value.length > 2) dispatch({type: 'GET_ITEMS', payload: value});
    }
  })
)(App);

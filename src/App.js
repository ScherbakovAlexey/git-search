import React, {Component} from 'react';
import './App.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';

class App extends Component {
  constructor(props){
      super(props)
      this.state = {
      }
  }

  render (){
    console.log('test: ', this.props.items);
    console.log('test loading: ', this.props.loading);
    const listItems = this.props.items.map((item,index) => {
      if (item.html_url){
        return (
          <li className="search__form__item"key={index}>
            <a href={item.html_url}>{item.name}</a>
            <div>
              <span className="icon"><FontAwesomeIcon icon={faEye} /> Watch {item.watchers_count}</span>
              <span className="icon"><FontAwesomeIcon icon={faStar} /> Star {item.stargazers_count}</span>
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
  state => ({
    items: state.items,
    loading: state.loading,
    error: state.error
  }),
  dispatch => ({
    onGetItems:  (e) => {
      let value = e.target.value.trim();
      if (value.length > 2) dispatch({type: 'GET_ITEMS', payload: value});
    }
  })
)(App);

import React, {Component} from 'react';
import './App.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';
import { asyncGetItems } from './actions/search';

class App extends Component {
  constructor(props){
      super(props)
      this.state = {
      }
  }

  render (){
    console.log('test: ', this.props.items);
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
        <ul className="search__form__list">{listItems}</ul>
      </div>
    );

  }
}

export default connect(
  state => ({
    items: state
  }),
  dispatch => ({
    onGetItems:  (e) => {
      let value = e.target.value;
      console.log('value: ', value);
      if (value.length > 2) dispatch(asyncGetItems(value));
    }
  })
)(App);

import React, {Component} from 'react';
import './App.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import {debounce} from 'lodash';


class App extends Component {
  constructor(props){
      super(props)
      this.state = {
          list: []
      }
      this.handleSearch = this.handleSearch.bind(this);
  }

  searchDebounce = debounce(query => {
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
          //console.log(list);
          this.setState({
            list: list
          });
        })
    })
    .catch((err)=>{
      list[0] = {'name': 'Something went wrong ', err};
      this.setState({
        list: list
      });
    })
  }, 1000);

  handleSearch(e){
    const value = e.target.value.trim();
    this.searchDebounce(value);
  }

  render (){
    const listItems = this.state.list.map((item,index) => {
      if (item.html_url){
        return (
          <li className="search__form__item"key={index}>
            <a href={item.html_url}>{item.name}</a>
            <span className="icon"><FontAwesomeIcon icon={faEye} /> Watch {item.watchers_count}</span>
            <span className="icon"><FontAwesomeIcon icon={faStar} /> Star {item.stargazers_count}</span>
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
        <input className="search__form__input" onChange={this.handleSearch} type="text" placeholder="Search a project ..."/>
        <ul className="search__form__list">{listItems}</ul>
      </div>
    );

  }
}

export default App;

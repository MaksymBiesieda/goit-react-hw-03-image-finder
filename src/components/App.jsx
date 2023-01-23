import React, { Component } from "react";
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import css from './App.module.css';

export default class App extends Component  {

  state = {
   search: '',
  }

  onSubmit = (search) => {
    this.setState({ search });
  }
  
  render() {
    const { search } = this.state;
    return(
    <div className={css.App}>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery search={search.toLowerCase()} />
    </div> 
    )
  };
};
import React, { Component } from "react";
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Modal from "./Modal";
import css from './App.module.css';

export default class App extends Component  {

  state = {
   search: '',
  }

  componentDidMount() {
   
  }

  componentDidUpdate(prevProps, prevState) {
    
  }

  onSubmit = (search) => {
    this.setState({ search });
  }
  
  render() {
    return(
    <div className={css.App}>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery search={this.state.search.toLowerCase()} />
    </div> 
    )
  };
};
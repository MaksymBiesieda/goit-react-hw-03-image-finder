import PropTypes from 'prop-types';
import React, { Component } from "react";
import { FaSistrix } from 'react-icons/fa';
import css from './Searchbar.module.css';

export default class Searchbar extends Component {

    static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    }
    
      state = {
  search: '',
    }

    handleChange = (event) => {
this.setState({search: event.currentTarget.value})
    }

    handleSubmit = (event) => {
        const { search } = this.state;
        event.preventDefault();
        if (search.trim() === "") {
            alert('Enter your search, please!');
            return;
        }
        this.props.onSubmit(search);
        this.reset();
    }
     
    reset = () => {
        this.setState({ search: '' });
    }
    
    render() {
return ( <header className={css.Searchbar}>
               <form className={css.SearchForm} onSubmit={this.handleSubmit}>
        <button type="submit" className={css.SearchForm_button}>
                  <FaSistrix />
                  <span className={css.SearchForm_button_label}>Search</span>
                  </button>

                  <input
                    className={css.SearchForm_input}
                    type="text"
                    autoComplete="off"
                    value={this.state.search}
                    autoFocus
                    placeholder="Search images and photos"
                    onChange={this.handleChange}
                  />
               </form>
             </header>
)
    }
    
}



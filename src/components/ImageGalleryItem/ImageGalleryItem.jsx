import React, { Component } from "react";
import PropTypes from 'prop-types';
import Modal from '../Modal';
import css from './ImageGalleryItem.module.css';

export default class ImageGalleryItem extends Component { 

     static propTypes = {
         webformatURL: PropTypes.string.isRequired,
         largeImageURL: PropTypes.string.isRequired,
         tags: PropTypes.string.isRequired,
    }
     state = {
       showingModal: false,  
    }

    toggleModal = (event) => {
       
          this.setState(({showingModal}) => ({ showingModal: !this.state.showingModal }));  
        
    }

    render() {
        const { webformatURL, largeImageURL, tags } = this.props;
        return (<>
            <li className={css.ImageGalleryItem}>
            <img src={webformatURL} className={css.ImageGalleryItem_image} alt={tags} onClick={this.toggleModal} />
            </li>
            {this.state.showingModal && <Modal onClose={this.toggleModal} image={largeImageURL} tags={tags} />}
            </>
        )
    }

} 
       




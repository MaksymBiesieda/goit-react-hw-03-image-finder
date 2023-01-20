import PropTypes from 'prop-types';
import React, { Component } from "react";
import ImageGalleryItem from '../ImageGalleryItem';
import Loader from "../Loader";
import Button from "../Button";
import css from './ImageGallery.module.css';

export default class ImageGallery extends Component {

    static propTypes = {
    search: PropTypes.string,
    }
    
      state = {
          pictures: [],
          loading: false,
          page: 1,
          error: null,
    }

    componentDidUpdate(prevProps, prevState) {
     
        const pixabayKey = '30568782-28bd13ed320ba8406bed27cec';
      
        if (prevProps.search !== this.props.search) {
            this.setState({ loading: true, pictures: null, page: 1 });
            
        fetch(`https://pixabay.com/api/?q=${this.props.search}&page=1&key=${pixabayKey}&image_type=photo&orientation=horizontal&per_page=12`)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                    return Promise.reject(
                     new Error(`Nothing've been found for ${this.props.search}`)
                    );
            })
            .then(pictures => this.setState(prevState => ({ pictures: [...prevState.pictures, ...pictures.hits] })))
            .catch(error => this.setState({error}))
            .finally(this.setState({loading: false}))   
        } 
    }

    nextPage = () => {
        this.setState(prevState => ({ page: prevState.page + 1 }));
    }
 
    render() {

        const { pictures, loading, error } = this.state;  
        return (<ul className={css.ImageGallery}>
            {error && <h1>{error.message}</h1>}
            {loading && <Loader/>}
            {pictures.length !== 0 && pictures.map(picture => <ImageGalleryItem key={picture.id} id={picture.id} webformatURL={picture.webformatURL} largeImageURL={picture.largeImageURL} />)}
            {pictures.length > 11 && <Button onClick={this.nextPage} />}
            </ul>
)
    }
    
}
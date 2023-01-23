import PropTypes from 'prop-types';
import React, { Component } from "react";
import ImageGalleryItem from '../ImageGalleryItem';
import Loader from "../Loader";
import Button from "../Button";
import css from './ImageGallery.module.css';

export default class ImageGallery extends Component {

    static propTypes = {
    search: PropTypes.string.isRequired,
    }
    
      state = {
          pictures: [],
          loading: false,
          page: 1,
          error: null,
          showButton: false,
    }

    componentDidUpdate(prevProps, prevState) {
     
        const pixabayKey = '30568782-28bd13ed320ba8406bed27cec';
        const { search } = this.props;
        const { page } = this.state;
      
        if (prevProps.search !== search) {
            this.setState({ loading: true, pictures: [], page: 1, showButton: true });
            
            fetch(`https://pixabay.com/api/?q=${search}&page=${page}&key=${pixabayKey}&image_type=photo&orientation=horizontal&per_page=12`)
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
        if (prevState.page !== page) {
            this.setState({ loading: true, });

            fetch(`https://pixabay.com/api/?q=${search}&page=${page}&key=${pixabayKey}&image_type=photo&orientation=horizontal&per_page=12`)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    }
                    return Promise.reject(
                        new Error(`Nothing've been found for ${this.props.search}`)
                    );
                })
                .then(pictures => {
                    this.setState(prevState => ({ pictures: [...prevState.pictures, ...pictures.hits] }));
                    if(pictures.hits.length < 12) {this.setState({showButton: false})}
                } 
                )
            .catch(error => this.setState({error}))
            .finally(this.setState({loading: false}))   
        }
    }

    nextPage = () => {
        this.setState(prevState => ({ page: prevState.page + 1 }));
    }
 
    render() {

        const { pictures, loading, error, showButton } = this.state;  
        return (<>
            {error && <h1>{error.message}</h1>}
            <ul className={css.ImageGallery}>
            {pictures.length !== 0 && pictures.map(picture => <ImageGalleryItem key={picture.id} id={picture.id} webformatURL={picture.webformatURL} largeImageURL={picture.largeImageURL} tags={picture.tags} />)} 
            </ul>
            {loading && <Loader/>}
            {showButton && <Button onClick={this.nextPage} />}
            </>
)
    }
    
}
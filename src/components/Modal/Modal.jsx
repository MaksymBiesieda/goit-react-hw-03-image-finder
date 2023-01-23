import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import React, { Component } from "react";
import css from './Modal.module.css';

const modalRoot = document.querySelector("#modal-root");

export default class Modal extends Component {
    static propTypes = {
    onClose: PropTypes.func.isRequired,
    image: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    }

    componentDidMount() {
        window.addEventListener('keydown', this.keyDown)
    }

    componentWillUnmount() {
    window.removeEventListener('keydown', this.keyDown);
  }

    keyDown = (event) => {
        if (event.code === 'Escape') {
            this.props.onClose();
        }
    }

    onBackdrop = (event) => {
        if (event.currentTarget === event.target) {
           this.props.onClose(); 
        }
    }


    render() {
        const { image, tags } = this.props;
 return (createPortal(<div className={css.Overlay} onClick={this.onBackdrop}>
  <div className={css.Modal}>
    <img src={image} alt={tags} />
  </div>
</div>, modalRoot) )
    }
   
    
}

import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import './Modal.scss';
import IconButton from '../IconButton';
import { ReactComponent as CloseIcon } from '../../close.svg';

const modalRoot = document.querySelector('#modal-root');

// переиспользуемая модалка, как children любой контент передаем
export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  // закрытие по клику эскпейпа
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  //   закрытие по клику в бэкдроп
  handelBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    // "портал" для модалки (убирает костыль с z-index и оверфлоу)
    return createPortal(
      <div className="Modal__backdrop" onClick={this.handelBackdropClick}>
        <div className="Modal__content">
          <IconButton
            className="Modal__close IconButton"
            aria-label="Close Modal icon"
            onClick={this.props.onClose}
          >
            <CloseIcon width="32" height="32" fill="#black" />
          </IconButton>
          {this.props.children}
        </div>
      </div>,
      modalRoot,
    );
  }
}

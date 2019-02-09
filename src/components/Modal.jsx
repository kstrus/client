import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Modal extends React.Component {
    render() {
        return ReactDOM.createPortal(
            <div onClick={this.props.onDismiss} className="ui dimmer modals visible active">
                <div onClick={(e) => e.stopPropagation()} className="ui standard modal visible active">
                    <div className="header">{this.props.title}</div>
                    <div className="content">{this.props.content}</div>
                    <div className="actions">
                        {this.props.actions}
                    </div>
                </div>
            </div>,
            document.getElementById('modal')
        );
    }
}

Modal.propTypes = {
    title: PropTypes.string,
    content: PropTypes.string,
    actions: PropTypes.object,
    onDismiss: PropTypes.func
};

export default Modal;

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import history from '../../history';
import Modal from '../Modal';
import { fetchStream, deleteStream } from '../../actions';

class StreamDelete extends React.Component {
    onDismiss = () => history.push('/');

    renderActions = () => {
        return (
            <React.Fragment>
                <button className="ui negative button"
                        onClick={() => this.props.deleteStream(this.props.match.params.id)}>Delete
                </button>
                <button className="ui button" onClick={this.onDismiss}>Cancel</button>
            </React.Fragment>
        )
    };

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    render() {
        return (
            <Modal
                title="Delete stream"
                content={`Are you sure you want to delete stream: ${this.props.stream ? this.props.stream.title : null}?`}
                actions={this.renderActions()}
                onDismiss={this.onDismiss}
            />
        );
    }
}

StreamDelete.propTypes = {
    stream: PropTypes.object,
    fetchStream: PropTypes.func,
    deleteStream: PropTypes.func
};

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    }
};

export default connect(mapStateToProps, {
    fetchStream: fetchStream,
    deleteStream: deleteStream
})(StreamDelete);

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import StreamForm from './StreamForm';
import { createStream } from '../../actions/';

class StreamCreate extends React.Component {
    render() {
        return (
            <div>
                <h2>Add new stream</h2>
                <StreamForm onSubmit={this.props.createStream} />
            </div>
        );
    }
}

StreamCreate.propTypes = {
    createStream: PropTypes.func
};

export default connect(null, {
    createStream
})(StreamCreate);

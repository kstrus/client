import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StreamForm from './StreamForm';
import { fetchStream, editStream } from '../../actions';

class StreamEdit extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit = formData => {
        this.props.editStream(this.props.stream.id, formData);
    };

    render() {
        return (
            <div>
                <h2>Edit stream</h2>
                <StreamForm
                    onSubmit={this.onSubmit}
                    initialValues={_.pick(this.props.stream, 'title', 'description')}
                />
            </div>
        );
    }
}

StreamEdit.propTypes = {
    match: PropTypes.object,
    stream: PropTypes.object,
    fetchStream: PropTypes.func,
    editStream: PropTypes.func
};

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    };
};

export default connect(mapStateToProps, {
    fetchStream: fetchStream,
    editStream: editStream
})(StreamEdit);

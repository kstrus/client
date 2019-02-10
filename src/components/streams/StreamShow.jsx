import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchStream } from '../../actions';

class StreamShow extends React.Component {
    renderStreamDetails = () => {
        if (this.props.stream) {
            return (
                <React.Fragment>
                    <h3>{this.props.stream.title}</h3>
                    <p>{this.props.stream.description}</p>
                </React.Fragment>
            )
        }

        return null;
    };

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    render() {
        const { stream } = this.props;

        if (!stream) {
            return <div>Loading...</div>
        }

        return (
            <div>
                <h3>{stream.title}</h3>
                <p>{stream.description}</p>
            </div>
        )
    }
}

StreamShow.propTypes = {
    fetchStream: PropTypes.func,
    match: PropTypes.object,
    stream: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    };
};

export default connect(mapStateToProps, {
    fetchStream: fetchStream
})(StreamShow);

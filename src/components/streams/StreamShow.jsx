import React from 'react';
import flv from 'flv.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchStream } from '../../actions';

class StreamShow extends React.Component {
    constructor(props) {
        super(props);

        this.videoRef = React.createRef();
    }

    buildPlayer() {
        if (!this.player && this.props.stream) {
            this.player = flv.createPlayer({
                type: 'flv',
                url: `http://localhost:8000/live/${this.props.stream.id}.flv`
            });
            this.player.attachMediaElement(this.videoRef.current);
            this.player.load();
        }
    }

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
        this.buildPlayer();
    }

    componentDidUpdate() {
        this.buildPlayer();
    }

    componentWillUnmount() {
        this.player.destroy();
    }

    render() {
        const { stream } = this.props;

        if (!stream) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <video ref={this.videoRef} style={{ width: '100%' }} controls />
                <h3>{stream.title}</h3>
                <p>{stream.description}</p>
            </div>
        );
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

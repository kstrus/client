import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchStreams } from '../../actions';

class StreamList extends React.Component {
    componentDidMount() {
        this.props.fetchStreams();
    }

    renderList() {
        return this.props.streams.map(stream => {
            return (
                <div className="item" key={stream.id}>
                    <i className="large middle aligned icon camera"/>
                    <div className="content">
                        <div className="header">{stream.title}</div>
                        <div className="description">{stream.description}</div>
                    </div>
                </div>
            );
        });
    }

    render() {
        return (
            <div>
                <h2>Streams</h2>
                <div className="ui celled list">{this.renderList()}</div>
            </div>
        );
    }
}

StreamList.propTypes = {
    streams: PropTypes.array,
    fetchStreams: PropTypes.func
};

const mapStateToProps = state => {
    return { streams: Object.values(state.streams) };
};

export default connect(mapStateToProps, {
    fetchStreams: fetchStreams
})(StreamList);

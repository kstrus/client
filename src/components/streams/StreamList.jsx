import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchStreams } from '../../actions';

class StreamList extends React.Component {
    componentDidMount() {
        this.props.fetchStreams();
    }

    renderEditDeleteButtons(stream) {
        if (this.props.currentUserId === stream.userId) {
            return (
                <div className="right floated content">
                    <Link to={`/streams/edit/${stream.id}`} className="ui basic grey tiny button">Edit</Link>
                    <Link to={`/streams/delete/${stream.id}`} className="ui basic negative tiny button">Delete</Link>
                </div>
            );
        }

        return null;
    }

    renderCreateButton() {
        return this.props.isSignedIn
            ? <Link to="/streams/new" className="ui primary button">Add stream</Link> : null;
    }

    renderList() {
        return this.props.streams.map(stream => {
            return (
                <div className="item" key={stream.id}>
                    {this.renderEditDeleteButtons(stream)}
                    <i className="large middle aligned icon camera"/>
                    <div className="content">
                        <Link to={`/streams/${stream.id}`} className="header">{stream.title}</Link>
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
                {this.renderCreateButton()}
            </div>
        );
    }
}

StreamList.propTypes = {
    streams: PropTypes.array,
    currentUserId: PropTypes.string,
    isSignedIn: PropTypes.bool,
    fetchStreams: PropTypes.func
};

const mapStateToProps = state => {
    return {
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    };
};

export default connect(mapStateToProps, {
    fetchStreams: fetchStreams
})(StreamList);

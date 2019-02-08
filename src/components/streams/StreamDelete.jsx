import React from 'react';
import Modal from '../Modal';

class StreamDelete extends React.Component {
    actions = (
        <div>
            <button className="ui negative button">Delete</button>
            <button className="ui button">Cancel</button>
        </div>
    );

    render() {
        return (
            <div>
                StreamDelete
                <Modal
                    title="Delete stream"
                    content="Are you sure you want to delete this stream?"
                    actions={this.actions}
                />
            </div>
        );
    }
}

export default StreamDelete;

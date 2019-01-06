import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '1067087147531-tnhoncr2bv3rs6gpj4d377jf32sm06l9.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = (isSignedIn) => {
        isSignedIn ? this.props.signIn(this.auth.currentUser.get().getId()) : this.props.signOut();
    };

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        }

        if (this.props.isSignedIn) {
            return (
                <button className="ui green google button" onClick={this.onSignOutClick}>
                    <i className="google icon" />
                    Sign out
                </button>
            );
        }

        return (
            <button className="ui green google button" onClick={this.onSignInClick}>
                <i className="google icon" />
                Sign in with Google
            </button>
        );
    }

    render() {
        return (
            <div className="item">{this.renderAuthButton()}</div>
        );
    }
}

GoogleAuth.propTypes = {
    isSignedIn: PropTypes.bool,
    signIn: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired
};


const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn
    };
};

export default connect(mapStateToProps, {
    signIn: signIn,
    signOut: signOut
})(GoogleAuth);

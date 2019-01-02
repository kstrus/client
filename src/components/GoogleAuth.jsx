import React from 'react';

class GoogleAuth extends React.Component {
    state = {
        isSignedIn: null
    };

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '1067087147531-tnhoncr2bv3rs6gpj4d377jf32sm06l9.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setState({ isSignedIn: this.auth.isSignedIn.get()});
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = () => {
        this.setState({ isSignedIn: this.auth.isSignedIn.get()});
    };

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        if (this.state.isSignedIn === null) {
            return null;
        }

        if (this.state.isSignedIn) {
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

export default GoogleAuth;

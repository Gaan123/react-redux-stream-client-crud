import React, {Component} from 'react';
import { connect } from 'react-redux';
import {signIn,signOut} from '../actions';

class GoogleAuth extends Component {

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '811183870747-gcvhh92uob6g83hncr22l3m4r9d808p9.apps.googleusercontent.com',
                scope: 'email'
            })
                .then(() => {
                    this.auth = window.gapi.auth2.getAuthInstance();
                    this.onAuthChange(this.auth.isSignedIn.get());
                    this.auth.isSignedIn.listen(this.onAuthChange);
                })

        });
    }
    onAuthChange=(isSignedIn)=>{
        if (isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId());
        }else {
            this.props.signOut();
        }
    };
    onSignIn=()=>{
        this.auth.signIn()
    };
    onSignOut=()=>{
        this.auth.signOut()
    };
    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn===true) {
            return (
                <button className="ui blue google button" onClick={this.onSignOut}>
                    <i className="google icon"></i>
                    Signout
                </button>
            )
        } else {
            return (
                <button className="ui red google button" onClick={this.onSignIn}>
                    <i className="google icon"></i>
                    Signin
                </button>
            )
        }
    }

    render() {
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        );
    }
}
const mapStateToProps=state=>{
    return{
        isSignedIn:state.auth.isSignedIn
    }
};
export default connect(mapStateToProps,{signIn,signOut})(GoogleAuth);
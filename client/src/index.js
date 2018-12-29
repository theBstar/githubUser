import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { connect, Provider } from 'react-redux';
import { store, search } from './reduxStore/store.js';
import NavBar from './components/navBar/navBar.js';
import AuthForm from './components/authForm/authForm.js';
import UserCardContainer from './containers/userCardContainer/userContainer.js';
import './index.css';

fetch('/hi')
    .then(() => {
        console.log('wow')
    })
    .catch(() => {
        console.log('error');
    })


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: {
                isAuthenticated: true,
                authToken: 'lksjfdkj3e4df'
            },
        };
        this.handleLogout = this.handleLogout.bind(this);
    }


    handleLogout() {
        console.log('logging out user')
        this.setState({
            auth: {
                isAuthenticated: false,
                authToken: null,
            }
        })
    }


    render() {
        console.log('props from app', this.props)
        console.log('state from app', this.state)
        return (
            <React.Fragment>
                <NavBar
                    auth={ this.state.auth }
                    logoutHandler={ this.handleLogout }
                    searchUser={ this.props.searchUser }
                />
                {
                    (
                        this.state.auth &&
                        this.state.auth.isAuthenticated &&
                        this.state.auth.authToken
                    ) ? (
                            <UserCardContainer result={ this.props.result } />
                    ) : (
                        <AuthForm auth={{
                            text: 'Sign in',
                            bottomText: 'Sign up'
                        }} />
                    )
                }

            </React.Fragment>
        )
    }
}


function mapStateToProps(state) {
    return ({
        result: state
    });
}

function mapDispatchToProps(dispatch) {
    return ({
        searchUser: (query) => {
            dispatch(search(query))
        }
    })
}

const AppWrapper = connect(mapStateToProps, mapDispatchToProps)(App);



const UserSearchApp = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppWrapper />
            </Provider>
        </BrowserRouter>
    )
}
ReactDOM.render(<UserSearchApp />, document.getElementById('root'));

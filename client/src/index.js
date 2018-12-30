import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter, Route, Switch as SwitchRoute, Redirect } from 'react-router-dom';
import { connect, Provider } from 'react-redux';
import { store, search } from './reduxStore/store.js';
import NavBar from './components/navBar/navBar.js';
import AuthForm from './components/authForm/authForm.js';
import UserCardContainer from './containers/userCardContainer/userContainer.js';
import './index.css';
const axios = require('axios');

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: {
                isAuthenticated: false,
            },
            route: 'signin',
        };
        this.handleLogout = this.handleLogout.bind(this);
        // this.renderSignUp = this.renderSignUp.bind(this);
        // this.renderSignIn = this.renderSignIn.bind(this);
        // this.renderHome = this.renderHome.bind(this);
        this.signup = this.signup.bind(this);
        this.signin = this.signin.bind(this);
        this.bottomLinkOnClick = this.bottomLinkOnClick.bind(this);
    }


    handleLogout() {
        console.log('logging out user')
        this.setState({
            auth: {
                isAuthenticated: false,
            }
        })
    }

    signup(e) {
        e.preventDefault();
        console.log(e.target.email.value);

        axios.post('/api/signup', {
            email: e.target.email.value,
            password: e.target.password.value,
          })
          .then((response)=> {
            console.log(response);
            if (response.data && response.data.success) {
                this.setState({
                    auth: {
                        isAuthenticated: true,
                    }
                })
            } else {
                this.setState({
                    auth: {
                        isAuthenticated: false,
                    }
                })
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    signin(e) {
        e.preventDefault();
        console.log(e.target.email.value);

        axios.post('/api/signin', {
            email: e.target.email.value,
            password: e.target.password.value,
          })
          .then((response)=> {
            console.log(response);
            if (response.data && response.data.success) {
                this.setState({
                    auth: {
                        isAuthenticated: true,
                    }
                })
            } else {
                this.setState({
                    auth: {
                        isAuthenticated: false,
                    }
                })
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    bottomLinkOnClick() {
        console.log('bottomLink clicked')
        if (this.state.route === 'signin') {
            this.setState({
                route: 'singup'
            })
        } else {
            this.setState({
                route: 'signin'
            })
        }
    }

    // renderSignIn() {
    //     console.log('rendering signin')
    //     return (
    //         <React.Fragment>
    //             {
    //                 (
    //                     this.state.auth &&
    //                     this.state.auth.isAuthenticated
    //                 ) ? (
    //                         <Redirect to='/' />
    //                 ) : (
    //                     <AuthForm 
    //                         auth={{
    //                             text: 'Sign in',
    //                             bottomText: "Don't have an account? Sign up",
    //                             bottomLink: '/signup'
    //                         }}
    //                         onSubmit = {this.signin}
    //                     />
    //                 )
    //             }
    //         </React.Fragment>
    //     )
    // }

    // renderSignUp() {
    //     console.log('rendering signup')
    //     return (
    //         <div>
    //             {
    //                 (
    //                     this.state.auth &&
    //                     this.state.auth.isAuthenticated
    //                 ) ? (
    //                         <Redirect to='/' />
    //                 ) : (
    //                     <AuthForm 
    //                         auth={{
    //                             text: 'Sign up',
    //                             bottomText: 'Already have an account? Sign in',
    //                             bottomLink: '/signin'
    //                         }}
    //                         onSubmit = {this.signup}
    //                     />
    //                 )
    //             }
    //         </div>
    //     )
    // }

    // renderHome() {
    //     console.log('rendering home')
    //     return (
    //         <div>
    //             {
    //                 (
    //                     this.state.auth &&
    //                     this.state.auth.isAuthenticated
    //                 ) ? (
    //                         <UserCardContainer result={ this.props.result } />
    //                 ) : (
    //                     <Redirect to="/signin"/>
    //                 )
    //             }
    //         </div>
    //     )
    // }

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
                {/* <SwitchRoute>
                    <Route exact path='/signin' render={this.renderSignIn}/>
                    <Route exact path='/signup' render={this.renderSignUp}/>
                    <Route path='/' render={this.renderHome}/>
                </SwitchRoute> */}
                {
                    (
                        this.state.auth &&
                        this.state.auth.isAuthenticated
                    ) ? (
                            <UserCardContainer result={ this.props.result } />
                    ) : (
                        (this.state.route === 'signin') ? (
                            <AuthForm 
                                auth={{
                                    text: 'Sign in',
                                    bottomText: "Don't have an account? Sign up",
                                }}
                                onSubmit = {this.signin}
                                bottomLinkOnClick={this.bottomLinkOnClick}
                            />  
                        ) : (
                            <AuthForm 
                                auth={{
                                    text: 'Sign up',
                                    bottomText: 'Already have an account? Sign in',
                                }}
                                onSubmit = {this.signup}
                                bottomLinkOnClick={this.bottomLinkOnClick}
                        />
                        )
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
// const RoutableApp = ()=> {
//     return (
//         <BrowserRouter>
//             <App/>
//         </BrowserRouter>
//     )
// }
const AppWrapper = connect(mapStateToProps, mapDispatchToProps)(App);



const UserSearchApp = () => {
    return (
        <Provider store={store}>
            <AppWrapper />
        </Provider>
    )
}
ReactDOM.render(<UserSearchApp />, document.getElementById('root'));

import React, { Component } from 'react'
import { ACCESS_TOKEN, ERROR, REFRESH_TOKEN } from '../../../constants'
import { Redirect, withRouter } from 'react-router-dom'

class OAuth2RedirectHandler extends Component {

    getUrlParameter(name) {
        name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]')
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)')
        const results = regex.exec(this.props.location.search)
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '))
    };

    render() {
        // const token = this.getUrlParameter(TOKEN)
        const accessToken = this.getUrlParameter(ACCESS_TOKEN)
        const refreshToken = this.getUrlParameter(REFRESH_TOKEN)

        const error = this.getUrlParameter(ERROR)
        if (accessToken && refreshToken) {
            return this.setTokenAndRedirect(accessToken, refreshToken)
        } else {
            return this.redirectToLogin(error)
        }
    }

    redirectToLogin(error) { return <Redirect to={{
        pathname: '/',
        state: {
            from: this.props.location,
            error: error
        }
    }}/>};

    // setTokenAndRedirect = token => {
    //     localStorage.setItem(ACCESS_TOKEN, token)
    //
    //     this.props.onLogin()
    //     return <Redirect to={{
    //         pathname: '/sensors',
    //         state: {from: this.props.location}
    //     }}/>
    // }

    setTokenAndRedirect(accessToken, refreshToken){
        localStorage.setItem(ACCESS_TOKEN, accessToken);
        localStorage.setItem(REFRESH_TOKEN, refreshToken);

        this.props.onLogin();
        return <Redirect to={{
            pathname: '/sensors',
            state: {from: this.props.location}
        }}/>
    };

}

export default withRouter(OAuth2RedirectHandler)

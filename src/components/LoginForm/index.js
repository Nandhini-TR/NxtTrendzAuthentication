import {Component} from 'react'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', isErrorOccured: false, errorMsg: ''}

  onError = () => {
    const {errorMsg} = this.state
    return <p className="error-msg">{`*${errorMsg}`}</p>
  }

  onSuccess = () => {
    const {history} = this.props
    this.setState({isErrorOccured: false})
    history.replace('/')
  }

  onSubmitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    console.log(data)

    if (response.ok === true) {
      this.onSuccess()
    } else {
      this.setState({isErrorOccured: true})
      console.log(data.error_msg)
      this.setState({errorMsg: data.error_msg})
    }
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderPassword = () => {
    const {password} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="username-input"
          placeholder="Password"
          value={password}
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  renderUserName = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input"
          placeholder="Username"
          value={username}
          onChange={this.onChangeUserName}
        />
      </>
    )
  }

  render() {
    const {isErrorOccured} = this.state
    return (
      <div className="app-bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          alt="website login"
          className="website-login"
        />
        <form className="form-container" onSubmit={this.onSubmitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <div className="input-container">{this.renderUserName()}</div>
          <div className="input-container">{this.renderPassword()}</div>
          <button className="login" type="submit">
            Login
          </button>
          {isErrorOccured ? <div>{this.onError()}</div> : ''}
        </form>
      </div>
    )
  }
}

export default LoginForm

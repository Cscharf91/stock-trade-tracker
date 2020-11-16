import React from "react"
import PropTypes from "prop-types"
import logo from './logo.png'

class Header extends React.Component {
  render () {
    return (
      <div className="header-wrapper">
        <img className="logo" src={logo} alt={"logo"}/>
        <p class="subheader">How are your stocks doing?</p>
      </div>
    );
  }
}

export default Header

import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../actions";
import NavBar from './NavBar';
import RegisterParticipant from './RegisterParticipant';
import ImageUpload from './ImageUpload';
// import AboutUs from './AboutUs';

class Home extends Component {
  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  };
  render() {
    const { isLoggingOut, logoutError } = this.props;
    return (
      <div>
        <NavBar/>
        <br/>
        <RegisterParticipant/>
        <br/>
        {/* <AboutUs/> */}
        <br/>
        <ImageUpload/>
        <br/>
        {/* <Participant/> */}
        <br/>
        <div className='container'>
          <button onClick={this.handleLogout}>Logout</button>
        </div>
        {isLoggingOut && <p>Logging Out....</p>}
        {logoutError && <p>Error logging out</p>}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError
  };
}
export default connect(mapStateToProps)(Home);
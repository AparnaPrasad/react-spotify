import React, { Component } from 'react';
import {setTokens, loadUserDetails, getTopTracks} from '../actions/index';
import {connect} from 'react-redux';
import UserDetails from './UserDetails';
import DisplayTopTracks from './DisplayTopTracks';

class App extends Component {
   
  constructor(props){
    super(props);
    const params = this.getHashParams();
    const token = params.access_token;
    //const refresh_token = params.refresh_token;

    if(token){
      //console.log('token:', token);
      this.props.setTokens(params);
      this.props.loadUserDetails(token);
      this.props.getTopTracks(token);
    }
    //console.log(params);
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }
  render() {
    const {tokens} = this.props;
    const{access_token} = tokens;

    if(access_token)
    {
      return (
        <div>
          <UserDetails/>
          <DisplayTopTracks/>
        </div>
        );
    }
    else {
     return( <div>
        Please login to <a href="http://localhost:8888/">http://localhost:8888</a>
     </div>)
    }
  }
    
}

function mapStateToProps({tokens, userInfo}) {
  return {
    tokens: tokens,
    userInfo: userInfo,
  }

}
function mapDispatchToProps(dispatch) {
  console.log('in map dispatch')
  return {
    loadUserDetails: (obj) =>  dispatch(loadUserDetails(obj)),
    setTokens: (obj) => dispatch(setTokens(obj)),
    getTopTracks: (token) => dispatch(getTopTracks(token))
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);



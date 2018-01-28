import React, { Component } from 'react';
import {setTokens} from '../actions/index';
import {connect} from 'react-redux';

class App extends Component {
   
  constructor(){
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    
    this.setToken('x');
    if(token){
      console.log('token:', token);
      this.setToken(token);
      this.fetchUserDetails(token);
    }
    console.log(params);
  }

  setToken(token) {
    console.log('setting token...', this.props, token);
    if(this.props) {
      this.props.setTokens(token);
    }
    //const {setTokens} = this.props;
    //this.props.setTokens(token);
  }

  fetchUserDetails(token){
    //GET https://api.spotify.com/v1/me Authorization:access_token
    console.log('token:', token);
    fetch("https://api.spotify.com/v1/me", {method: "GET", headers: {'Authorization': 'Bearer '+token}})
      .then((resp) => {
        resp.json().then((data) => {
          console.log('got user data?', data);
            //this.props.loadCategories(data);
        })
      })
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
    return (
      <div className="App">
        <a href='http://localhost:8888' > Login to Spotify </a>
      </div>
    );
  }
}

function mapStateToProps({token}) {
  return {
    token: token,
  }

}
function mapDispatchToProps(dispatch) {
  console.log('in map dispatch')
  return {
    //load_posts: (obj) =>  dispatch(fetchPosts(obj)),
    setTokens: (obj) => dispatch(setTokens(obj))
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

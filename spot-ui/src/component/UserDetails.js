import React, { Component } from 'react';
import {connect} from 'react-redux';

class UserDetails extends Component {
	  render() {
	  	const {userInfo} = this.props;
	  	const {userDetails} = userInfo;

	  	console.log("user info!!!");
	  	if(userDetails && userDetails.loading){
	  		return <div>Loading....</div>
	  	}
	  	else {
		  	if(userDetails){
		  		return (<div>
			  		<h1>User Details</h1>
			  			<div className="userInfoContainer">
					  		<div>
					  			<h3 className="userInfoLabels">Name:</h3>
					  			{userDetails.display_name && <span className="userInfoContent">  {userDetails.display_name} </span>}

					  		</div>
					  		<div>
					  			<h3 className="userInfoLabels">Country:</h3>
					  			{userDetails.country && <span className="userInfoContent">  {userDetails.country} </span>}
					  		</div>
					  		<div>
					  			<h3 className="userInfoLabels">Email:</h3>
					  			{userDetails.email && <span className="userInfoContent">  {userDetails.email} </span>}
					  		</div>
							<div>
					  			<h3 className="userInfoLabels">Followers:</h3>
					  			{userDetails.followers && <span className="userInfoContent">  {userDetails.followers.total} </span>}
					  		</div>
				  		</div>
			  		</div>
			  	);
		  	}
		  	else {
		  		return(<div>Sorry, user details unavailable</div>)
		  	}
	  	}
	  	

	  }
}

function mapStateToProps({userInfo, tokens}) {
  return {
    userInfo: userInfo,
    tokens: tokens
  }

}
function mapDispatchToProps(dispatch) {
  console.log('in map dispatch')
  return {
  
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);


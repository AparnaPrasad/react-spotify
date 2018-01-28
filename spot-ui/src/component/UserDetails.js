import React, { Component } from 'react';
import {connect} from 'react-redux';
import AccountBox from 'react-icons/lib/md/account-box';
import NameIcon from 'react-icons/lib/md/child-care';
import Globe from 'react-icons/lib/fa/globe';
import Mail from 'react-icons/lib/md/mail';
import Followers from 'react-icons/lib/fa/group';
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
			  		<h1 className="userDetailHeader">User Details</h1>
			  		<div>
			  			<span className="accountBoxContainer">
			  					<AccountBox size='200'/>
			  				</span>
			  			<span className="userInfoContainer">
			  				
					  		<div className="userInfo">
					  			<h3 className="userInfoLabels">
					  				<NameIcon/> Name:
					  			</h3>
					  			{userDetails.display_name && <span className="userInfoContent">  {userDetails.display_name} </span>}

					  		</div>
					  		<div className="userInfo">
					  			<h3 className="userInfoLabels"><Globe/> Country:</h3>
					  			{userDetails.country && <span className="userInfoContent">  {userDetails.country} </span>}
					  		</div>
					  		<div className="userInfo">
					  			<h3 className="userInfoLabels"><Mail/> Email:</h3>
					  			{userDetails.email && <span className="userInfoContent">  {userDetails.email} </span>}
					  		</div>
							<div className="userInfo">
					  			<h3 className="userInfoLabels"><Followers/> Followers:</h3>
					  			{userDetails.followers && <span className="userInfoContent">  {userDetails.followers.total} </span>}
					  		</div>
				  		</span>
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


import React, { Component } from 'react';
import {connect} from 'react-redux';
import Modal from 'react-modal';
import {getRecommendations} from '../actions/index';
import RecommendationsDisplay from './RecommendationsDisplay'; 
import CloseButton from 'react-icons/lib/fa/close'

class DisplayTopTracks extends Component {
	
	state= {
		enableRecomendationButton: false,
		isShowRecommendationsViewOpen: false
	}

	componentWillMount(){
		this.selectedCheckboxes = new Set();
	}

	closeRecommendationsViewModal() {
    	this.setState(() => ({ isShowRecommendationsViewOpen: false }))
	}

	trackClicked(ev, id, name){
		if(this.selectedCheckboxes.has(id)){
			this.selectedCheckboxes.delete(id);
			document.getElementById(id).checked=false;
		}
		else {
			this.selectedCheckboxes.add(id);
			document.getElementById(id).checked=true;
			//this.textInput.checked=true;
			
		}
		this.selectedCheckboxes.size>0? 
			this.setState({enableRecomendationButton:true}):
				this.setState({enableRecomendationButton:false});
		}

	getRecommendation() {
		//console.log("At get recommendation!");
		let trackSeeds=[];
		let artistsSeeds=[];

		const {userTopTracks} = this.props;
		const {trackIds, tracksById} = userTopTracks;

		for (const trackId of this.selectedCheckboxes) {
      		console.log('track names:', tracksById[trackId].name)
      		if(trackSeeds.length + artistsSeeds.length == 5) break;

      		if(trackSeeds.indexOf(trackId)<0) {
      			trackSeeds.push(trackId);
      		}
      		const artistList = tracksById[trackId].artists;
      		for(const artist of artistList) {
      			if(artistsSeeds.indexOf(artist.id)<0) {
      				artistsSeeds.push(artist.id);
      			}
      		}
    	}

		this.props.getRecommendations(this.props.tokens.access_token, artistsSeeds.join(','), trackSeeds.join(','));
		this.setState({
			isShowRecommendationsViewOpen: true
		})

	}

	cropName(name, chars){
		console.log('name', name.length);
		if(name.length>chars){
			return name.substring(0, chars).concat('...');
		}
		return name;
	}
	
	render() {
		const {userTopTracks} = this.props;
		const {trackIds, tracksById} = userTopTracks;
		const {isShowRecommendationsViewOpen} = this.state;

		if(userTopTracks.loading){
		  	return <div>Loading....</div>
		}
	  	
	  	else {
		  	if(trackIds && tracksById){
		  		return (
		  			<div>
			  			<h3 className="recommendationHeader">Select Items to get recommendation</h3>{this.state.enableRecomendationButton}
			  			<button onClick={()=>{this.getRecommendation()}} className={this.state.enableRecomendationButton?'enableRecomendationButton mediumButton':'disableRecomendationButton mediumButton'}>Get Recommendations</button>
			  			<div className="grid-container">
			  				{trackIds.map((x)=>
				  					<div key={x} className="grid-item" onClick={(e)=>this.trackClicked(e, x, tracksById[x].name)}>
					  					<h3>{this.cropName(tracksById[x].name, 30)}</h3>
					  					<div><img className="albumImage" src={tracksById[x].album.images[2].url} alt='../../public/favicon.ico'/></div>
					  					<div>Album:{this.cropName(tracksById[x].album.name, 35)} </div>
					  					<div>Artist: {tracksById[x].artists.map((art)=> <span key={art.id}>{art.name},</span>)}</div>
				  						<input id={x} type="checkbox" />
				  					</div>
			  					)
			  				}
			  			</div>
			  			<Modal
		        		className='modal'
		        		overlayClassName='overlay modalSizeBig'
		        		isOpen={isShowRecommendationsViewOpen}
		        		onRequestClose={()=>this.closeRecommendationsViewModal()}
		        		contentLabel='Modal'
		        		ariaHideApp={false}>
		        		<button className="closeButton" onClick={()=>this.closeRecommendationsViewModal()}>
 								<CloseButton size={30}/>
        				</button>
		        		<h3 className="headerRecos">Recommendation List based on seeds</h3>
		        		
          					{isShowRecommendationsViewOpen && <RecommendationsDisplay />}
        				</Modal>
			  			</div>
			  	);
		  	}
		  	else {
		  		return(<div>Sorry, user tracks unavailable</div>)
		  	}
	  	}
	}
}

function mapStateToProps({userTopTracks, tokens}) {
  return {
    userTopTracks: userTopTracks,
    tokens: tokens
  }

}
function mapDispatchToProps(dispatch) {
  return {
  	getRecommendations: (token, artistSeeds, trackSeeds) =>  dispatch(getRecommendations(token, artistSeeds, trackSeeds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayTopTracks);


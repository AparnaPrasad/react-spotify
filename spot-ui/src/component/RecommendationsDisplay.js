import React, { Component } from 'react';
import {connect} from 'react-redux';
import Loading from 'react-loading'

class RecommendationsDisplay extends Component {
	  render() {
	  		console.log("recommendations display:", this.props.recommendations);
	  		const {recommendations} = this.props;
	  		const {loading, recommendedTracks} = recommendations;
			if(loading) 
				return( <div className='loaderSpinner'>
					<Loading delay={200} type='spin' color='#222' />
					</div>);
			else{
				return (recommendedTracks && recommendedTracks.tracks)? 
				(<div className="listHolder">
					
					<ul className="ulClassRecos">
					{recommendedTracks.tracks.map((track, i)=>
							<li key={i} className="trackList">{track.name} by {track.artists.map((a)=>a.name)}</li>
						)}
					</ul>
				</div>): 
				(<div>Sorry, no reccomendation available for you</div>)
			}		
			
	  }
}

function mapStateToProps({recommendations}) {
  return {
    recommendations: recommendations
  }

}
function mapDispatchToProps(dispatch) {
  console.log('in map dispatch')
  return {
  
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecommendationsDisplay);


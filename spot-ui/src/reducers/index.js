//reducer
import {SET_TOKENS, SPOTIFY_MY_TOP_TRACKS_BEGIN,
SPOTIFY_MY_TOP_TRACKS_SUCCESS, SPOTIFY_MY_TOP_TRACKS_FAILURE,
USER_DETAILS_SUCCESS, USER_DETAILS_FAILURE, USER_DETAILS_BEGIN, 
RECOMMENDATION_SUCCESS, RECOMMENDATION_FAILURE, RECOMMENDATION_BEGIN} from '../actions'
import { combineReducers } from 'redux';

function tokens(state = {}, action){
	const {tokens} = action;
	switch(action.type) {
		case SET_TOKENS: 
			return tokens;
		default:
			return state;
	}
}

function userInfo(state = {}, action) {
	
	switch(action.type) {
		case USER_DETAILS_SUCCESS:
			console.log("user info success!!", action);
			const {data} = action; 
			return {
				userDetails:data,
				loading: false
		}
		case USER_DETAILS_FAILURE:
			const {error} = action;
			return {
				userDetails: error,
				loading: false
		}
		case USER_DETAILS_BEGIN:
			//const {error} = action;
			return {
				userDetails: {},
				loading: true
		}
		default:
			return state;
	}
}

function userTopTracks(state={}, action) {
	switch(action.type) {
		case SPOTIFY_MY_TOP_TRACKS_FAILURE:
			const {error} = action;
			return {
				tracks: error,
				loading: false
		}
		case SPOTIFY_MY_TOP_TRACKS_SUCCESS:
			const {tracks} = action;
			console.log("top tracks data:", tracks);


			const tracksById = {};
            const ids = tracks.map((t)=>{
                tracksById[t.id] = t;
                return t.id
            })
            return {
            		tracksById: tracksById,
                    trackIds: ids,
                	loading: false
                };
			
		case SPOTIFY_MY_TOP_TRACKS_BEGIN:
			//const {error} = action;
			return {
				tracks: {},
				loading: true
		}
		default:
			return state;
	}
}
function recommendations(state={}, action) {
	switch(action.type) {
		case RECOMMENDATION_SUCCESS:
			console.log('recommendations success', action)
			const {recommendedTracks} = action;
			return {
				recommendedTracks,
				loading: false
			};
		case RECOMMENDATION_FAILURE:
			const {error} = action;
			return {
				error,
				loading: false
			}
		case RECOMMENDATION_BEGIN:
			return {
				tracks:{},
				loading: true

			}

		default:
			return state;
	}
}
export default combineReducers({
	tokens,
	userInfo,
	userTopTracks,
	recommendations
});

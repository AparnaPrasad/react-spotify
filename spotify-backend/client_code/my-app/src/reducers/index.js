//reducer
import {SET_TOKENS} from '../actions'
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

export default combineReducers({
	tokens
});
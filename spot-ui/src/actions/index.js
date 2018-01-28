export const SET_TOKENS="SET_TOKENS";
export const SPOTIFY_MY_TOP_TRACKS_BEGIN = "SPOTIFY_MY_TOP_TRACKS_BEGIN";
export const SPOTIFY_MY_TOP_TRACKS_SUCCESS = "SPOTIFY_MY_TOP_TRACKS_SUCCESS";
export const SPOTIFY_MY_TOP_TRACKS_FAILURE = "SPOTIFY_MY_TOP_TRACKS_FAILURE";
export const USER_DETAILS_BEGIN = "USER_DETAILS_BEGIN";
export const USER_DETAILS_SUCCESS = "USER_DETAILS_SUCCESS";
export const USER_DETAILS_FAILURE = "USER_DETAILS_FAILURE";
export const RECOMMENDATION_SUCCESS = "RECOMMENDATION_SUCCESS";
export const RECOMMENDATION_FAILURE = "RECOMMENDATION_FAILURE";
export const RECOMMENDATION_BEGIN = "RECOMMENDATION_BEGIN";

function fetchUserDetails(token){

    console.log('fetch use details token:', token);
    
    return fetch("https://api.spotify.com/v1/me", {method: "GET", headers: {'Authorization': 'Bearer '+token}})
      .then((resp) => {
        return resp.json().then((data) => {
          return data;
        })
      })
}

function fetchTopTracks(token) {
    return fetch("https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE/top-tracks?country=SE", {method: "GET", headers: {'Authorization': 'Bearer '+token}})
      .then((resp) => {
        return resp.json().then((data) => {
          console.log('got top TRACKS!!!!?', data);
          if(data && data.tracks)
            return data.tracks;
          else{
            return null;
          }
        })
      })

}

function fetchRecommendations(token, artistSeeds, trackSeeds){

   return fetch("https://api.spotify.com/v1/recommendations?seed_artists="+artistSeeds+"&seed_tracks="+trackSeeds, {method: "GET", headers: {'Authorization': 'Bearer '+token}})
      .then((resp) => {
        return resp.json().then((data) => {
            return data;
        })
      })
}

export function getRecommendations(token, artistSeeds, trackSeeds) {

  return (dispatch) => {
    dispatch({ type: RECOMMENDATION_BEGIN});
    fetchRecommendations(token, artistSeeds, trackSeeds).then(data => {
      dispatch({ type: RECOMMENDATION_SUCCESS, recommendedTracks: data });
    }).catch(e => {
      dispatch({ type: RECOMMENDATION_FAILURE, error: e });
    });
  };
}

export function setTokens(tokens, fromRefreshToken=false) {

    //if no refresh token just set
    return {
        type: SET_TOKENS,
        tokens
    }
}

export function loadUserDetails(token) {

	return (dispatch, getState) => {
    console.log("getState:", getState());
    dispatch({ type: USER_DETAILS_BEGIN});
    fetchUserDetails(token, dispatch).then(data => {
      dispatch({ type: USER_DETAILS_SUCCESS, data: data });
    }).catch(e => {
      console.log("caught in err", e);
      dispatch({ type: USER_DETAILS_FAILURE, error: e });
    });
  };

}

export function getTopTracks(token) {
  return dispatch => {
    dispatch({ type: SPOTIFY_MY_TOP_TRACKS_BEGIN});
    fetchTopTracks(token).then(data => {
      dispatch({ type: SPOTIFY_MY_TOP_TRACKS_SUCCESS, tracks:data });
    }).catch(e => {
      dispatch({ type: SPOTIFY_MY_TOP_TRACKS_FAILURE, error: e });
    });
  };
}

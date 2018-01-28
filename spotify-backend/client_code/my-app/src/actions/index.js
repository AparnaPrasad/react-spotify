//actions
export const SET_TOKENS="SET_TOKENS";

export function setTokens(tokens) {
    return {
        type: SET_TOKENS,
        tokens
    }
}
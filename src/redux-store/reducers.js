

const reducer = function (state = { user: {} }, action) {
    console.log('reducer called with action = ', action);
    switch (action.type) {
        case "UPDATE_COUNT":
            //logic
            state = { ...state, count: action.payload }
            return state;//store state
        case "UPDATE_USER":
            state = { ...state, user: action.payload };
            return state;
        default:
            return state
    }
}

export default reducer;
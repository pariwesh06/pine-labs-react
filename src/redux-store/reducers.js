

const reducer = function (state = {
    count: 400,
    name: 'Pariwesh'
}, action) {
    switch (action.type) {
        case "UPDATE_COUNT":
            //logic
            state = {
                count: action.payload
            }
            return state;//store state
        default:
            break;
    }
    return state;
    console.log('reducer called with action = ', action);
}

export default reducer;
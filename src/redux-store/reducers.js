

const reducer = function (state={count:400}, action){
    console.log('reducer called with action = ', action);
    return state;
}

export default reducer;
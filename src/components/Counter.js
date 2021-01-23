import { connect } from "react-redux"

function Counter(props) {
    // state = {
    //     localCounter: 20
    // }
    return (
        <span>Counter: {props.data.count}
            {/* <div>Local counter: {this.state.localCounter}</div> */}
        </span>
    )
}

//callback function called whenever redux store state changes due to a reducer function.
const MapStateToProps = function (storeState) {
    console.log('MapStateToProps called with store state=', storeState);
    return storeState;
}

export default connect(MapStateToProps, null)(Counter); //subscribe counter component with redux store


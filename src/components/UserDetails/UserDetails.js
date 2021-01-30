import { connect } from "react-redux";

function UserDetails(props) { //Receiver
    // which user selected?
    return <span>
        First Name: {props.data.user.fname},
        Age: {props.data.user.age}
    </span>
}

//callback function called whenever redux store state changes due to a reducer function.
const MapStateToProps = function (storeState) {
    console.log('MapStateToProps called with store state=', storeState);
    return storeState;
}

export default connect(MapStateToProps, null)(UserDetails); //subscribe counter component with redux store


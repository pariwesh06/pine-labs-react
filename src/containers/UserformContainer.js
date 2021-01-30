import Counter from "../components/Counter";
import UserDetails  from "../components/UserDetails/UserDetails";
import Userform from "../components/userform/userform";


export default function UserformContainer(props){
    return (
        <span>
            <Counter ></Counter>
            <Userform></Userform>
            <UserDetails></UserDetails>
        </span>
    )
}
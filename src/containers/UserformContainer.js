import Counter from "../components/Counter";
import { Userform } from "../components/userform/userform";


export default function UserformContainer(props){
    return (
        <span>
            <Userform></Userform>
            <Counter count={this.state.users.length}></Counter>
        </span>
    )
}
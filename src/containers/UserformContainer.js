import Counter from "../components/Counter";
import { Userform } from "../components/userform/userform";


export default function UserformContainer(props){
    return (
        <span>
            <Counter ></Counter>
            <Counter ></Counter>
            <Userform></Userform>
        </span>
    )
}
import React from 'react';
import { BackendService } from '../../backend-service';
import './userform.css';
export class Userform extends React.Component {//MVC
    constructor() { //only one 
        super();
        this.state = { //model
            user: {
                fname: 'Pariwesh1',
                age: 30,
            },
            users: []
        }
        BackendService.getUsers().done((users)=>{
            this.setState({
                users: users
            })
        });
    }//ES6
    save = (event) => {
        BackendService.saveUser(this.state.user, 
            (response)=>{ //success callback functions
                this.setState({  //to rerender, call setState
                    users: [...this.state.users, response ]
                });
            }).fail((error)=>{
                alert('Somemthing went wrong, please retry..');
            });
    }
    handleEvent = (event) => {
        this.setState({  //to rerender, call setState
            user: Object.assign(this.state.user, { [event.target.name]: event.target.value })
        });
    }
    deleteUser = function(index, userid)  {
        const decision = window.confirm('Are you sure??');
        if(!decision){
            return;
        }
        const promise = BackendService.deleteUser(userid);
        promise.done((response)=>{
            this.state.users.splice(index, 1);
            this.setState({
                users: this.state.users 
            })
        });
        promise.fail((error)=> alert('Deletion failed'));
        console.log(promise);
    }
    render() {
        const userModel = this.state.user;
        return (
            <div>
                <input value={userModel.fname} name='fname' onChange={this.handleEvent} placeholder={this.props.label} style={{ background: this.props.color }} />
                <input value={userModel.age} name='age' onChange={this.handleEvent}
                    placeholder='first Name copy' style={{ background: this.props.color }} />
                <input placeholder='salary' value={userModel.salary} onChange={this.handleEvent} name='salary'></input>
                <button onClick={this.save}>Save</button>
                <table>
                    <thead >
                        <th>First Name</th>
                        <th> Age</th>
                        <th> Salary</th>
                    </thead>
                    <tbody>
                        {this.state.users.map( (user, index)=> {
                            return <tr>
                                <td>{user.fname}</td>
                                <td>{user.age}</td>
                                <td>{user.salary}</td>
                                <td><button onClick={this.deleteUser.bind(this, index, user.id)}>Delete</button></td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}
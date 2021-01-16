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
                gender: 'Male'
            },
            roles: [],
            users: [],
            sortOrder: true
        }
        BackendService.getUsers().done((users) => {
            this.setState({
                users: users
            })
        });
        BackendService.getRoles().done((roles) => {
            this.setState({
                roles: roles
            })
        });
    }//ES6
    save = (event) => {
        BackendService.saveUser(this.state.user,
            (response) => { //success callback functions
                this.setState({  //to rerender, call setState
                    users: [...this.state.users, response]
                });
            }).fail((error) => {
                alert('Somemthing went wrong, please retry..');
            });
    }
    handleEvent = (event) => {
        this.setState({  //to rerender, call setState
            user: Object.assign(this.state.user, { [event.target.name]: event.target.value })
        });
    }
    deleteUser = function (index, userid) {
        const decision = window.confirm('Are you sure??');
        if (!decision) {
            return;
        }
        const promise = BackendService.deleteUser(userid);
        promise.done((response) => {
            this.state.users.splice(index, 1);
            this.setState({
                users: this.state.users
            })
        });
        promise.fail((error) => alert('Deletion failed'));
        console.log(promise);
    }
    sortAge = (event) => {
        console.log('sorted');
        let order = this.state.sortOrder;
        order = !order;
        this.state.users.sort((user1, user2) => { //ascending
            if (order) { 
                return user1.age - user2.age; }
            else {
                return user2.age - user1.age;
            }
        });
        this.setState({
            users: this.state.users,
            sortOrder: order
        });
    }
    render() {
        const userModel = this.state.user;
        return (
            <div>
                <input value={userModel.fname} name='fname' onChange={this.handleEvent} placeholder={this.props.label} style={{ background: this.props.color }} />
                <input value={userModel.age} name='age' onChange={this.handleEvent}
                    placeholder='first Name copy' style={{ background: this.props.color }} />
                <input placeholder='salary' value={userModel.salary} onChange={this.handleEvent} name='salary'></input>
                <input type='radio' checked='true' value='Male' onChange={this.handleEvent} name='gender' />Male
                <input type='radio' value='Female' onChange={this.handleEvent} name='gender' />Female
                {this.state.roles.map((role) => <div><input type='radio' value={role} onChange={this.handleEvent} name='role'></input>{role}</div>)}
                <button onClick={this.save}>Save</button>
                <table>
                    <thead >
                        <th>First Name</th>
                        <th onClick={this.sortAge}> Age</th>
                        <th> Salary</th>
                        <th>Role</th>
                    </thead>
                    <tbody>
                        {this.state.users.map((user, index) => {
                            return <tr>
                                <td>{user.fname}</td>
                                <td>{user.age}</td>
                                <td>{user.salary}</td>
                                <td>{user.role}</td>
                                <td><button onClick={this.deleteUser.bind(this, index, user.id)}>Delete</button></td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}
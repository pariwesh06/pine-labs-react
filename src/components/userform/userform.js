import React, { useState } from 'react';
import { BackendService } from '../../backend-service';
import './userform.css';
import Counter from "../Counter";
export class Userform extends React.Component {//MVC

    constructor() { //only one 
        super();
        this.state = { //model
            user: {
                fname: 'Pariwesh1',
                age: 30,
                gender: 'Male',
                skills: []
            },
            roles: [],
            users: [],
            sortOrder: true
        }
        this.getUsers();
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
                console.log(error);
                alert('Somemthing went wrong, please retry..');
            });
    }
    handleEvent = (event) => {
        if (event.target.type == 'checkbox') {
            if (event.target.checked) {
                //add values here
                this.state.user.skills.push(event.target.value);
            } else {
                //remove basis value       
                let i = -1;
                this.state.user.skills.map((value, index) => {
                    if (value == event.target.value) {
                        i = index;
                    }
                });
                if (i > -1) {
                    this.state.user.skills.splice(i, 1);
                }
            }
            this.setState({
                user: this.state.user
            });
        }
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
    }
    sortAge = (event) => {
        console.log('sorted');
        let order = this.state.sortOrder;
        order = !order;
        this.state.users.sort((user1, user2) => { //ascending
            if (order) {
                return user1.age - user2.age;
            }
            else {
                return user2.age - user1.age;
            }
        });
        this.setState({
            users: this.state.users,
            sortOrder: order
        });
    }
    getUsers(){
        BackendService.getUsers().done((users) => {
            this.setState({
                users: users
            })
        });
    }
    filterByName = (event) => {
        if (event.target.value.length === 0) {
          this.getUsers();
        }
        if (event.target.value.length < 3) return;
        const promise = BackendService.filter(event.target.value);
        promise.done((response) => this.setState({
            users: response
        }));
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

                <label>Skills:</label> <input value='Javascript' name='skills' onChange={this.handleEvent} type="checkbox" />Javascript
                <input value='Java' name='skills' onChange={this.handleEvent} type="checkbox" />Java
                <input value='React' name='skills' onChange={this.handleEvent} type="checkbox" />React

                <button onClick={this.save}>Save</button>

                <table>
                    <thead >
                        <th>First Name<div><input onChange={this.filterByName}></input></div></th>
                        <th onClick={this.sortAge}> Age</th>
                        <th> Salary</th>
                        <th>Role</th>
                        <th>Skills</th>
                    </thead>
                    <tbody>
                        {this.state.users.map((user, index) => {
                            let skills = '';
                            if (Array.isArray(user['skills[]']))
                                skills = user['skills[]'].map(skill => skill + ' ');
                            return <tr>
                                <td>{user.fname}</td>
                                <td>{user.age}</td>
                                <td>{user.salary}</td>
                                <td>{user.role}</td>
                                <td>{skills}</td>
                                <td><button onClick={this.deleteUser.bind(this, index, user.id)}>Delete</button></td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

import React from 'react';
import { BackendService } from '../../backend-service';
import './userform.css';
import { connect } from 'react-redux';
import updateCountAction from "../../redux-store/actions";
class Userform extends React.Component {//MVC
    selectedRow=-1;
    constructor(props) { //only one 
        super(props);
        this.state = { //model
            user: {
                fname: '',
                age: 0,
                gender: 'Male',
                skills: []
            },
            roles: [],
            users: [],
            sortOrder: true
        }

    }//ES6
    save = (event) => {
        BackendService.saveUser(this.state.user,
            (response) => { //success callback functions
                this.setState({  //to rerender, call setState
                    users: [...this.state.users, response]
                });
                this.props.updateCount({ type: updateCountAction, payload: this.state.users.length });
            }).fail((error) => {
                console.log(error);
                alert('Somemthing went wrong, please retry..');
            });
    }
    handleEvent = (event) => {
        if (event.target.type === 'checkbox') {
            if (event.target.checked) {
                //add values here
                this.state.user.skills.push(event.target.value);
            } else {
                //remove basis value       
                let i = -1;
                this.state.user.skills.map((value, index) => {
                    if (value === event.target.value) {
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
        } else {
            this.setState({
                user: { ...this.state.user, [event.target.name]: event.target.value }
            })
        }
    }
    deleteUser = (index, userid, event) => {
        console.log(event.stopPropagation());
        const decision = window.confirm('Are you sure??');
        if (!decision) {
            return;
        }
        const promise = BackendService.deleteUser(userid);
        promise.done((response) => {
            this.state.users.splice(index, 1);
            this.setState({
                users: this.state.users
            });
            this.props.updateCount({ type: updateCountAction, payload: this.state.users.length });
        });
        promise.fail((error) => alert('Deletion failed'));
        if(this.selectedRow === userid){
            this.props.sendUserDetails({ type: "UPDATE_USER", payload: {} })
        }
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
    getUsers() {
        BackendService.getUsers().done((users) => {
            this.setState({
                users: users
            });
            this.props.updateCount({
                type: updateCountAction,
                payload: this.state.users.length
            });
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
    componentDidMount() {
        this.getUsers();
        BackendService.getRoles().done((roles) => {
            this.setState({
                roles: roles
            })
        });
    }
    render() {
        const userModel = this.state.user;
        return (
            <span id='userform'>
                <input value={userModel.fname} name='fname' onChange={this.handleEvent} placeholder={this.props.label} style={{ background: this.props.color }} />
                <input value={userModel.age} name='age'  type='number' min='1' max ='130' onChange={this.handleEvent}
                    placeholder='first Name copy' style={{ background: this.props.color }} />
                <input placeholder='salary' type='number' min='1' value={userModel.salary} onChange={this.handleEvent} name='salary'></input>
                <input type='radio' checked={true} value='Male' onChange={this.handleEvent} name='gender' />Male
                <input type='radio' value='Female' onChange={this.handleEvent} name='gender' />Female
                {this.state.roles.map((role) => <div key={role}><input type='radio' value={role} onChange={this.handleEvent} name='role'></input>{role}</div>)}

                <label>Skills:</label> <input value='Javascript' name='skills' onChange={this.handleEvent} type="checkbox" />Javascript
                <input value='Java' name='skills' onChange={this.handleEvent} type="checkbox" />Java
                <input value='React' name='skills' onChange={this.handleEvent} type="checkbox" />React

                <button onClick={this.save}>Save</button>

                <table>
                    <thead >
                        <tr>
                            <th>First Name<div><input onChange={this.filterByName}></input></div></th>
                            <th onClick={this.sortAge}> Age</th>
                            <th> Salary</th>
                            <th>Role</th>
                            <th>Skills</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map((user, index) => {
                            let skills = '';
                            if (Array.isArray(user['skills[]']))
                                skills = user['skills[]'].map(skill => skill + ' ');
                            return <tr key={user.id} onClick={this.updateUserDetailsToStore.bind(this, user)}>
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
            </span>
        );
    }
    updateUserDetailsToStore = function (user) {
        this.selectedRow = user.id;
        console.log('called=', user);
        this.props.sendUserDetails({ type: "UPDATE_USER", payload: user });
    }
}

const MapDispatchToProps = function (dispatch) {
    return {
        updateCount: (action) => {//logic1
            dispatch(action)
        },
        sendUserDetails: (action) => { //logic2 
            dispatch(action)
        }
    };
}
export default connect(null, MapDispatchToProps)(Userform);
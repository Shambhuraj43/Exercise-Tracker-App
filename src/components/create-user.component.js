import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {

    constructor(props) {
        super(props);

        //binding 'this' class to make sure 
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
        }
    }

    //if username changes, this function gets called to update values
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    //on Submit method
    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
        }

        console.log(user);

        //send post request with the created user
        axios.post('https://exercise-tracker-app-v0.herokuapp.com/users/add', user)
            .then(res => console.log(res.data));

        this.setState({
            username: ''
        });
    }

    //simple form for user creation
    render() {
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}

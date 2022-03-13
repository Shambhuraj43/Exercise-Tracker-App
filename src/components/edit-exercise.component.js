import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class EditExercise extends Component {

  constructor(props) {
    super(props);

    //binding 'this' class to make sure 
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      description: '',
      duration: 0,
      date: new Date(),
      users: []
    }
  }

  //react lifecycle method, gets called before the webpage loads
  componentDidMount() {

    axios.get('https://exercise-tracker-app-v0.herokuapp.com/exercises/'+ this.props.match.params.id)
    .then(response => {
        this.setState({
            username: response.data.username,
            description: response.data.description,
            duration: response.data.duration,
            date: new Date(response.data.date)
        })
    })
    .catch(function (error){
        console.log(error);
    })

    axios.get('https://exercise-tracker-app-v0.herokuapp.com/users/')
    .then(response => {
      if(response.data.length > 0){
        this.setState({
          users: response.data.map(user => user.username),
        })
      }
    })
  }


  //if username changes, this function gets called to update values
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }


  //if username changes, this function gets called to update values
  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }


  //if username changes, this function gets called to update values
  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    });
  }


  //if username changes, this function gets called to update values
  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }


  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    }

    console.log(exercise);

    //send post request with the created user
    axios.post('https://exercise-tracker-app-v0.herokuapp.com/exercises/update/' + this.props.match.params.id, exercise)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
      <div>
        <h3>Edit Exercise Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                this.state.users.map(function (user) {
                  return <option
                    key={user}
                    value={user}>{user}
                  </option>;
                })
              }
            </select>
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <label>Duration (in minutes): </label>
            <input
              type="text"
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
            />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>

          <div className="form-group">
            <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}
import React, { Component } from "react";

export default class CreateTradespeople extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      name: "",
      description: "",
      phone: "",
      date: new Date(),
      users: [],
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangePhone(e) {
    this.setState({
      phone: e.target.value,
    });
  }

  onChangeDate(e) {
    this.setState({
      date: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const tradesperson = {
      username: this.state.username,
      name: this.state.name,
      description: this.state.description,
      number: this.state.number,
      date: this.state.date,
    };

    console.log(tradesperson);

    window.location = "/";
  }

  render() {
    return (
      <div>
        <p>You're on the Create Tradespeople Component!</p>
      </div>
    );
  }
}

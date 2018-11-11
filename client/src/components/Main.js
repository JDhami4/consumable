import React, { Component } from "react";
import axios from "axios";
import classnames from "classnames";

class Main extends Component {
  constructor() {
    // Component State
    super();
    this.state = {
      url: "",
      restrictions: "",
      errors: {}
    };
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    console.log("IN");
    e.preventDefault();
    const info = {
      url: this.state.url,
      restrictions: this.state.restrictions
    };
    axios
      .post("http://localhost:5000/api/profile/info", info)
      .then(res => console.log(res.data))
      .catch(err => this.setState({ errors: err.response.data }));
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Consumable</h1>
              <p className="lead text-center">Analyze Food Label</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Image URL"
                    name="url"
                    value={this.state.url}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Dietary Restrictions"
                    name="restrictions"
                    value={this.state.restrictions}
                    onChange={this.onChange}
                  />

                  <small className="form-text text-muted">
                    Enter dietary restrictions in a comma separated list
                  </small>
                </div>

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;

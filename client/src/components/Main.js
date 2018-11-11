import React, { Component } from "react";
import axios from "axios";
var HashMap = require("hashmap");

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
  parseJ(theData) {
    let isSafe = true;
    var map = new HashMap();

    for (var i = 0; i < theData.length; i++) {
      var array = theData[i].text.split(", ");
      for (var j = 0; j < array.length; j++) {
        map.set(array[j], array[j]);
      }
    }

    var array2 = this.state.restrictions.split(",");

    for (var k = 0; k < array2.length; k++) {
      if (map.get(array2[k] != undefined)) {
        isSafe = false;
      }
    }

    console.log(map);
    console.log(array2);
    if (isSafe) {
      //   window.location.href = "http://localhost:3000/Yes";
    } else {
      //   window.location.href = "http://localhost:3000/No";
    }
    // console.log(map.get("1"));
    // var isSafe = true;
    // console.log(this.state.restrictions);
    // var array = this.state.restrictions.split(",");
    // for (var i = 0; i < theData.length; i++) {
    //   console.log(theData[i]);
    //   var array2 = theData[i].text.split(" ");
    //   for (var j = 0; j < array2.length; j++) {
    //     var first = array2[j];
    //     for (var k = 0; k < array.length; k++) {
    //       var second = array[k];
    //       if (first.localeCompare(second) == 0) {
    //         isSafe = false;
    //       }
    //     }
    //   }
    // }
    // if (isSafe) {
    //   console.log("Safe");
    // } else {
    //   console.log("Nope");
    // }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const info = {
      url: this.state.url,
      restrictions: this.state.restrictions
    };

    const info2 = {};
    axios
      .post("/api/profile/info", info)
      .then(res => {
        this.go(res.data);
      })
      .catch(err => this.setState({ errors: err.response.data }));
  };

  go(theData) {
    const o = {
      header: theData
    };
    // console.log(o);
    axios
      .post("/api/profile/info/header", o)
      .then(res => this.parseJ(res.data))
      .catch(err => this.setState({ errors: err.response.data }));
  }
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

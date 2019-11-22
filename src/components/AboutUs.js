import React, {
  Component,
  Fragment
} from "react";

import Firebase from "firebase";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      details: []
    };
  }

  componentDidMount() {
    this.getUserData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
    this.writeUserData();
    }
  }

  writeUserData = () => {
    Firebase.database()
    .ref("/")
    .set(this.state);
    console.log("DATA SAVED");
  };

  getUserData = () => {
    let ref = Firebase.database().ref("/");
    ref.on("value", snapshot => {
    const state = snapshot.val();
    this.setState(state);
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    let about = this.refs.about.value;
    let uid = this.refs.uid.value;

    if (uid && about) {
    const { details } = this.state;
    const devIndex = details.findIndex(data => {
        return data.uid === uid;
    });
    details[devIndex].about = about;
    this.setState({ details });
    } else if (about) {
    const uid = new Date().getTime().toString();
    const { details } = this.state;
    details.push({ uid, about });
    this.setState({ details });
    }

    this.refs.about.value = "";
    this.refs.uid.value = "";
  };

  removeData = developer => {
    const { details } = this.state;
    const newState = details.filter(data => {
    return data.uid !== developer.uid;
    });
    this.setState({ details: newState });
  };

  updateData = developer => {
    this.refs.uid.value = developer.uid;
    this.refs.about.value = developer.about;
  };

  render() {
    const { details } = this.state;
    return (
      <Fragment>
        <div className="container">
        <div className="row">
            <div className="col-xl-12">
            <h1>About Us</h1>
            </div>
        </div>
        <div className="row">
            <div className="col-xl-12">
                {details.map(developer => (
                <div
                    key={developer.uid}
                    className="card float-left"
                    style={{ width: "18rem", marginRight: "1rem" }}
                >
                <div className="card-body">
                    <h5 className="card-title">{developer.about}</h5>
                    <button
                    onClick={() => this.removeData(developer)}
                    className="btn btn-link"
                    >
                    Delete
                    </button>
                    <button
                    onClick={() => this.updateData(developer)}
                    className="btn btn-link"
                    >
                    Edit
                    </button>
                </div>
                </div>
                ))}
            </div>
        </div>
        <div className="row">
            <div className="col-xl-12">
            <h1>Insert information on "About Us"</h1>
              <form onSubmit={this.handleSubmit}>
                <div className="form-row">
                  <input type="hidden" ref="uid" />
                <div className="form-group col-md-6">
                  <label>About Us</label>
                  <input
                    type="message"
                    ref="about"
                    className="form-control"
                    placeholder="About Us"
                  />
                </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

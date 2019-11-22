import React, {
  Component,
  Fragment
} from "react";

import {
  Button,
  Table,
  Tabs,
  Tab,
  Container,
  Row,
  Col
} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

import Firebase from "firebase";

let database = Firebase.database();

export default class RegisterParticipant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Participants: []
    };
  }
  handleChange(event) {
    this.setState({value: event.target.value});
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
    database
      .ref("/")
      .set(this.state);
    console.log("DATA SAVED");
  };

  getUserData = () => {
    let ref = database.ref("/");
    ref.on("value", snapshot => {
      const state = snapshot.val();
      console.log(state)
      this.setState(state);
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    let name = this.refs.name.value;
    let gender = this.refs.gender.value;
    let address = this.refs.address.value;
    let email = this.refs.email.value;
    let emergency = this.refs.emergency.value;
    let phone = this.refs.phone.value;
    let pass = this.refs.pass.value;
    let uid = this.refs.uid.value;

    if (uid && name && address && phone && gender && email && emergency && pass) {
      const { Participants } = this.state;
      const devIndex = Participants.findIndex(data => {
        return data.uid === uid;
      });
      Participants[devIndex].name = name;
      Participants[devIndex].address = address;
      Participants[devIndex].phone = phone;
      Participants[devIndex].email = email;
      Participants[devIndex].gender = gender;
      Participants[devIndex].emergency = emergency;
      Participants[devIndex].pass = pass;
      this.setState({ Participants });
    } else if (name && address && phone && gender && email && emergency && pass) {
      const uid = new Date().getTime().toString();
      const { Participants } = this.state;
      Participants.push({ uid, name, address, phone, gender, email, emergency, pass});
      this.setState({ Participants });
    }

    this.refs.name.value = "";
    this.refs.address.value = "";
    this.refs.phone.value = "";
    this.refs.gender.value = '';
    this.refs.emergency.value = '';
    this.refs.email.value = '';
    this.refs.pass.value = '';
    this.refs.uid.value = "";
  };

  removeData = participant => {
    const { Participants } = this.state;
    const newState = Participants.filter(data => {
      return data.uid !== participant.uid;
    });
    this.setState({ Participants: newState });
  };

  updateData = participant => {
    this.refs.uid.value = participant.uid;
    this.refs.name.value = participant.name;
    this.refs.address.value = participant.address;
    this.refs.phone.value = participant.phone;
    this.refs.email.value = participant.email;
    this.refs.emergency.value = participant.emergency;
    this.refs.pass.value = participant.pass;
    this.refs.gender.value = participant.gender;
  };
  render() {
    const { Participants } = this.state;
    return (
      <Fragment>
        <div className='container'>
          <Tabs defaultActiveKey="view" id="uncontrolled-tab-example">
            <Tab eventKey="view" title="View">
              <br/>
              <Table responsive striped bordered hover size="sm">
                <thead display='none'>
                  <tr>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Contact</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Emergency Contact</th>
                    <th>Password</th>
                  </tr>
                </thead>
                <tbody>
                  {Participants.length > 0 ? (
                  Participants.map(participant => (
                      <tr
                      key={participant.uid}
                    >
                      <td>{participant.name}</td>
                      <td>{participant.gender}</td>
                      <td>{participant.phone}</td>
                      <td>{participant.email}</td>
                      <td xs={12}>{participant.address}</td>
                      <td>{participant.emergency}</td>
                      <td>{participant.pass}</td>
                    </tr>
                  ))) : (
                    <tr>
                      <td>No users</td>
                      <td>No data</td>
                      <td>No data</td>
                      <td>No data</td>
                      <td>No data</td>
                      <td>No data</td>
                      <td>No data</td>
                    </tr>
                  )
                }
                </tbody>
              </Table>
            </Tab>
            <Tab eventKey="Add" title="Add">
              <br/>
              <div>
                <h1>Add new participant here</h1>
                <form onSubmit={this.handleSubmit}>
                  <Container>
                    <input type="hidden" ref="uid" />
                    <Row>
                      <Col
                        xs={2}
                      >
                        Full Name
                      </Col>
                      <Col>
                        <input
                          type="text"
                          ref="name"
                          className="form-control"
                          placeholder="Full Name"
                          required
                        />
                      </Col>
                    </Row>
                    <br/>
                    <Row>
                      <Col
                        xs={2}
                      >
                        Address
                      </Col>
                      <Col>
                        <input
                          type="text"
                          ref="address"
                          className="form-control"
                          placeholder="Address"
                          required
                        />
                      </Col>
                    </Row>
                    <br/>
                    <Row>
                      <Col
                        xs={2}
                      >
                        Phone Number
                      </Col>
                      <Col>
                        <input
                          type="text"
                          ref="phone"
                          className="form-control"
                          placeholder="Phone Number"
                          required
                        />
                      </Col>
                    </Row>
                    <br/>
                    <Row>
                      <Col
                        xs={2}
                      >
                        Emergency Contact
                      </Col>
                      <Col>
                        <input
                          type="text"
                          ref="emergency"
                          className="form-control"
                          placeholder="Emergency Contact"
                          required
                        />
                      </Col>
                    </Row>
                    <br/>
                    <Row>
                      <Col
                        xs={2}
                      >
                        Email
                      </Col>
                      <Col>
                        <input
                          type="text"
                          ref="email"
                          className="form-control"
                          placeholder="email@example.com"
                          required
                        />
                      </Col>
                    </Row>
                    <br/>
                    <Row>
                      <Col
                        xs={2}
                      >
                        Gender
                      </Col>
                      <Col>
                        <input
                          type="text"
                          ref="gender"
                          className="form-control"
                          placeholder="Male/Female"
                          required
                        />
                      </Col>
                    </Row>
                    <br/>
                    <Row>
                      <Col
                        xs={2}
                      >
                        Password
                      </Col>
                      <Col>
                        <input
                          type="text"
                          ref="pass"
                          className="form-control"
                          placeholder="********"
                          required
                        />
                      </Col>
                    </Row>
                    <br/>
                    <Row>
                      <Col></Col>
                      <Col>
                        <Button 
                          type="submit"
                          variant='success' 
                          block
                        >
                          Submit
                        </Button>
                      </Col>
                      <Col></Col>
                    </Row>
                  </Container>
                </form>
              </div>
              <br/>
              <br/>
              <Table striped bordered hover size="sm">
                <thead display='none'>
                  <tr>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Contact</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Emergency Contact</th>
                    <th>Password</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Participants.length > 0 ? (
                  Participants.map(participant => (
                      <tr
                      key={participant.uid}
                    >
                      <td>{participant.name}</td>
                      <td>{participant.gender}</td>
                      <td>{participant.phone}</td>
                      <td>{participant.email}</td>
                      <td xs={12}>{participant.address}</td>
                      <td>{participant.emergency}</td>
                      <td>{participant.pass}</td>
                      <td>
                        <Button
                          onClick={() => this.updateData(participant)}
                          variant='success' 
                          block
                        >
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))) : (
                    <tr>
                      <td>No users</td>
                      <td>No data</td>
                      <td>No data</td>
                      <td>No data</td>
                      <td>No data</td>
                      <td>No data</td>
                      <td>No data</td>
                      <td>No data</td>
                    </tr>
                  )
                }
                </tbody>
              </Table>
            </Tab>  
            <Tab eventKey="delete" title="Delete">
            <br/>
              <Table striped bordered hover size="sm">
                <thead display='none'>
                  <tr>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Contact</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Emergency Contact</th>
                    <th>Password</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Participants.length > 0 ? (
                  Participants.map(participant => (
                      <tr
                      key={participant.uid}
                    >
                      <td>{participant.name}</td>
                      <td>{participant.gender}</td>
                      <td>{participant.phone}</td>
                      <td>{participant.email}</td>
                      <td xs={12}>{participant.address}</td>
                      <td>{participant.emergency}</td>
                      <td>{participant.pass}</td>
                      <td>
                        <Button
                          onClick={() => this.removeData(participant)}
                          variant='success' 
                          block
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))) : (
                    <tr>
                      <td>No users</td>
                      <td>No data</td>
                      <td>No data</td>
                      <td>No data</td>
                      <td>No data</td>
                      <td>No data</td>
                      <td>No data</td>
                      <td>No data</td>
                    </tr>
                  )
                }
                </tbody>
              </Table>
            </Tab>
          </Tabs>
        </div>
      </Fragment>
    );
  }
}

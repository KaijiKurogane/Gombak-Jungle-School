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
    Col,
    Accordion,
    Card
  } from 'react-bootstrap';
  
  import 'bootstrap/dist/css/bootstrap.min.css';
  
  import Firebase from "firebase";
  
  let database = Firebase.database();
  
  export default class RegisterStaff extends Component {
    constructor(props) {
      super(props);
      this.state = {
        Staff: []
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
  
    handleSubmitTrainer = event => {
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
        const { Trainer } = this.state;
        const devIndex = Trainer.findIndex(data => {
          return data.uid === uid;
        });
        Trainer[devIndex].name = name;
        Trainer[devIndex].address = address;
        Trainer[devIndex].phone = phone;
        Trainer[devIndex].email = email;
        Trainer[devIndex].gender = gender;
        Trainer[devIndex].emergency = emergency;
        Trainer[devIndex].pass = pass;
        this.setState({ Trainer });
      } else if (name && address && phone && gender && email && emergency && pass) {
        const uid = new Date().getTime().toString();
        const { Trainer } = this.state;
        Trainer.push({ uid, name, address, phone, gender, email, emergency, pass});
        this.setState({ Trainer });
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
  
    removeDataTrainer = trainer => {
      const { Trainer } = this.state;
      const newState = Trainer.filter(data => {
        return data.uid !== trainer.uid;
      });
      this.setState({ Trainer: newState });
    };
  
    updateDataTrainer = trainer => {
      this.refs.uid.value = trainer.uid;
      this.refs.name.value = trainer.name;
      this.refs.address.value = trainer.address;
      this.refs.phone.value = trainer.phone;
      this.refs.email.value = trainer.email;
      this.refs.emergency.value = trainer.emergency;
      this.refs.pass.value = trainer.pass;
      this.refs.gender.value = trainer.gender;
    };
    handleSubmitCrafter = event => {
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
        const { Crafter } = this.state;
        const devIndex = Crafter.findIndex(data => {
          return data.uid === uid;
        });
        Crafter[devIndex].name = name;
        Crafter[devIndex].address = address;
        Crafter[devIndex].phone = phone;
        Crafter[devIndex].email = email;
        Crafter[devIndex].gender = gender;
        Crafter[devIndex].emergency = emergency;
        Crafter[devIndex].pass = pass;
        this.setState({ Participants });
      } else if (name && address && phone && gender && email && emergency && pass) {
        const uid = new Date().getTime().toString();
        const { Crafter } = this.state;
        Crafter.push({ uid, name, address, phone, gender, email, emergency, pass});
        this.setState({ Crafter });
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
    
    removeDataCrafter = crafter => {
      const { Crafter } = this.state;
      const newState = Crafter.filter(data => {
        return data.uid !== crafter.uid;
      });
      this.setState({ Crafter: newState });
    };

    updateDataCrafter = crafter => {
      this.refs.uid.value = crafter.uid;
      this.refs.name.value = crafter.name;
      this.refs.address.value = crafter.address;
      this.refs.phone.value = crafter.phone;
      this.refs.email.value = crafter.email;
      this.refs.emergency.value = crafter.emergency;
      this.refs.pass.value = crafter.pass;
      this.refs.gender.value = crafter.gender;
    };
    render() {
      const { Crafter } = this.state;
      const { Trainer } = this.state;
      return (
        <Fragment>
          <Accordion defaultActiveKey="0">
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0"></Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body></Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="1"></Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="1">
                <Card.Body></Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
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
  
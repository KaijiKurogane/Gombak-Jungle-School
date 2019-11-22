import React from 'react';

import {
  Button,
  Navbar,
  Nav,
  Form,
  FormControl
} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

function NavBar () {
  return(
    <div>
      <Navbar
        bg="dark"
        variant="dark"
      >
        <Navbar.Brand href="#home">
          Jungle School Gombak
        </Navbar.Brand>
        <Nav 
          className="mr-auto"
        >
          <Nav.Link 
            href="#home"
          >
            Home
          </Nav.Link>
          <Nav.Link 
            href="#features"
          >
            Features
          </Nav.Link>
          <Nav.Link 
            href="#pricing"
          >
            Pricing
          </Nav.Link>
        </Nav>
        <Form inline>
          <FormControl
            type="text" 
            placeholder="Search" 
            className="mr-sm-2" 
          />
          <Button 
            variant="outline-info"
          >
            Search
          </Button>
        </Form>
      </Navbar>
    </div>
  );
}

export default NavBar;
import React from 'react';
import './App.css';
import Contacts from './features/contacts/Contacts.js';
import AddContact from './features/contacts/AddContact.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'

import 'bootstrap/dist/css/bootstrap.min.css';


class App extends React.Component {
  
  render() {
    return (
      <Container fluid="sm">
        <Row className="justify-content-sm-center">
          <Col >
            <AddContact />
          </Col>
        </Row>
        <Row className="justify-content-sm-center">
          <Col>
            <Contacts />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;

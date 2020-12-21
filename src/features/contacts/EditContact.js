import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

import {
  edit,
  contactsList,
} from './contactSlice';

 function EditContact(props) {
  const dispatch = useDispatch();
  const contactSelector = useSelector(contactsList);

  // State of the selected contact that we want to edit
  const [state, setState] = useState({ currentItem: contactSelector[props.contact.id] });
  const [postcodeList, setPostcodeList] = useState([]);
  const [applied, setApplied] = useState(false);

  let postcodeNode;

  // Changes the form state on input 
  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      currentItem: {
        ...state.currentItem,
        [e.target.name] : value,
      }
    })

    if (e.target.name === 'postcode' && value.length >= 6) {
      setApplied(false);
      let url = `https://api.getAddress.io/autocomplete/${value}?api-key=41bLQnQ_HEiE5cBI2ZSJng29594`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          // Catching the list of suggestions
          let payload = data
          if (data.hasOwnProperty('length')) {
            payload = data;
          } else {
            payload = data.suggestions
          }
          setPostcodeList(payload);
        })
        .catch(function(error) {
          // catching the error
          console.error(error);
        });
    }
  }

  // Saves a contact to the store
  const handleSave = (e) => {
    // Saves / Edits a record on the store by the Edit reducer
    dispatch(edit(state.currentItem));

    // Inherted close handler to close the Modal, from Contacts.js
    props.handleClose();
  }

  // Applies an address to the contact form
  const onApplyAddress = (e, address) => {
    // Maps the state to the input address from the API call after selection
    let addressDetails = address.trim().split(',');
    state.currentItem['addr_line_1'] = addressDetails[0];
    state.currentItem['city'] = addressDetails[1];
    state.currentItem['country'] = addressDetails[2];

    // Updates the state reactively
    setState({
      currentItem: {
        ...state.currentItem
      }
    });

    // Updates the flag for the autocomplete reactively
    setApplied(true);
  }

  // Updates the autocomplete reactively
  if (!applied) {
    postcodeNode = <div className="autocomplete-holder" name="postcode" onSelect={handleChange}>
        {postcodeList.map((item, key) => {
          return (
            <div key={key}><input type="button" onClick={(e) => { onApplyAddress(e, item.address) }} className="autocomplete-button" value={item.address} /></div>
          )
        })}
    </div>
  } else {
    // If an autocomplete element was selected, then remove the autocomplete results
    postcodeNode = undefined;
  }

  return (
    <div>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
        <Modal.Title>
          Edit Contact
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form">
            <Form>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label htmlFor="contact_name">
                    Name </Form.Label>
                    <Form.Control value={state.currentItem.contact_name} type="text" placeholder="Contact Name" name="contact_name" onChange={handleChange} required />
                </Form.Group>
                <Form.Group as={Col}>
                <Form.Label htmlFor="email">
                  Email </Form.Label>
                  <Form.Control value={state.currentItem.email} type="email" placeholder="Email" name="email" onChange={handleChange} required />
                </ Form.Group>
                <Form.Group as={Col}>
                  <Form.Label htmlFor="telephone">
                    Telephone </Form.Label>
                    <Form.Control value={state.currentItem.telephone} type="tel" placeholder="Telephone" name="telephone" onChange={handleChange} required />
                </ Form.Group>
              </Form.Row>
              
              <Form.Group>
              <Form.Label htmlFor="addr_line_1">
                Addres Line 1 </Form.Label>
                <Form.Control value={state.currentItem.addr_line_1} type="text" placeholder="Address Line One" name="addr_line_1" onChange={handleChange} required />
              </ Form.Group>
              <Form.Group>
                <Form.Label htmlFor="addr_line_2">
                  Addres Line 2 </ Form.Label>
                  <Form.Control value={state.currentItem.addr_line_2} type="text" placeholder="Address Line Two" name="addr_line_2" onChange={handleChange} />
              </ Form.Group>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label htmlFor="city">
                    City/Town </Form.Label>
                    <Form.Control value={state.currentItem.city} type="text" placeholder="City/Town" name="city" onChange={handleChange} required />
                </ Form.Group>
                <Form.Group as={Col}>
                  <Form.Label htmlFor="county">
                    County </Form.Label>
                    <Form.Control value={state.currentItem.county} type="text" placeholder="County" name="county" onChange={handleChange} />
                </ Form.Group>
                <Form.Group as={Col}>
                  <Form.Label htmlFor="postcode">
                    Postcode </Form.Label>
                    <Form.Control value={state.currentItem.postcode} type="text" placeholder="PostCode" name="postcode" onChange={handleChange} required />
                    { postcodeNode }
                </ Form.Group>
              </Form.Row>
            </Form>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSave} variant="outline-success">Save</Button>
          <Button onClick={props.handleClose} variant="outline-danger">Cancel</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditContact;
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

import './Contacts.css';

import {
  add,
} from './contactSlice';

 // Component reponsible for adding Contacts
 function AddContact() {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    currentItem: {}
  });
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

    if (e.target.name === 'postcode' && value.length >= 5) {
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

  // Submits the current contact to the store
  const onSubmit = (e) => {
    e.preventDefault();
    // Dispatches a reducer "add" to add a contact to the store
    dispatch(add(state));

    // Clear the form
    e.target.reset();

    // Clear the state reactively
    setState({
      currentItem: {}
    });
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

  return(
    <div className="form">
      <Form className="d-flex flex-column" onSubmit={onSubmit}>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label htmlFor="contact_name">
              Name </Form.Label>
              <Form.Control type="text" placeholder="Contact Name" name="contact_name" onChange={handleChange} required />
          </Form.Group>
          <Form.Group as={Col}>
          <Form.Label htmlFor="email">
            Email </Form.Label>
            <Form.Control type="email" placeholder="Email" name="email" onChange={handleChange} required />
          </ Form.Group>
          <Form.Group as={Col}>
            <Form.Label htmlFor="telephone">
              Telephone </Form.Label>
              <Form.Control type="tel" placeholder="Telephone" name="telephone" onChange={handleChange} required />
          </ Form.Group>
        </Form.Row>
        <Form.Row>
        <Form.Group as={Col}>
        <Form.Label htmlFor="addr_line_1">
          Addres Line 1 </Form.Label>
          <Form.Control type="text" placeholder="Address Line One" value={state.currentItem.addr_line_1} name="addr_line_1" onChange={handleChange} required />
        </ Form.Group>
        <Form.Group as={Col}>
          <Form.Label htmlFor="addr_line_2">
            Addres Line 2 </ Form.Label>
            <Form.Control type="text" placeholder="Address Line Two" name="addr_line_2" onChange={handleChange} />
        </ Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label htmlFor="city">
              City/Town </Form.Label>
              <Form.Control type="text" placeholder="City/Town" value={state.currentItem.city} name="city" onChange={handleChange} required />
          </ Form.Group>
          <Form.Group as={Col}>
            <Form.Label htmlFor="county">
              County </Form.Label>
              <Form.Control type="text" placeholder="County" value={state.currentItem.county} name="county" onChange={handleChange} />
          </ Form.Group>
          <Form.Group as={Col}>
            <Form.Label htmlFor="postcode">
              Postcode </Form.Label>
              <Form.Control type="text" placeholder="PostCode" value={state.currentItem.postcode} name="postcode" onChange={handleChange} maxLength="8" required />
              {postcodeNode}
          </ Form.Group>
        </Form.Row>
        <Button className="align-self-end" variant="outline-success" type="submit">Submit</Button>
      </Form>
    </div>
  );
}

export default AddContact;
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import EditContact from './EditContact.js';

import {
  remove,
  contactsList,
} from './contactSlice';

 function Contacts() {
  const dispatch = useDispatch();
  const contacts = useSelector(contactsList);

  const [show, setShow] = useState(false);
  const [contact, setContact] = useState({});

  // Closes the Modal
  const handleClose = () => setShow(false);

  // Shows the Modal
  const handleShow = () => setShow(true);

  /**
   * Removes a contact from the store
   * @param {*} e the native event
   * @param {*} contact the contact record
   */
  const onDelete = (e, contact) => {
    dispatch(remove(contact));
  }
  let EditContactComponent;

  /**
   * Edits a contact from the contact list
   * @param {*} e native event
   * @param {*} item current contact record
   */
  const onEdit = (e, item) => {
    handleShow();
    setContact(item);
  }



  if (show) {
    EditContactComponent = <EditContact show={show} contact={contact} handleClose={handleClose}  />;
  }

  return (
    <div>
      <Table striped bordered hover variant="dark" size="sm">
      <thead>
      <tr>
        <th>#</th>
        <th>Contact Name</th>
        <th>Telephone</th>
        <th>Email</th>
        <th colSpan={2}>Address</th>
        <th>City/Town</th>
        <th>County</th>
        <th>PostCode</th>
      </tr>
    </thead>
        <tbody>
      {contacts.map((item, key) => {
        return(
              <tr key={key}>
                <td>{key + 1}</td>
                <td >{item.contact_name}</td>
                <td >{item.telephone}</td>
                <td >{item.email}</td>
                <td colSpan="2">{item.addr_line_1} {item.addr_line_2}</td>
                <td>{item.city}</td>
                <td>{item.county}</td>
                <td>{item.postcode}</td>
                <td>
                  <Button variant="outline-light" onClick={(e) => { onEdit(e, item) } }>Edit</Button>{' '}
                  <Button onClick={(e) => { onDelete(e, item) }} variant="outline-danger">Delete</Button>{' '}
                </td>
              </tr>
        );
      })}
        
        </tbody>
      </Table>
      { EditContactComponent }
    </div>
  );
}

export default Contacts;
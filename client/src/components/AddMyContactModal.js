import React, { Component } from "react";
// Bootstrap Components Used
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// Imported & executed axios calls
import { addContact } from "../actions/contactActions";

class AddMyContactModal extends Component {
  state = {
    modal: false,
    name: "",
    occupation: "",
    phone: "",
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    auth: PropTypes.object.isRequired,
  };

  // Open Modal when add contact button is clicked
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  // Change the value of the state for user entered values
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Implement onSubmit() when form gets submitted
  onSubmit = (e) => {
    e.preventDefault();

    // Create user object
    const newContact = {
      user_id: this.props.auth.user._id,
      name: this.state.name,
      occupation: this.state.occupation,
      phone: this.state.phone,
    };

    // Add contact via addContact action
    this.props.addContact(newContact);

    // Close Modal
    this.toggle();
  };

  // Render Add Contact Button & Modal only when clicked
  render() {
    const { contacts } = this.props.contact;
    const { user } = this.props.auth;

    // Filter stored contacts to check if the current user has any favourited tradespeople
    let contactsFiltered = contacts.filter((contact) => {
      return contact.user_id.indexOf(user._id.toLowerCase()) !== -1;
    });

    return (
      // Check if user is logged in & Hide Add Contact button if they are not
      <div className="container text-md-left ml-md-4 text-center">
        {contactsFiltered.length > 0 ? (
          <Button color="dark" className="mb-4 mt-2" onClick={this.toggle}>
            Add Contact
          </Button>
        ) : (
          ""
        )}

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add Contact</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="contact">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="contact"
                  placeholder="Add name"
                  onChange={this.onChange}
                />

                <Label for="contact">Occupation</Label>
                <Input
                  type="text"
                  name="occupation"
                  id="occupation"
                  placeholder="Add occupation"
                  onChange={this.onChange}
                />

                <Label for="contact">Phone No</Label>
                <Input
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="Add phone number"
                  onChange={this.onChange}
                />
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Add Contact
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

// Initialized values to display errors & check if user is logged in
const mapStateToProps = (state) => ({
  contact: state.contact,
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
});

export default connect(mapStateToProps, { addContact })(AddMyContactModal);

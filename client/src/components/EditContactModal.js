// Bootstrap Components Used
import React, { Component } from "react";
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
// Imported & executed edit profile axios calls
import { editContact, editContact2 } from "../actions/contactActions";
import PropTypes from "prop-types";

class EditContactModal extends Component {
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

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      name: this.props.oldName,
      occupation: this.props.oldOccupation,
      phone: this.props.oldPhone,
    });
  };

  // Change the value of the state for user entered values
  onChangeName = (e) => {
    this.setState({ name: e.target.value });
  };
  onChangeOccupation = (e) => {
    this.setState({ occupation: e.target.value });
  };
  onChangePhone = (e) => {
    this.setState({ phone: e.target.value });
  };

  // Implement onSubmit() when form gets submitted
  onSubmit = (e) => {
    e.preventDefault();

    const newContact = {
      user_id: this.props.auth.user._id,
      name: this.state.name,
      occupation: this.state.occupation,
      phone: this.state.phone,
    };

    // Add contact via newContact action
    this.props.editContact2(newContact);
    this.props.editContact(this.props.id);

    // Close Modal
    this.toggle();
  };

  // Render Edit Navlink & Modal when clicked and user is logged in
  render() {
    const { user } = this.props.auth;
    return (
      <div className="editBtnDiv">
        {this.props.isAuthenticated ? (
          <Button
            variant="outline-primary"
            size="sm"
            color="blue"
            style={{ float: "right" }}
            onClick={this.toggle}
          >
            Edit
          </Button>
        ) : null}{" "}
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Edit Contact</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="contact">Edit Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="contact"
                  placeholder={this.props.oldName}
                  onChange={this.onChangeName}
                />
                <Label for="contact">Edit Occupation</Label>
                <Input
                  type="text"
                  name="occupation"
                  id="occupation"
                  placeholder={this.props.oldOccupation}
                  onChange={this.onChangeOccupation}
                />
                <Label for="contact">Edit Phone Number</Label>
                <Input
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder={this.props.oldPhone}
                  onChange={this.onChangePhone}
                />
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Edit
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

// Initialized values so that contacts can be edited & user can be checked if they're logged in
const mapStateToProps = (state) => ({
  contact: state.contact,
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
});

export default connect(mapStateToProps, { editContact, editContact2 })(
  EditContactModal
);

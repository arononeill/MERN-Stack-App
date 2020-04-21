import { connect } from "react-redux";
import PropTypes from "prop-types";
// Bootstrap Components Used
import React, { Component, Fragment } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  Row,
  Container,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert,
} from "reactstrap";
// Imported & executed axios calls to edit & delete profile
import { editProfile, deleteProfile } from "../actions/authActions";

class MyProfileModal extends Component {
  state = {
    modal: false,
    id: "",
    name: "",
    email: "",
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    editProfile: PropTypes.func.isRequired,
    deleteProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  };

  // Set Profile state when form is opened
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      id: this.props.auth.user._id,
      name: this.props.auth.user.name,
      email: this.props.auth.user.email,
    });
  };

  // Change the value of the state for user entered values
  onChangeName = (e) => {
    this.setState({ name: e.target.value });
  };

  onChangeEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  onDeleteProfile = () => {
    this.props.deleteProfile(this.state.id);
  };

  // Implement onSubmit() when form gets submitted
  onSubmit = (e) => {
    e.preventDefault();

    const newContact = {
      id: this.state.id,
      name: this.state.name,
      email: this.state.email,
    };

    // Edit contact by passing the newContact object to the editProfile() function
    this.props.editProfile(newContact);

    // Close Modal
    this.toggle();
  };

  // Render 'My Profile' Navlink & Modal when clicked and user is logged in
  render() {
    return (
      <Fragment>
        <NavLink
          color="dark"
          onClick={this.toggle}
          href="#"
          className="myContactsHeader"
        >
          My Profile
        </NavLink>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className="myProfileModal"
        >
          <ModalHeader toggle={this.toggle}>
            <h5 className="ml-auto mr-auto">My Profile</h5>
          </ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            <Form>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder={this.state.name}
                  className="mb-3"
                  onChange={this.onChangeName}
                />

                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder={this.state.email}
                  className="mb-3"
                  onChange={this.onChangeEmail}
                />

                <Row className="mt-4">
                  <Container className="col-md-6 col-12 mb-md-0 mb-2">
                    <Button onClick={this.onSubmit} color="dark" block>
                      Edit
                    </Button>
                  </Container>
                  <Container className="col-md-6 col-12 mb-md-0 mb-2">
                    <Button onClick={this.onDeleteProfile} color="dark" block>
                      Delete Profile
                    </Button>
                  </Container>
                </Row>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

// Initialized values to check if user is they're logged in and authorized
const mapStateToProps = (state) => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { editProfile, deleteProfile })(
  MyProfileModal
);

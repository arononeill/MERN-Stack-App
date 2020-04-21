import React, { Component } from "react";
// Bootstrap Components Used
import { Container, ListGroup, ListGroupItem, Button, Row } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getContacts, deleteContact } from "../actions/contactActions";
import EditContactModal from "./EditContactModal";

class ContactList extends Component {
  static propTypes = {
    getContacts: PropTypes.func.isRequired,
    contact: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
    auth: PropTypes.object.isRequired,
  };

  // Get contacts from application's back-end
  componentDidMount() {
    this.props.getContacts();
  }

  // Delete a user's contact by passing their ID to the deleteContact() function.
  onDeleteClick = (id) => {
    this.props.deleteContact(id);
  };

  // If user is authenticated, display their contacts, otherwise display message to login
  render() {
    const { contacts } = this.props.contact;
    const { user } = this.props.auth;

    // Filter stored contacts by current user's ID
    let contactsFiltered = contacts.filter((contact) => {
      return contact.user_id.indexOf(user._id.toLowerCase()) !== -1;
    });

    return (
      <Container>
        {
          // Check if the current user has any favourited tradespeople & Display them or message to favourite tradespeople
          contactsFiltered.length > 0 ? (
            <ListGroup>
              <TransitionGroup>
                <CSSTransition timeout={500} classNames="fade">
                  <ListGroupItem>
                    <Row>
                      <Container className="col-4 text-center pl-5 pr-0">
                        <b>Name </b>
                      </Container>
                      <Container className="col-4 text-center">
                        <b>Occupation </b>
                      </Container>
                      <Container className="col-4 text-center pr-md-6 pr-4 pl-md-0 pl-2">
                        <b>Phone No. </b>
                      </Container>
                    </Row>
                  </ListGroupItem>
                </CSSTransition>
                {
                  // Loop over contacts to check if the belong to the current user, before displaying each as a row using bootstrap
                  contactsFiltered.map(({ _id, name, occupation, phone }) => (
                    <CSSTransition key={_id} timeout={500} classNames="fade">
                      <ListGroupItem>
                        <Row>
                          <Container className="col-4 text-center">
                            <Row>
                              <Container className="col-3 px-md-2 p-md-0 p-2">
                                {this.props.isAuthenticated ? (
                                  <Button
                                    className="remove-btn float-left"
                                    color="danger"
                                    size="sm"
                                    onClick={this.onDeleteClick.bind(this, _id)}
                                  >
                                    &times;
                                  </Button>
                                ) : null}
                              </Container>
                              <Container className="col-9 text-center px-md-0 px-4">
                                {name}
                              </Container>
                            </Row>
                          </Container>
                          <Container className="col-4 text-center">
                            {occupation}
                          </Container>
                          <Container className="col-4 text-center">
                            <Row>
                              <Container className="col-9 p-md-0 pl-md-5 px-0 p-2">
                                {phone}
                              </Container>
                              <Container className="col-3 p-md-0 px-0 mt-md-0 mt-2">
                                <EditContactModal
                                  id={_id}
                                  oldName={name}
                                  oldOccupation={occupation}
                                  oldPhone={phone}
                                />
                              </Container>
                            </Row>
                          </Container>
                        </Row>
                      </ListGroupItem>
                    </CSSTransition>
                  ))
                }
              </TransitionGroup>
            </ListGroup>
          ) : (
            <h6 className="text-center">
              Favourite tradespeople to view contacts!
            </h6>
          )
        }
      </Container>
    );
  }
}

// Initialized values so that contacts can be displayed & user can be checked if they're logged in
const mapStateToProps = (state) => ({
  contact: state.contact,
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
});

export default connect(mapStateToProps, { getContacts, deleteContact })(
  ContactList
);

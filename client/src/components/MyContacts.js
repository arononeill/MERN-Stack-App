// Bootstrap Components Used
import React, { Component, Fragment } from "react";
import { Modal, ModalHeader, ModalBody, NavLink } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ContactList from "./ContactList";
import AddMyContactModal from "./AddMyContactModal";

class ContactsModal extends Component {
  state = {
    modal: false,
    name: "",
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  // Render 'My Contacts' Navlink & associated components when clicked
  render() {
    return (
      <Fragment>
        <div>
          <NavLink
            color="dark"
            onClick={this.toggle}
            href="#"
            className="myContactsHeader"
          >
            My Contacts
          </NavLink>
        </div>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className="m-md-5 m-3 mw-100"
        >
          <ModalHeader toggle={this.toggle}>
            <h5 className="ml-auto mr-auto">My Favourite Tradespeople</h5>
          </ModalHeader>
          <ModalBody>
            {
              // Check if user is logged in & Display message to login to favourite if not
              this.props.isAuthenticated ? (
                <div>
                  <AddMyContactModal />
                  <ContactList />
                </div>
              ) : (
                <h6 className="text-center">
                  Login to Favourite Tradespeople!
                </h6>
              )
            }
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

// Initialized values so that contacts can be accessed & user can be checked if they're logged in
const mapStateToProps = (state) => ({
  contact: state.contact,
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
});

export default connect(mapStateToProps, {})(ContactsModal);

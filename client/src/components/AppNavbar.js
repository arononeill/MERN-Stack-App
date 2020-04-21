import React, { Fragment, useState, Component } from "react";
// Bootstrap Components Used
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Imported Components Used
import RegisterModal from "./auth/RegisterModal";
import LoginModal from "./auth/LoginModal";
import Logout from "./auth/Logout";
import MyContacts from "./MyContacts";
import MyProfileModal from "./MyProfile";
import DistanceToTradespeople from "./DistanceToTradespeople";

class AppNavbar extends Component {
  state = {
    isOpen: false,
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    // Get current user's state to see if they're logged in
    const { isAuthenticated, user } = this.props.auth;

    // Links for a logged in user
    const authLinks = (
      <Fragment>
        <NavItem className="ml-3">
          <DistanceToTradespeople />
        </NavItem>
        <NavItem className="ml-3">
          <MyContacts />
        </NavItem>
        <NavItem className="ml-3">
          <span className="navbar-text">
            <strong>{user ? `${user.name}` : ""}</strong>
          </span>
        </NavItem>
        <NavItem className="ml-3">
          <MyProfileModal />
        </NavItem>
        <NavItem className="ml-3">
          <Logout />
        </NavItem>
      </Fragment>
    );

    // Links for a user who is not logged in
    const guestLinks = (
      <Fragment>
        <NavItem className="ml-3">
          <DistanceToTradespeople />
        </NavItem>
        <NavItem className="ml-3">
          <MyContacts />
        </NavItem>
        <NavItem className="ml-3">
          <RegisterModal />
        </NavItem>
        <NavItem className="ml-3">
          <LoginModal />
        </NavItem>
      </Fragment>
    );

    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <NavbarBrand href="/">Tradespeople Near Me</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {
                  // Check if user is logged in and display appropiate links
                  isAuthenticated ? authLinks : guestLinks
                }
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

// Initialized values to check if user is logged in
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(AppNavbar);

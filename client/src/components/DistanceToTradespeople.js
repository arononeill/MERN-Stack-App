// Bootstrap Components Used
import React, { Component, Fragment, CSSTransition } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  NavLink,
  Row,
  Container,
  ListGroupItem,
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { google_api_key } from "../client_config.json";

class DistanceToTradespeople extends Component {
  state = {
    modal: false,
    name: "",
    latitude: null,
    longitude: null,
    distance: null,
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    tradesperson: PropTypes.object.isRequired,
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
    this.getLocation();
  };

  // Function to request user location
  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.getCoordinates,
        this.handlerLocationError
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  // Handle  Alerts if user's location cant be retrieved
  handlerLocationError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
    }
  };

  // Retrieve user coordinates
  getCoordinates = (position) => {
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  };

  // Function to calculate distance between user and each tradesperson using Haversine Distance Formula
  getDistanceFromUser = (Tradespersonlatitude, Tradespersonlongitude) => {
    let userLatitude = this.state.latitude;
    let userLongitude = this.state.longitude;

    let R = 6371; // Radius of the earth in km
    let dLat = (Tradespersonlatitude - userLatitude) * (Math.PI / 180);
    let dLon = (Tradespersonlongitude - userLongitude) * (Math.PI / 180);
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(userLatitude * (Math.PI / 180)) *
        Math.cos(userLongitude * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let calculatedDistance = R * c;
    calculatedDistance =
      Math.round((calculatedDistance + Number.EPSILON) * 100) / 100;

    // Return Calculated Distance
    return calculatedDistance;
  };

  // Render 'Distance To Tradespeople' Navlink & associated components when clicked
  render() {
    const { tradespeople } = this.props.tradesperson;
    let calculatedDistance = 0;
    return (
      <Fragment>
        <div>
          <NavLink
            color="dark"
            onClick={this.toggle}
            href="#"
            className="DistanceToTradespeopleHeader"
          >
            Distance To Tradespeople
          </NavLink>
        </div>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className="m-md-5 m-3 mw-100"
        >
          <ModalHeader toggle={this.toggle}>
            <h5 className="ml-auto mr-auto">Distance To Tradespeople</h5>
          </ModalHeader>
          <ModalBody>
            <Container className="col-12">
              <Row className="mb-md-4 mb-2">
                <Container className="col-6 text-center">
                  <b>Your latitude: </b>
                  {this.state.latitude}
                </Container>
                <Container className="col-6 text-center">
                  <b>Your longitude: </b>
                  {this.state.longitude}
                </Container>
              </Row>
            </Container>
            <Row className="pt-4 map">
              <Container className="col-md-6 col-12">
                {
                  // Check if user has given location
                  this.state.latitude && this.state.longitude ? (
                    <img
                      src={`https://maps.googleapis.com/maps/api/staticmap?center=${this.state.latitude},${this.state.longitude}&zoom=14&size=400x300&sensor=false&markers=color:red%7C${this.state.latitude},${this.state.longitude}&key=${google_api_key}`}
                      alt=""
                      className="w-100 ml-md-5 ml-0"
                    ></img>
                  ) : null
                }
              </Container>
              {
                // Check if user has given location so that Haversine Formula can be calucalted
                this.state.latitude && this.state.longitude ? (
                  <Container className="col-md-6 col-12 mt-md-0 mt-4">
                    {
                      // Loop over existing tradespeople
                      tradespeople.map(({ _id, name, latitude, longitude }) => (
                        <Row className="mb-md-4 mb-2">
                          <Container className="col-12 text-center">
                            <b>Distance to {name} is: </b>
                            {
                              (calculatedDistance = this.getDistanceFromUser(
                                latitude,
                                longitude
                              ))
                            }
                            {calculatedDistance} km
                          </Container>
                        </Row>
                      ))
                    }
                  </Container>
                ) : null
              }
            </Row>
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

// Initialized values so that contacts can be accessed & user can be checked if they're logged in
const mapStateToProps = (state) => ({
  tradesperson: state.tradesperson,
  contact: state.contact,
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
});

export default connect(mapStateToProps, {})(DistanceToTradespeople);

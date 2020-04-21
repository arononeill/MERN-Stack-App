import React, { Component } from "react";
// Bootstrap Components Used
import { Container, ListGroup, ListGroupItem, Button, Row } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// Imported & executed axios calls
import {
  getTradespeople,
  addTradespersonContact,
} from "../../actions/tradespersonActions";

class TradespeopleList extends Component {
  static propTypes = {
    getTradespeople: PropTypes.func.isRequired,
    tradesperson: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
    auth: PropTypes.object.isRequired,
  };

  state = {
    search: "",
  };

  componentDidMount() {
    this.props.getTradespeople();
  }

  // Change the value of the state search when user enters input
  onChangeSearch(e) {
    this.setState({ search: e.target.value });
  }

  // Get clicked tradesperson's attributes & create newContact
  onAddContactClick = (id, name, occupation, phone) => {
    const { user } = this.props.auth;
    const newContact = {
      user_id: user._id,
      name: name,
      occupation: occupation,
      phone: phone,
    };

    // Pass new contact to addTradespersonContact function on back-end
    this.props.addTradespersonContact(newContact);
  };

  // Display search bar and available tradespeople
  render() {
    // Filter displayed tradespeople using search filter
    const { user } = this.props.auth;
    const { tradespeople } = this.props.tradesperson;
    let tradespeopleFiltered = tradespeople.filter((tradesperson) => {
      return (
        tradesperson.name
          .toLowerCase()
          .indexOf(this.state.search.toLowerCase()) !== -1 ||
        tradesperson.occupation
          .toLowerCase()
          .indexOf(this.state.search.toLowerCase()) !== -1 ||
        tradesperson.phone
          .toLowerCase()
          .indexOf(this.state.search.toLowerCase()) !== -1 ||
        tradesperson.location
          .toLowerCase()
          .indexOf(this.state.search.toLowerCase()) !== -1
      );
    });

    return (
      <Container>
        <Row className="mb-4">
          <Container className="col-md-6 col-12">
            <Row>
              <Container className="col-3">
                <h5 className="p-1">Search:</h5>
              </Container>
              <Container className="col-9">
                <input
                  type="text"
                  placeholder={this.state.search}
                  onChange={this.onChangeSearch.bind(this)}
                ></input>
              </Container>
            </Row>
          </Container>
          <Container className="col-md-6 col-12 mt-md-0 mt-2">
            <h5 className="text-center">
              {
                // Check if user is logged in & Display message to login to favourite if not
                this.props.isAuthenticated ? (
                  <div></div>
                ) : (
                  "Login to Favourite Tradespeople!"
                )
              }
            </h5>
          </Container>
        </Row>
        <ListGroup>
          <TransitionGroup>
            <CSSTransition timeout={500} classNames="fade">
              <ListGroupItem>
                <Row className="ml-md-0 mr-md-1 ml-3">
                  <Container className="col-md-3 col-6 text-center pl-md-5 pl-0 mb-md-0 mb-2">
                    <b>Name </b>
                  </Container>
                  <Container className="col-md-3 col-6 text-center mb-md-0 mb-2">
                    <b>Occupation </b>
                  </Container>
                  <Container className="col-md-3 col-6 text-center">
                    <b>Phone No. </b>
                  </Container>
                  <Container className="col-md-3 col-6 text-center">
                    <b>Location </b>
                  </Container>
                </Row>
              </ListGroupItem>
            </CSSTransition>
            {
              // Loops over available tradespeople
              tradespeopleFiltered.map(
                ({ _id, name, occupation, phone, location }) => (
                  <CSSTransition key={_id} timeout={500} classNames="fade">
                    <ListGroupItem>
                      <Row>
                        <Container className="col-md-3 col-6 text-center">
                          {
                            // Check if user is logged in & Display favourite Button if they are
                            this.props.isAuthenticated ? (
                              <Button
                                className="favouriteBtn float-left"
                                size="sm"
                                onClick={this.onAddContactClick.bind(
                                  this,
                                  _id,
                                  name,
                                  occupation,
                                  phone,
                                  location
                                )}
                              >
                                Fav
                              </Button>
                            ) : null
                          }
                          {name}
                        </Container>
                        <Container className="col-md-3 col-6 text-center">
                          {occupation}
                        </Container>
                        <Container className="col-md-3 col-6 text-md-center text-right px-md-0 px-2">
                          {phone}
                        </Container>
                        <Container className="col-md-3 col-6 text-center">
                          {location}
                        </Container>
                      </Row>
                    </ListGroupItem>
                  </CSSTransition>
                )
              )
            }
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

// Initialized values to display errors & check if user is logged in
const mapStateToProps = (state) => ({
  tradesperson: state.tradesperson,
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getTradespeople,
  addTradespersonContact,
})(TradespeopleList);

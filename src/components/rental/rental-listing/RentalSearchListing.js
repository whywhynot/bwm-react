import React from "react";
import { RentalList } from "./RentalList";
import { connect } from "react-redux";
import * as actions from "../../../actions";
import { toUpperCase } from "../../../helpers";

export class RentalSearchListing extends React.Component {
  constructor() {
    super();
    this.state = {
      searhedCity: ""
    };
  }

  componentWillMount() {
    this.searchRentalByCity();
  }

  componentDidUpdate(prevProps) {
    const currentUrlParam = this.props.match.params.city;
    const prevUrlParam = prevProps.match.params.city;

    if (currentUrlParam !== prevUrlParam) {
      this.searchRentalByCity();
    }
  }

  searchRentalByCity() {
    const searchedCity = this.props.match.params.city;
    this.setState({ searchedCity });
    this.props.dispatch(actions.fetchRentals());
  }

  renderTitle() {
    const { errors, data } = this.props.rentals;
    const { searchedCity } = this.state;
    let title = "";

    if (errors.length > 0) {
      title = errors[0].detail;
    }

    if (data.length > 0) {
      title = `Your home in ${toUpperCase(searchedCity)}`;
    }

    return <h1 className="page-title">{title}</h1>;
  }

  render() {
    return (
      <section id="rentalListing">
        {this.renderTitle()}
        <RentalList rentals={this.props.rentals.data} />
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    rentals: state.rentals
  };
}

export default connect(mapStateToProps)(RentalSearchListing);

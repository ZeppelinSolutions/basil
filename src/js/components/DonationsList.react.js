import React from 'react'
import Store from '../store'
import { connect } from 'react-redux'
import DonationsActions from '../actions/donations'

class DonationsList extends React.Component {

  componentWillMount() {
    Store.dispatch(DonationsActions.findAll())
  }

  render() {
    const donations = this.props.donations.list
    return (
      <div className={"col " + this.props.col}>
        <div className="card donations-list">
          <div className="card-content">
            <h3 className="titleList">Some already thought about our basil</h3>
            { donations.length === 0 ? <em>Loading...</em> : <div>{this._buildDonationsList(donations)}</div>}
          </div>
        </div>
      </div>
    )
  }

  _buildDonationsList(donations) {
    
    const len = Math.ceil(donations.length / 3);
    const rows = [];
    for(let r = 0; r < len; r++) {
      rows.push(
        <div className="row no-margin" key={r}>
          {this._buildDonationItem(donations[r])}
          {this._buildDonationItem(donations[r + 1])}
          {this._buildDonationItem(donations[r + 2])}
        </div>
      );
    }
    return rows;
    // TODO: delete chip css object
  }

  _buildDonationItem(donation) {
    if(!donation) return <div className="col s4"></div>
    const style = { backgroundColor: `rgb(${[donation.r, donation.g, donation.b]})` }
    return (
      <div className="col s4">
        <div className="donationCard">
          <div className="row no-margin donationColor" style={style}>
            <label>
            <div className="donationRgb">
            {`${donation.r} - ${donation.g} - ${donation.b}`}
            </div>
            </label>
          </div>
          <div className="row no-margin donationAddress">
            {donation.donor}
            <div className="secondary-content donationValue">ETH {donation.value}</div>
          </div>
        </div>  
      </div>
    );
  }
}

function mapStateToProps({ donations }) {
  return { donations }
}

export default connect(mapStateToProps)(DonationsList)

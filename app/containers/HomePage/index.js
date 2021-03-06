/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a neccessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import styles from './styles.css';
import db from '../../api/db.js'
import Dropdown from '../../components/Dropdown'
import ApmtList from '../../components/ApmtList'

/* eslint-disable react/prefer-stateless-function */

export default class HomePage extends React.Component {
  state = { loading: true, filter: 'DDEN' };

  componentDidMount() {
    db.getData()
      .then((data) =>
        this.setState({ loading: false, data })
      )
  }

  filters = {
    'DDEN': 'GENERAL DENTISTRY',
    'DDET': 'DENTAL THERAPY',
    'DENO': 'ENDODONTICS',
    'DGSCD': 'GERIATRIC SPECIAL CARE DENTISTRY',
    'DOMS': 'ORAL & MAXILLOFACIAL SURGERY',
    'DOTD': 'ORTHODONTICS',
    'DPDN': 'PAEDIATRIC DENTAL',
    'DPRD': 'PERIODONTICS',
    'DPRT': 'PROSTHODONTICS'
  };


  filterBySpecialty() {
    return this.state.data.map((day) => {
        return {
          ...day, predictions: day.predictions.filter((apmt)=> apmt.specialty === this.state.filter)
        }
      }
    )
  }

  onFilterChanged = (input) => {
    this.setState({ filter: input.value })
  };

  render() {
    if (this.state.loading) {
      return (
        <div className={styles.loading}>
          <h1 className="display-2">Loading...</h1>
        </div>
      )
    }

    if (!this.state.data) {
      return (
        <div className='jumbotron'>
          <h1 className="display-2">No data!</h1>
        </div>
      )
    }

    let weekData = this.filterBySpecialty(this.state.data);
    // TODO filter to immediate week
    return (
      <div className={`container-fluid ${styles.mainContainer}`}>
        <h1 className={`display-3 ${styles.title}`}>NDCS No-Show Predictor</h1>
        <Dropdown filters={this.filters} onFilterChanged={this.onFilterChanged}/>
        <ApmtList weekData={weekData}/>
      </div>

    );
  }
}


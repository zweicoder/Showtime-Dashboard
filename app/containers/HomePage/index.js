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
import Dropzone from 'react-dropzone'
import 'whatwg-fetch'

/* eslint-disable react/prefer-stateless-function */

export default class HomePage extends React.Component {
  state = { loading: false, filter: 'DDEN', url: false, empty:true};

  // componentDidMount() {
  //   db.getData()
  //     .then((data) =>
  //       this.setState({ loading: false, data })
  //     )
  // }

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

  onDrop= (files) =>{
    console.log('Uploading files: ', files);
    var data = new FormData()
    data.append('file', files[0])
    const host = 'http://localhost:5000'
    this.setState({loading: true})
    fetch(`${host}/predict`, {
      method: 'POST',
      body: data
    })
    .then((res)=>{
      console.log(res)
      if (!res.ok){
        alert('Something went wrong while uploading file to server!')
        this.setState({loading:false})
        return
      }
      return res.json()
    })
    .then((json)=>{
      console.log(json)
      const {url, data} = json;
      this.setState({url, data, loading:false})
    })
    .catch((err)=>{
      console.error(err)
      this.setState({loading:false})
    })
  }

  render() {
    const activeStyle = {'border': '2px dashed black', 'borderRadius': '4px', opacity:'0.3', 'zIndex':'1'}
    if (this.state.loading) {
      return (
        <div className={styles.loading}>
          <h1 className="display-2">Loading...</h1>
        </div>
      )
    }

    if (!this.state.data) {
      return (
        <Dropzone onDrop={this.onDrop} style={{}} disableClick={true} activeStyle={activeStyle}>
          <div className={`container-fluid ${styles.mainContainer}`}>
            <h1 className={`display-3 ${styles.title}`}>NDCS No-Show Predictor</h1>
            <div className='jumbotron'><h2>Drop a .txt or .csv file here to begin!</h2></div>
          </div>
        </Dropzone>
      )
    }

    let weekData = this.filterBySpecialty(this.state.data);
    // TODO filter to immediate week
    return (
      <Dropzone onDrop={this.onDrop} style={{}} disableClick={true} activeStyle={activeStyle}>
        <div className={`container-fluid ${styles.mainContainer}`}>
          <h1 className={`display-3 ${styles.title}`}>NDCS No-Show Predictor</h1>
          <Dropdown filters={this.filters} onFilterChanged={this.onFilterChanged}/>
          <ApmtList weekData={weekData}/>
        </div>
      </Dropzone>

    );
  }
}


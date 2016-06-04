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

/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.Component {

  render() {
    function randChoice(arr) {
      //At most choose half of the array randomly
      const result = new Array(Math.floor(Math.random() * arr.length / 2)).fill();
      return result.map(() => arr[Math.floor(Math.random() * arr.length)]);
    }

    function getStubId() {
      const id = new Array(6).fill()
        .map((val, idx) => Math.floor(Math.random() * 9))
        .join('');
      return `C~${id}`
    }

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat'];
    // TODO dates
    const dates = new Array(7).fill().map((val, idx) => `${5 + idx}/6/2016`);
    const stubApmts = new Array(15).fill().map(getStubId);
    const stubData = dates.map((date)=> {
      return {
        date,
        predictions: randChoice(stubApmts)
      }
    });

    return (
      <div className={`container-fluid ${styles.mainContainer}`}>
        <h1 className={`display-3 ${styles.title}`}>Singhealth No-Show Prediction</h1>
        <div className="row">
          {stubData.map((item, idx)=> {
            return (
              <div className={styles.columnContainer}>
                <div className={styles.dayOfWeek}>
                  {days[idx]} - {item.date}
                </div>
                <div className={styles.noShowStats}>
                  <div className={styles.numNoShow}> {item.predictions.length} </div>
                  <div className={styles.subtextNoShow}> <small>potential no-shows </small></div>
                </div>
                Predicted No-Shows:
                <div className={styles.dayPredictions}>
                  {item.predictions.map((prediction)=> <div>{prediction}</div>)}
                </div>
              </div>
            )
          })}

        </div>
      </div>

    );
  }
}

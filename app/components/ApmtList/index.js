/**
 *
 * ApmtList
 *
 */

import React from 'react';
import styles from './styles.css';

class ApmtList extends React.Component {
  render() {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat'];
    return (
      <div className="row">
        {this.props.weekData.map((dayData, idx)=> {
          const { date, predictions, dayOfWeek } = dayData;
          //TODO allow filter by specialty
          return (
            <div className={styles.columnContainer} key={date}>
              <div className={styles.dayOfWeek}>
                {days[dayOfWeek]} - {date}
              </div>
              <div className={styles.noShowStats}>
                <div className={styles.numNoShow}> {predictions.length} </div>
                <div className={styles.subtextNoShow}>
                  <small>potential no-shows</small>
                </div>
              </div>
              Predicted No-Shows:
              <div className={styles.dayPredictions}>
                {predictions.map(({ score, id, specialty })=>
                  <div key={id}>
                    <span>{id} ({specialty}) : {score}</span>
                  </div>)}
              </div>
            </div>
          )
        })}

      </div>
    );
  }
}

export default ApmtList;

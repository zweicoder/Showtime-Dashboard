/**
 *
 * ApmtList
 *
 */

import React from 'react';
import styles from './styles.css';

function percent(score) {
  return (parseFloat(score) * 100).toPrecision(3)
}

class ApmtList extends React.Component {
  render() {
    const days = ['Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat','Sun'];
    return (
      <div className={styles.listContainer}>
          
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
                  <div className={styles.predictionTable}>
                    <div className={`${styles.tableHeading}`}>
                      <h5>Case ID</h5>
                      <h5> Probability</h5>
                    </div>
                    <div className={`${styles.predictionList}`}>
                      {predictions.map(({ score, id, specialty })=>
                        <div key={id} className={styles.predictionListRow}>
                          <h6>{id}</h6>
                          <h6>{`${percent(score)} %`}</h6>
                        </div>)}
                    </div>
                  </div>

                </div>
              )
            })}
        
      </div>
    );
  }
}

export default ApmtList;

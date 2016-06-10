import React from 'react';
import { SimpleSelect } from 'react-selectize';

export default class Dropdown extends React.Component {

  render() {
    const options = Object
      .entries(this.props.filters)
      // value is the apmt code, used for filtering
      .map(({ value, label}) => {
        return { label, value }
      });

    return (
      <SimpleSelect
        placeholder="Filter by Specialty"
        onValueChange={this.props.onFilterChanged}
        options={options}
      >
      </SimpleSelect>
    );

  }

}
import React from 'react';
import { SimpleSelect } from 'react-selectize';

export default class Dropdown extends React.Component {

  render() {
    const options = this.props.filters.map(function (filter) {
      return { label: filter, value: filter }
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
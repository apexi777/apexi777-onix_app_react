import { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import './sass/Sorting.scss';

class Sorting extends Component {
  render() {
    const { setSelectState } = this.props;
    return (
      <div className="sorting">
        <div className="container">
          <div className="sorting_view">
            <Select 
              placeholder="Sort shoes by ..."
              onChange={(value) => {
                setSelectState(value.value);
              }}
              options={
                [
                  { value: 'Price: High-Low', label: 'Price: High-Low' },
                  { value: 'Price: Low-High', label: 'Price: Low-High' },
                  { value: 'Featured', label: 'Featured' }
                ]
            }
            />  
          </div>
        </div>
      </div>
    );
  }
}

Sorting.propTypes = {
  setSelectState: PropTypes.func.isRequired
};

export default Sorting;

import { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import {
  PRICE_HIGH_TO_LOW, 
  PRICE_LOW_TO_HIGH,
  PRICE_FEATURED,
} from '../../constans/translates';

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
                  { value: PRICE_HIGH_TO_LOW, label: PRICE_HIGH_TO_LOW },
                  { value: PRICE_LOW_TO_HIGH, label: PRICE_LOW_TO_HIGH },
                  { value: PRICE_FEATURED, label: PRICE_FEATURED }
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

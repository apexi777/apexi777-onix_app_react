import { useCallback } from 'react';

import { 
  PRICE_HIGH_TO_LOW, 
  PRICE_LOW_TO_HIGH,
  PRICE_FEATURED, 
  LABEL_LOW_PRICE,
  LABEL_HIGH_PRICE
} from '../constans/translates';

// eslint-disable-next-line import/prefer-default-export
export const useSorting = () => {
  const bubbleSort = (array, text) => {
    const secondaryArray = array.slice(0);
    let count = 0;
    for (let i = 0; i < array.length; i += 1) {
      for (let a = 0; a < secondaryArray.length - 1; a += 1) {
        if (text === LABEL_HIGH_PRICE) {
          if (secondaryArray[a].price > secondaryArray[a + 1].price) {
            const secondaryValue = secondaryArray[a];
            secondaryArray[a] = secondaryArray[a + 1];
            secondaryArray[a + 1] = secondaryValue;
          }
        } else if (secondaryArray[a].price < secondaryArray[a + 1].price) {
          const secondaryValue = secondaryArray[a];
          secondaryArray[a] = secondaryArray[a + 1];
          secondaryArray[a + 1] = secondaryValue;
        }
      }
    }
    return secondaryArray.map((elem) => {
      count += 1;
      return { ...elem, order: count };
    });
  };

  const onSortDataByPrice = useCallback((array, text) => {
    switch (text) {
      case PRICE_LOW_TO_HIGH:
        return bubbleSort(array, LABEL_LOW_PRICE);
      case PRICE_HIGH_TO_LOW: 
        return bubbleSort(array, LABEL_HIGH_PRICE);
      case PRICE_FEATURED: {
        let secondaryData = [];
        const count = array.reduce((result, value) => result + (JSON.stringify(value.select) !== '{}'), 0);
        if (count !== 0) {
          secondaryData = array.filter((value) => value.select.favorite);
        } else {
          return secondaryData;
        }
        return secondaryData;
      }    
      default:
        return array;
    }
  }, []);

  return {
    onSortDataByPrice
  };
};

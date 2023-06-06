import { createSelector } from '@reduxjs/toolkit';

export const selectorCurrency = ({ currency }) => currency.currency;

export const selectorUsdRate = ({ currency }) => currency.usdRate;

export const selectorSelectCurrency = ({ currency }) => currency.selectCurrency;

export const selectorCurrencyLoadedStatus = ({ currency }) => currency.currencyLoadedStatus;

export const selectorPrice = ({ currency }) => currency.price;

export const selectorActiveCharacter = ({ currency }) => currency.currencyMenu.filter((item) => item.select);

const select = (state) => state.currency;

export const selectorCount = createSelector(select, (currency) => currency.count);

export const selectorCurrencyMenu = createSelector(select, (currency) => currency.currencyMenu);

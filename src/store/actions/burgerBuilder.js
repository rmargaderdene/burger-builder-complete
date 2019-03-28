import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredient = (ingName, price) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: ingName,
    price: price
  };
};

export const removeIngredient = (ingName, price) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: ingName,
    price: price
  };
};

export const setPrices = prices => {
  return {
    type: actionTypes.SET_PRICES,
    prices: prices
  };
};

export const fetchPricesFailed = () => {
  return {
    type: actionTypes.FETCH_PRICES_FAILED
  };
};

export const initPrices = () => {
  return dispatch => {
    axios
      .get("/ingredient/prices")
      .then(response => {
        dispatch(setPrices(response.data));
      })
      .catch(error => {
        dispatch(fetchPricesFailed());
      });
  };
};

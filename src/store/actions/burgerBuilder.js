import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredient = name => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name
  };
};

export const removeIngredient = name => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name
  };
};

export const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENT,
    ingredients: ingredients
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  };
};

export const initIngredients = () => {
  return dispatch => {
    axios
      .get("/ingredients/numbers")
      .then(response => {
        dispatch(setIngredients(response.data));
      })
      .catch(error => {
        dispatch(fetchIngredientsFailed());
      });
  };
};

export const setIngredientPrices = prices => {
  return {
    type: actionTypes.SET_INGREDIENT_PRICES,
    prices: prices
  };
};

export const fetchIngredientPricesFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_PRICES_FAILED
  };
};

export const initIngredientPrices = () => {
  return dispatch => {
    axios
      .get("/ingredients/prices")
      .then(response => {
        dispatch(setIngredientPrices(response.data));
      })
      .catch(error => {
        dispatch(fetchIngredientPricesFailed());
      });
  };
};

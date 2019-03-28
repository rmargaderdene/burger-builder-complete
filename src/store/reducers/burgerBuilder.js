import * as actionTypes from "../actions/actionTypes";

const initialState = {
  ingredients: {
    salad: 1,
    meat: 1,
    cheese: 1,
    bacon: 1
  },
  prices: {
    salad: 0.5,
    meat: 1.3,
    cheese: 0.4,
    bacon: 0.7
  },
  totalPrice: 3,
  error: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + action.price
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - action.price
      };
    case actionTypes.SET_PRICES:
      return {
        ...state,
        prices: action.prices,
        error: false
      };
    case actionTypes.FETCH_PRICES_FAILED:
      return {
        ...state,
        error: true
      };
    default:
      return state;
  }
};

export default reducer;

import React, { Fragment, Component } from "react";
import { connect } from "react-redux";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as burgerBuilderActions from "../../store/actions/index";
import axios from "../../axios-orders";

class BurgerBuilder extends Component {
  state = {
    purchasing: false
  };

  componentDidMount() {
    this.props.onInitPrices();
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(ingKey => {
        return ingredients[ingKey];
      })
      .reduce((sum, element) => {
        return sum + element;
      }, 0);

    return sum > 0;
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push("/checkout");
  };

  render() {
    const disabledInfo = {
      ...this.props.ings
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.props.error ? (
      <p>Ingredient can't be loaded!</p>
    ) : (
      <Spinner />
    );

    if (this.props.ings) {
      burger = (
        <Fragment>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ings)}
            price={this.props.price}
            ordered={this.purchaseHandler}
          />
        </Fragment>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.props.price}
        />
      );
    }

    return (
      <Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName, price) =>
      dispatch(burgerBuilderActions.addIngredient(ingName, price)),
    onIngredientRemoved: (ingName, price) =>
      dispatch(burgerBuilderActions.removeIngredient(ingName, price)),
    onInitPrices: () => dispatch(burgerBuilderActions.initPrices())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));

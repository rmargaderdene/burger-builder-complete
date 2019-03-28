import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

class BuildControls extends Component {
  getIngredientPrice = (prices, type) => {
    let entity = null;
    Object.entries(prices).forEach(([key, value]) => {
      if (key === type) {
        entity = value;
      }
    });
    return entity;
  };

  render() {
    const buiildControls = controls.map(control => (
      <BuildControl
        key={control.label}
        label={control.label}
        added={() =>
          this.props.ingredientAdded(
            control.type,
            this.getIngredientPrice(this.props.prices, control.type)
          )
        }
        removed={() =>
          this.props.ingredientRemoved(
            control.type,
            this.getIngredientPrice(this.props.prices, control.type)
          )
        }
        disabled={this.props.disabled[control.type]}
      />
    ));

    return (
      <div className={classes.BuildControls}>
        <p>
          Current Price: <strong>{this.props.totalPrice.toFixed(2)}</strong>
        </p>
        {buiildControls}
        <button
          className={classes.OrderButton}
          disabled={!this.props.purchasable}
          onClick={this.props.ordered}
        >
          ORDER NOW
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    prices: state.prices,
    totalPrice: state.totalPrice
  };
};

export default connect(mapStateToProps)(BuildControls);

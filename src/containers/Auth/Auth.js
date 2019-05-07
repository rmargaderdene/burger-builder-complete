import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Auth.css";
import * as actions from "../../store/actions/index";
import { updateObject, checkValidity } from "../../shared/utility";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Mail Address"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      firstname: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "First Name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      },
      confirmPassword: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Confirm Password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    }
  };

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== "/") {
      this.props.onSetAuthRedirectPath();
    }
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true
      })
    });
    this.setState({ controls: updatedControls });
  };

  submitHandler = event => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.firstname.value,
      this.state.controls.password.value,
      this.state.controls.confirmPassword.value,
      this.props.isSignup
    );
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    let form = formElementsArray.map(formElement => {
      if (
        ["firstname", "confirmPassword"].includes(formElement.id) &&
        !this.props.isSignup
      ) {
        return null;
      }

      return (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={event => this.inputChangedHandler(event, formElement.id)}
        />
      );
    });

    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMessage = Object.keys(this.props.error).map(msgKey => (
      <p key={msgKey}>{this.props.error[msgKey]}</p>
    ));

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      if (this.props.buildingBurger) {
        //authRedirect = <Redirect to='/checkout'/>
        authRedirect = <Redirect to={this.props.authRedirectPath} />;
      } else {
        authRedirect = <Redirect to="/" />;
      }
    }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button clicked={this.props.onChangeIsSignup} btnType="Danger">
          SWITCH TO {this.props.isSignup ? "SIGNIN" : "SIGNUP"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
    isSignup: state.auth.isSignup
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, firstname, password, confirmPassword, isSignup) =>
      dispatch(
        actions.auth(email, firstname, password, confirmPassword, isSignup)
      ),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
    onChangeIsSignup: () => dispatch(actions.changeIsSignup())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);

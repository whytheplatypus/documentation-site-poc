"use strict";

let React = SwaggerUIBundle({}).React
// Create the layout component
class OperationsLayout extends React.Component {
  //let propTypes = {
  //  "specActions": PropTypes.object.isRequired,
  //  "specSelectors": PropTypes.object.isRequired,
  //  "authActions": PropTypes.object.isRequired,
  //  "authSelectors": PropTypes.object.isRequired,
  //  "getComponent": PropTypes.func.isRequired,
  //}

  render() {
    console.debug(this.props)
    const { authActions, authSelectors, specSelectors, getComponent} = this.props

    const securityDefinitions = specSelectors.securityDefinitions()
    const authorizableDefinitions = authSelectors.definitionsToAuthorize()


    const Operations = getComponent("authorizationPopup", true)

    let auth_props = {
        "onClick": function() {authActions.showDefinitions(authorizableDefinitions)},
        "isAuthorized":!!authSelectors.authorized().size,
        "showPopup":!!authSelectors.shownDefinitions(),
        "getComponent":getComponent,
    }

    //return React.createElement("div", {"key": "test"}, showPopup && React.createElement(Operations, auth_props));
    return React.createElement("div", {
        className: "auth-wrapper"
      }, React.createElement("button", {
        className: auth_props.isAuthorized ? "btn authorize locked" : "btn authorize unlocked",
        onClick: auth_props.onClick
      }, React.createElement("span", null, "Authorize"), React.createElement("svg", {
        width: "20",
        height: "20"
      }, React.createElement("use", {
        href: auth_props.isAuthorized ? "#locked" : "#unlocked",
        xlinkHref: auth_props.isAuthorized ? "#locked" : "#unlocked"
      }))), auth_props.showPopup && React.createElement(Operations, null));

  }
}

// Create the plugin that provides our layout component
const OperationsLayoutPlugin = function() {
  return {
    "components": {
      "OperationsLayout": OperationsLayout,
    }
  }
}

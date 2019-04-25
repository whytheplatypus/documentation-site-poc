"use strict";

let React = SwaggerUIBundle({}).React
// Create the layout component
class AuthsLayout extends React.Component {

  render() {
    const { authSelectors, authActions, getComponent, errSelectors, specSelectors, fn: { AST = {} } } = this.props

    const authorizableDefinitions = authSelectors.definitionsToAuthorize()
    authActions.showDefinitions(authorizableDefinitions)
    let definitions = authSelectors.shownDefinitions()

    const Auths = getComponent("auths")

    let auths = definitions.valueSeq().map(function(x, y) {
        let auth_props = {
            "key": y,
            "AST": AST,
            "definitions": x,
            "getComponent":getComponent,
            "errSelectors": errSelectors,
            "authSelectors": authSelectors,
            "authActions": authActions,
            "specSelectors": specSelectors,
        }

        return React.createElement(Auths, auth_props);
    })

    return React.createElement("div", { className: "auth-wrapper" }, auths);
  }
}

// Create the plugin that provides our layout component
const OpenAPILayoutPlugin = function() {
  return {
    "components": {
      "AuthsLayout": AuthsLayout,
    }
  }
}

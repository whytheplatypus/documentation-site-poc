"use strict";

let React = SwaggerUIBundle({}).React
let Im = SwaggerUIBundle({}).Im
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

        return React.createElement("div", { className: "auth-wrapper swagger-ui" }, auths);
    }
}

class EndpointLayout extends React.Component {

    render() {
        const { authSelectors, authActions, getComponent, getConfigs, errSelectors, specSelectors, fn: { AST = {} } } = this.props
        let ops = specSelectors.operations()
        const desired_path = getConfigs().custom.path

        const Operations = getComponent("operations", true)
        const OperationContainer = getComponent("OperationContainer", true)
        let operations = ops.map(function(op) {
            const path = op.get("path")
            const method = op.get("method")
            const specPath = Im.List(["paths", path, method])

            if (path == desired_path) {
                return React.createElement(OperationContainer,
                    {
                        "key": `${path}-${method}`,
                        "specPath": specPath,
                        "op": op,
                        "path": path,
                        "method": method,
                        //"tag": tag,
                    })
            }
        })


        return React.createElement("div", null, operations);
    }
}

// Create the plugin that provides our layout component
const OpenAPILayoutPlugin = function() {
    return {
        "components": {
            "AuthsLayout": AuthsLayout,
            "EndpointLayout": EndpointLayout,
        }
    }
}

"use strict";

let React = SwaggerUIBundle({}).React
let Im = SwaggerUIBundle({}).Im
// Create the layout component
class AuthsLayout extends React.Component {

    render() {
        const { authSelectors, authActions, errActions, getConfigs, getComponent, errSelectors, specSelectors, fn: { AST = {} } } = this.props

        const authorizableDefinitions = authSelectors.definitionsToAuthorize()
        authActions.showDefinitions(authorizableDefinitions)
        const desired_flow = getConfigs().custom.flow
        let definitions = authSelectors.shownDefinitions().map(
			schema => {
				return schema.get("OAuth2")
			})
		let authorized = authSelectors.authorized()

        const Auths = getComponent("oauth2", true)
		let auths = definitions.filter( schema => {
			return schema.get("type") === "oauth2"
		}).filter( schema => {
			return schema.get("flow") === desired_flow
		}).map( (schema, name) => {
			console.debug(schema)
			let auth_props = {
				"authorized": authorized,
				"schema": schema,
				//"name": name,
				"getComponent": getComponent,
				"authSelectors": authSelectors,
				"authActions": authActions,
				"errSelectors": errSelectors,
				"specSelectors": specSelectors,
				"errActions": errActions,
				"getConfigs": getConfigs,
			}
			console.debug(auth_props)

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

(function () {
	function initAccessToken() {
		let token_spans = document.getElementsByClassName("access-token")
		console.debug(token_spans)
		let tkn = localStorage.getItem('token')
		for (var i = 0; i < token_spans.length; i++) {
			console.debug(token_spans[i])
			token_spans[i].innerText = tkn
		}
	}
	window.addEventListener('DOMContentLoaded', initAccessToken);
}())

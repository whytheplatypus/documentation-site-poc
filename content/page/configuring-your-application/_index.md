---
title: "Configuring Your Application"
date: 2019-04-25T11:10:26-04:00
draft: true
---

## Authorization

To authorize an app to use the Blue Button 2.0 API a developer must register their application in the Blue Button 2.0 Developer Sandbox. For authorization, Blue Button uses OAuth 2.0. If you're unfamiliar with OAuth 2.0, their website has a large amount of helpful resources, but our documentation will also guide you along the way.

Once you've created your account in the Developer Sandbox, follow the prompts to register a new application. On the application registration screen, enter your application information to complete the registration process.

*Note: If you are unsure about some of the fields in the application registration screen, simply add placeholder details in the form - you can always edit this information later.*

**Client ID and Secret**

Once you've registered your application in the Developer Sandbox, your app is given a client ID and a client secret - these are your app's credentials for accessing the API.

There are two methods for authorization that are typically used:

  - Confidential
  - Implicit

**Which authorization flow should be used?**

If your application credentials can be kept confidential, for example in a server-based process the confidential authorization can be used.

In the case of a mobile application or browser-based application where the credentials can't be kept confidential the Implicit Authorization should be used.

Depending on the type of app you are building, your client ID and secret could go in different areas and should simply follow best practices for keeping them secure in your application.

**Confidential Authorization**

This authorization `issues` a refresh token which allows an application to return at a later date and acquire a new access token if the current access token has expired. To use this method set the Client Type and Authorization Grant Type as follows:

| Client Type   | Authorization Grant Type
| ------------- |-------------------------|
| Confidential  | Authorization Code      |

**Implicit Authorization**

This authorization does not issue a refresh token when the access token is issued. This requires the beneficiary to re-authorize the application once an access token expires. To use this method set the Client Type and Authorization Grant Type as follows:

| Client Type   | Authorization Grant Type
| ------------- |-------------------------|
| Public        | Implicit                |

## Setting Up an Application

Let's move on to setting up your application - the process is slightly different for web applications versus mobile applications. First let's take look at the component parts.

  1. Setup your Application Key and secret as variables so that they can be replaced easily via a settings file
  2. Connect to the Blue Button 2.0 API. In the sandbox the entry point for this will be https://sandbox.bluebutton.cms.gov/v1/
  3. Setup a `url` in your application to receive responses from the Blue Button 2.0 Authorization API. This is usually referred to as the `redirect_uri`. In production this would use `https://` but in the sandbox you can use `http://` to make it easier to setup for testing. 
  4. Capture the refresh and access tokens that may come back to your `redirect_uri`

## Setting Up a Web App

### Redirect_URI

When creating an Application in the sandbox a redirect URI is required. This is the API endpoint on your system that receives the callback from the Blue Button 2.0 API after a beneficiary is passed to the Blue Button 2.0 API to authorize your application. 

Multiple redirect URIs can be entered in the Redirect_URI field. Each entry should be separated by a space or newline.

A `Redirect_URI` follows this format:

```
URLprotocol://[sub-domain.]domain_name[:port]/path
```

**URL Protocol**

Three URL protocols are supported, depending on the purpose:

  - HTTP: `http:// protocol`
  - HTTPS: `https:// protocol`
  - Custom: `custom_url:// protocol`

**HTTP:** (`http:// protocol`)

<table>
	<thead>
		<tr>
			<th class="does-work">Sandbox</th>
			<th class="does-not-work">Production</th>
		</tr>
	</thead>
</table>

The `http://` format is only accepted in the sandbox environment. It is typically used by developers for local testing by using http://localhost/ however, any domain name can be used.  This is done to make it quicker and easier to develop and test since SSL certificates are not required.

**HTTPS:** (`https:// protocol`)

<table>
	<thead>
		<tr>
			<th class="does-work">Sandbox</th>
			<th class="does-work">Production</th>
		</tr>
	</thead>
</table>

The `https://` format is used for secure communication and is required for all applications in the production environment unless the application is using the Mobile OAuth method for handling callbacks.

**Custom:** (`custom_url:// protocol`)

<table>
	<thead>
		<tr>
			<th class="does-work">Sandbox</th>
			<th class="does-work">Production</th>
		</tr>
	</thead>
</table>

The `custom_url` protocol is used by mobile applications to handle communications directly with your application on a mobile device.

If you are using Mobile OAuth support for communication directly with a mobile device the `custom_url` should follow this format:

```
Top-level.domain(TLD).domain-name[.sub-domain][.app_name]
```
 
For example, if the Blue Button 2.0 team created an application we might create a custom_url of:

```
Gov.cms.bluebutton.oauthtester
```
 
This would then be incorporated into a redirect URI entry. Here is an example:

```
gov.cms.bluebutton.oauthtester:8080//bluebutton_app/callback.html
```


### Confidential Authorization Flow

To use this flow your application should be registered with `Client Type` set to `confidential` and `Grant Type` set to `authorization-code`.

**Request authorization from a user**

To allow a user to authorize your application, direct them to Blue Button’s authorize endpoint. The request must include the response_type set to code, your application’s client_id, and your application’s redirect_uri. An optional state field that your application can use to identify user making the authorization request is recommended.

```
https://sandbox.bluebutton.cms.gov/v1/o/authorize/?client_id=swBu7LWsCnIRfu530qnfPw1y5vMmER3lAM2L6rq2
    &redirect_uri=http://localhost:8080/testclient/callback
    &response_type=code
    &state=8e896a59f0744a8e93bf2f1f13230be5
```

**Exchange code for token**

After visiting the authorization page a user will be redirected back to the redirect_uri registered with your application.

For example if the `redirect_uri` is `http://localhost:8080/testclient/callback` BlueButton will redirect with this request.

```
GET http://localhost:8080/testclient/callback?code=TSjqiZCdJwGyytGjz2GzziPfHTJ6z2&state=8e896a59f0744a8e93bf2f1f13230be5
```

Your application can now exchange the code provided in the redirected request for a full token. Send a `POST` request to the BlueButton token endpoint providing the code, the application’s `client_id`, client_secret`, and `redirect_uri`. Your request must also specify the `grant_type` which should always be `authorization_code` for this flow.

```
curl -X POST "https://sandbox.bluebutton.cms.gov/v1/o/token/" \
    -u "swBu7LWsCnIRfu530qnfPw1y5vMmER3lAM2L6rq2:<client_secret>" \
    -d "code=TSjqiZCdJwGyytGjz2GzziPfHTJ6z2
	&grant_type=authorization_code
	&redirect_uri=http://localhost/testclient/callback"
```

A typical response looks like this:

```
{
	"access_token": "oQlduHNr09GKCU506GOgp8OarrAy2q",
	"expires_in": 16768.523842,
	"token_type": "Bearer",
	"scope": "profile patient/Patient.read patient/ExplanationOfBenefit.read patient/Coverage.read"
	"refresh_token": "wDimPGoA8vwXP51kie71vpsy9l17HN"
}
```

### Implicit Authorization Flow

In the OAuth2.0 specification this may also be referred to as the Client Authorization flow.

To use this flow your application should be registered with `Client Type` set to `public` and `Grant Type` set to `implicit`.

**Request authorization from a user**

To use the client application flow direct the user to the Blue Button `authorization` endpoint with the `response_type` parameter set to `token`.

```
https://sandbox.bluebutton.cms.gov/v1/o/authorize/?client_id=swBu7LWsCnIRfu530qnfPw1y5vMmER3lAM2L6rq2
    &redirect_uri=http://localhost:8080/testclient/callback
    &response_type=token
    &state=8e896a59f0744a8e93bf2f1f13230be5
```

If the user authorizes your application they will be redirected back to the `redirect_uri` of your application. The request will include an `access_token` in the fragment.

```
http://localhost:8080/testclient/callback#access_token=KCHMTX5VHNAXYGYv38eG2RLAX4hL6R
    &expires_in=35849.875807
    &token_type=Bearer
    &scope=profile+patient%2FPatient.read+patient%2FExplanationOfBenefit.read+patient%2FCoverage.read
    &state=8e896a59f0744a8e93bf2f1f13230be5
```

Below you will find a sample account you can use to test your Blue Button OAuth implementation. This account mimics a valid MyMedicare.gov account but has reduced functionality. For example, you cannot test “Forgot Password” flow.

Jane Doe Username: `BBUser29999` `Password: PW29999!`

*Note: You can in fact use any user account between BBUser00000 and BBUser29999. The password for each of these synthetic accounts follows the same pattern:*

`BBUserxxxxx` with password `PWxxxxx!` where `xxxxx` is a zero-filled number between 0 and 29999.

### Access Token Expiry

When an Access Token is issued it is valid for 10 hours. If you make a call to a FHIR resource after the Access Token expires you will receive a 401 error. If you received a Refresh Token as part of the `Confidential Authorization` flow you should use it to request a new `Access Token`. 

To get a new Access Token send a `POST` request to the same url you used to get the token in the first place `(/o/token/)`. The `grant_type` would now be `refresh_token`, and you also need to authenticate with your client credentials.
If the token request fails this would be indicative of the beneficiary revoking their access for your application.

## Setting Up a Native Mobile App

Native Mobile App Support is a new development to support the OAuth2.0 specification. It is designed specifically to support mobile apps such as for smartphones or tablets. It follows the [RFC 8252 - OAuth 2.0 for Native Apps](https://tools.ietf.org/html/rfc8252) authentication flow utilizing the Proof Key for Code Exchange ([PKCE](https://tools.ietf.org/html/rfc7636)) extension and enables a custom URI scheme redirect. In less technical terms this flow is designed to enable a mobile app to request and receive an authorization token where the RFC is designed to prevent "man in the middle" attacks. For example by another app on the smartphone intercepting the tokens that are exchanged.

The implementation of the [RFC 8252](https://tools.ietf.org/html/rfc8252) specification enables developers to build mobile applications without requiring a proxy server to route redirect calls to their mobile app.

The [PKCE](https://tools.ietf.org/html/rfc7636) extension provides a technique for public clients to mitigate the threat of a “man-in-the-middle” attack. This involves using encryption and creating a secret that is used when exchanging the authorization code to obtain an access token.

[PKCE](https://tools.ietf.org/html/rfc7636) uses a code challenge that is derived from a code-verifier. The standard supports two styles of code challenge:

  - plain
  - S256

However, Blue Button 2.0 only supports the “S256” style code challenge.

Where the:  

```
codechallenge = BASE64URL-ENCODE(SHA256(ASCII(codeverifier)))
```

The following additional parameters and values are sent as part of the OAuth2.0 Authorization Request:

  - `code_challenge`
  - `codechallengemethod = “S256”`

More details can be found about this flow on [OAuth.com](https://www.oauth.com/) ot, more specifically, in this article: [Protecting Mobile Apps with PKCE - OAuth 2.0 Servers](https://www.oauth.com/oauth2-servers/pkce/)

### Registering Your Mobile App with our API

Once you have written your code to handle the Native Mobile App handshake you will want to test it. For this you will need to setup your application's registration in the Blue Button 2.0 Developer Sandbox. To do this you must specify a unique custom URI scheme. This is a unique value that will not conflict with other custom URI schemes implemented on a user’s mobile device.

We recommend that you define your custom URI scheme using a reverse domain name notation. As we developed our own testing application, we implemented a custom URI scheme of:

```
gov.cms.bluebutton.oauthtester
```

This equated to an `oauthtester` subdomain for the [bluebutton.cms.gov](https://bluebutton.cms.gov) domain.

The reverse DNS style custom URI scheme should then be coupled with the re-direct path on the mobile device that will handle the call back from the Blue Button 2.0 API.

For example:

```
tld.app.subdomain[.subsubdomain]://callback/path/endpoint
```

A coding example of an OAuth 2.0 and PKCE flow is available here: [Authorization Code with PKCE Flow - OAuth 2.0 Playground](https://www.oauth.com/playground/authorization-code-with-pkce.html)

The Blue Button 2.0 engineering team has also created a sample Android application. You can review or fork the code here: [https://github.com/CMSgov/bluebutton-sample-client-android](https://github.com/CMSgov/bluebutton-sample-client-android)





















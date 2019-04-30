---
title: "Authorization"
date: 2019-04-23T13:41:49-04:00
testparam: "hello"
draft: true
---

## Authorization

Once you've created your account in the Developer Sandbox,
follow the prompts to register a new application.

On the [application registration screen](https://sandbox.bluebutton.cms.gov/v1/o/applications/),
enter your application information to complete the registration process.

Here's an example application configuration that allows
a synthetic beneficiary to give
this page an oauth2 authorization token.



| Name          | ClientTest01                                 |
| ---------------- | ------------------------------------------------ |
| Client Type   | public                                       |
| Grant Type    | implicit                                     |
| Redirect Uris | http://localhost:1313/article/authorization/ |



{{< openapi/auth sandbox-authorization implicit >}}

{{% openapi/authorized %}} Now you can make a [call]({{< ref "/article/first-api-call" >}}) with {{< openapi/token >}} {{% /openapi/authorized %}}

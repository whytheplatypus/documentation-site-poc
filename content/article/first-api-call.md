---
title: "First Api Call"
date: 2019-04-30T12:50:46-04:00
draft: true
---

Once an application is configured
and authorized by a beneficiary
to access their data.
It can start requesting data from BlueButton
using the _authorization token_: {{< openapi/token >}}
given to it by the beneficiary.

{{< openapi/endpoint test "/fhir/ExplanationOfBenefit" >}}

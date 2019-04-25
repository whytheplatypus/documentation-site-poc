---
title: "Developer Sandbox"
date: 2019-04-25T07:42:25-04:00
draft: true
---

Our Developer Sandbox is a test environment that has realistic claims history for 30,000 synthetic beneficiaries. This is a resource that developers can use to test their application.

To start interacting with the Blue Button 2.0 API and working with Medicare data, you'll first need to have valid credentials in our Developer Sandbox. If you are simply curious about the API and want to see what the data is like, this documentation and our Swagger UI[TODO Link to Swagger] might be all you need to find out more information.

Our Developer Sandbox is used by developers or organizations who want to build an application using Blue Button or integrate an existing app with Blue Button. Developers and organization register their applications in the Developer Sandbox and are then given a client ID and secret to allow our API to securely verify your application. Once you have those credentials, you're able to add them to your application and start making calls to the API and working with our synthetic data (sample Medicare data you can use to help build your application).

Our sandbox API allows you to authorize sharing from any of the 30,000 synthetic beneficiary accounts. You can pick any synthetic account with a `userid` in the range `BBUser00000` to `BBUser29999`. The password for each account follows the format: `PWxxxxx!` where `xxxxx` corresponds to the five digit number used in the userid.

{Need link to developer sandbox}

{Find out more about our synthetic data}

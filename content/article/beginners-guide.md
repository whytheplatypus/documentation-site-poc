---
title: "Beginners Guide"
date: 2019-04-24T14:50:23-04:00
draft: true
---

If you are new to development, healthcare, or APIs - some of this information can feel very overwhelming. We hope to provide some helpful information here to get you started.

**What is an API?**

An API (Application Programming Interface) is essentially a set of features and rules that exist inside a software program that allow other software programs to interact with it. For example, you can build an app that uses the Twitter API to get information or data from a user's Twitter account. APIs are used in a wide variety of ways, but for our purposes, you can think of an API as a pipeline that can allow users of your application to grant their consent to have their healthcare data delivered to your application.

[Read More About APIs Here](#)

**What is Blue Button Data?**

The Blue Button 2.0 API contains four years of Medicare Part A, B and D data for 53 million Medicare beneficiaries. But what does that mean?

If you're not sure what the various parts of Medicare are, here is a quick guide:
- Part A (Hospital Insurance): Part A covers inpatient hospital stays, care in a skilled nursing facility, hospice care, and some home health care.
- Part B (Medical Insurance): Part B covers certain doctors' services, outpatient care, medical supplies, and preventive services.
- Part D (Prescription Drug Coverage): Part D covers certain data on beneficiaries' prescription drug coverage.
This data reveals a variety of information about a beneficiary’s health, including the type of Medicare coverage they have, drug prescriptions, primary care treatment and cost. Using this information, you can build amazing applications and services that assist Medicare beneficiaries' ability to access and understand this data and get quality healthcare.

This data reveals a variety of information about a beneficiary’s health, including the type of Medicare coverage they have, drug prescriptions, primary care treatment and cost. Using this information, you can build amazing applications and services that assist Medicare beneficiaries' ability to access and understand this data and get quality healthcare.

**Does it matter how I make my application?**

Nope! From the beginning, Blue Button has set out to be an API based on and driven by industry-standards and best practices. Our API is RESTful (Representational State Transformation - for more information about RESTful APIs check out [https://restfulapi.net](https://restfulapi.net)). If you have developed an application that talks to some of the major Internet APIs from companies like Google, Microsoft, Facebook or Twitter you will find communication with our API very familiar. That means that regardless of the language or framework you use to create your app, if you follow the best practices outlined in this documentation, you can integrate Blue Button with your application or website. It works for native applications (like an iPhone or Android app) or web applications and websites.

There may be slight differences depending on the structure and technology you use. We try to outline some of those differences here, but you can also refer to the documentation for whatever technology you are using to build an application.

**What is OAuth2.0?**

Simply put, OAuth2.0 is an open standard for authorization. It allows a user's account information to be used by third-party services without exposing the user's user id or password. In the case of Blue Button, it allows Medicare beneficiaries to share their healthcare data with you without sharing their password. When you prompt Medicare beneficiaries to link their healthcare data to your application, they are taken through a secure process that gives them the ability to grant access to your application as an application they trust.

[For a deeper dive into OAuth2.0, visit their website.](https://oauth.net/)

**What is FHIR?**

FHIR (Fast Healthcare Interoperability Resources) is a specification for exchanging healthcare data electronically. Blue Button data is structured using the FHIR standard, making it more available, discoverable, and understandable. The healthcare industry is complicated - and as Medicare beneficiaries move around the healthcare ecosystem, it is important that their electronic healthcare data is structured consistently so that different applications, technologies, and professionals are able to deliver services and benefits consistently.

For the purpose of using Blue Button, you need to understand that our data uses the FHIR standard, so familiarity with the standard itself is going to be helpful to you. If you want to start delving into the FHIR specification you can start with our Blue Button 2.0 [FHIR Implementation Guide](https://bluebutton.cms.gov/assets/ig/index.html).

One of the things you'll need to understand about FHIR is the building blocks of this standard way of representing healthcare data. In FHIR, this basic building block is called a "Resource." All "exchangeable" data is defined as a resource, and a resource is made up of data that systems or computers can easily understand as well as a part that is more readable by humans. But why go through the trouble of structuring data this way? Like we said, healthcare data is incredibly complex. By understanding this standard for structuring data, we ensure consistency across the healthcare industry, which is ultimately in the best interest of the Medicare beneficiary. Resources express a globally applicable structure for a category of data, such as Patient. A resource has a very open set of validation criteria. Organizations or communities create Implementation Guides, just like we have done for Blue Button 2.0, that create specific profiles for these resources. The profiles may apply much tighter validation criteria for the code sets or other values that must be used. We are working with the Health Plan community in the USA to define a common implementation guide. This is helpful for developers because they can build applications to support a defined implementation guide and their application should work with any data holder that implements an API using that same implementation guide.

We try to explain the relationship between Blue Button data and the FHIR standard as we go, but don't be shy about seeking more information on your own.

[Get more information about FHIR](https://www.hl7.org/fhir/overview.html)




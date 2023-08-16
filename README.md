# pesapaljs-v3 (MAINTAINED)

[![NPM](https://nodei.co/npm/pesapaljs.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.org/package/pesapaljs-v3)

## Goal

Make it easy to integrate [PesaPal](https://www.pesapal.com) into a website or mobile app.

## Core Features
- `init(options)`: Initialize Package. `options` should contain  a `key`, a `secret` and `debug` together.

- `authenticate()`: Authenticate with pesapal servers and set bearer token.

- `register_ipn_url(options)`: Register an IPN URL, that will be used by pesapal to inform your server of any changes. `options` should contain a `url` and a `ipn_notification_type`.

- `get_ipn_list()`: Returns the list of registered IPN's

- `submit_order(options)`: Initiates an order to pesapal and returns the iframe src url. `options` should include, `id` -unique system generated id, `currency` - if KES or other, `amount`, `description`, `callback_url`  - to where the user will be redirected to on the UI, `notification_id` - unique id associated with your IPN URL, `billing_address` - an object with user details as such `{
  "email_address": "john.doe@example.com",
  "phone_number": None,
  "country_code": "",
  "first_name": "John",
  "middle_name": "",
  "last_name": "Doe",
  "line_1": "",
  "line_2": "",
  "city": "",
  "state": "",
  "postal_code": None,
  "zip_code": None
  }`

- `get_transaction_status(OPTIONS)`: Returns the status details of a transaction. `options` should include `OrderTrackingId` that you receive from the callback.

## Usage

### Install

```shell
$ npm i pesapaljs-v3
```

## Getting Started

### Initialise

```javascript

var PesaPal = require('pesapaljs-v3').init({
    key: CONSUMER_KEY,
    secret: CONSUMER_SECRET,
    debug: true // false in production!
});

```
When the `debug` option is set to `true`, `pesapaljs-v3` will use the `cybqa.pesapal.com*` endpoints. Download the test credentials for use [here](https://developer.pesapal.com/api3-demo-keys.txt). Open a live/production business account at [PesaPal](https://www.pesapal.com/dashboard/account/register) for your live/production `consumer_key` and `consumer_secret`.
    
### Authenticate with Pesapal

Pesapal merchant `consumer_key` and `consumer_secret` will be used to generate an access token. This access token is valid for a maximum period of 5 minutes.
```javascript

// Initiate an authentication with the package
PesaPal.authenticate();

```
    
### Registration of an IPN URL

When a payment is made against a transaction, Pesapal will initiate an IPN call to the notification URL associated with this transaction, which is typically located on your servers. These notifications enable you to be informed in real time whenever there is a status change for any transaction. IPN stands for Instant Payment Notification.

```javascript

var options = {
    url: "ngrok.something/ipn", 
    ipn_notification_type: "GET" 
};
PesaPal.register_ipn_url(options)
        .then(function(status){ /* do stuff*/ })
        .catch(function(error){ /* do stuff*/ });

```

An IPN is particularly crucial because it enables you to be alerted if any of the following occurs: 
  * Your client disconnects from your application during payment due to internet problems.
  * Your client encounters server errors, causing Pesapal and your application to disconnect before the callback URL is loaded.
  * Your client closes the browser during payment.
  * The transaction is rejected.

As a result, IPN must be set up so that Pesapal can alert your servers when a status changes. It's also crucial to note that this IPN URL must be made available to the public. 

You are required to register your IPN URL before sending Submit Order Requests to Pesapal API 3.0. Upon registration, you will receive a notification_id, which is a required field when sending an order request. This notification_id uniquely identifies the endpoint Pesapal will send alerts to whenever a payment status changes for each transaction processed via Pesapal API 3.0.

### List registered IPN URLs

Get every IPN URL that has been registered for a specific Pesapal merchant account.

```javascript

PesaPal.get_ipn_list()
        .then(function(status){ /* do stuff*/ })
        .catch(function(error){ /* do stuff*/ });

```
    
### Submit an order request

The request to create a payment request will come after you have received the bearer token.

A customer clicks the "Pay Now" button on your website. In this scenario, you call the `SubmitOrderRequest` method and receive a response with a payment redirect URL. You can either redirect the customer to this URL or load it as an iframe on your website if you don't want to send them away from your application.

After the customer has made the payment, they will be redirected to your callback URL, which you will have already provided to us as part of the submit order request, which will contain the payment methods presented to the customer by Pesapal.

```javascript

PesaPal.submit_order({
    "id": 231323, //generates some unique value, probably use uuid.
    "currency": "KES",
    "amount": 10,
    "description": "payment for masterclass", // transaction description
    "callback_url": "https://some.com/home", //front end URL for redirect
    "notification_id": "b3699d97-1c04-45b5-8062-de69d6dad9a1", //IPN URL
    "billing_address": {
        "email_address": "johndoe@mail.com",
        "phone_number": "",
        "country_code": "KE",
        "first_name": "John",
        "middle_name": "",
        "last_name": "Doe",
        "line_1": "",
        "line_2": "",
        "city": "",
        "state": "",
        "postal_code": "",
        "zip_code": ""
    }
})
        .then(function(status){ /* do stuff*/ })
        .catch(function(error){ /* do stuff*/ });



```

### Check transaction status

Following Pesapal's redirection of your customer to your callback URL and triggering your IPN URL, you must use the OrderTrackingId to determine the payment's status.

```javascript

PesaPal.get_transaction_status({
    OrderTrackingId:OrderTrackingId // ensure you get the spelling correct!
  })
        .then(function(status){ /* do stuff*/ })
        .catch(function(error){ /* do stuff*/ });

```

## Contributing

1. Fork this repo and make changes in your fork.
2. Commit your changes and push to your fork `git push origin master`
3. Create a new pull request and submit it back to the project.


## Bugs & Issues

To report bugs (or any other issues), use the [issues page](https://github.com/CollinsMunene/pesapaljs-v3/issues).

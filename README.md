## pesapaljs-v3 (MAINTAINED)

[![NPM](https://nodei.co/npm/pesapaljs.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.org/package/pesapaljs-v3)

### Goal

Make it easy to integrate [PesaPal](https://www.pesapal.com) into a website or mobile app.

### Core Features
- `init(options)` : Initialize Package. `options` should contain  a `key` , a `secret` and `debug` together.

- `authenticate()`: Authenticate with pesapal servers and set bearer token.

- `register_ipn_url(options)`: Register an IPN url, that will be used by pesapal to inform your server on any changes. `options` should contain a `url` and a `ipn_notification_type`.

- `get_ipn_list()`: Returns the list of registered IPN's

- `submit_order(options)`: Initiates an order to pesapal and returns the iframe src url. `options` should include, `id` -unique system generated id, `currency` - if KES or other, `amount`,`description`,`callback_url`  - to where the user will be redirected to on the UI , `notification_id` - unique id associated with yout IPN url, `billing_address` - an object with user details as such `{
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

- `get_transaction_status(oPTIONS)`: Returns the status details of a trasaction. `options` should include `OrderTrackingId` that you receives from the callback.

### Usage

###### Install

```shell
$ npm i pesapaljs-v3
```

###### Setup
```javascript

var PesaPal = require('pesapaljs-v3').init({
    key: CONSUMER_KEY,
    secret: CONSUMER_SECRET,
    debug: true // false in production!
});

```
When the `debug` option is set, `pesapaljs-v3` will use the `cybqa.pesapal.com*` endpoints.
    
###### Authenticate with pesapal
```javascript

// initiate an authentication with the package
PesaPal.authenticate();

```
    
###### POST an IPN url
```javascript

var options = {
    url: "ngrok.something/ipn", 
    ipn_notification_type: "GET" 
};
PesaPal.register_ipn_url(options)
        .then(function(status){ /* do stuff*/ })
        .catch(function(error){ /* do stuff*/ });

```

###### GET registered IPN list
```javascript

PesaPal.get_ipn_list()
        .then(function(status){ /* do stuff*/ })
        .catch(function(error){ /* do stuff*/ });

```
    
###### POST an order request
```javascript

PesaPal.submit_order({
    "id": 231323, //generate some unique value, probably use uuid.
    "currency": "KES",
    "amount": 10,
    "description": "payment for masterclass", // transaction description
    "callback_url": "https://some.com/home", //front end url for redirect
    "notification_id": "b3699d97-1c04-45b5-8062-de69d6dad9a1", //IPN url
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

###### GET transaction status 
```javascript

PesaPal.get_transaction_status({
    OrderTrackingId:OrderTrackingId // ensure you get the spelling correct!
  })
        .then(function(status){ /* do stuff*/ })
        .catch(function(error){ /* do stuff*/ });

```

### Contributing

1. Fork this repo and make changes in your own fork.
2. Commit your changes and push to your fork `git push origin master`
3. Create a new pull request and submit it back to the project.


### Bugs & Issues

To report bugs (or any other issues), use the [issues page](https://github.com/CollinsMunene/pesapaljs-v3/issues).

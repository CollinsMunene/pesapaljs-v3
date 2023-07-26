const requests = require("requests");

var AUTHENTICATION_URL = null;
var REGISTER_IPN_URL = null;
var GET_IPN_URL = null;
var SUBMIT_ORDER_URL = null;
var GET_TRANSACTION_STATUS = null;

var DEBUG = false;

var CONSUMER_KEY = null;
var CONSUMER_SECRET = null;

var BEARER_TOKEN = "";

/**
 * Setup the module
 * @param key
 * @param secret
 * @param debug
 */
exports.setup = function (key, secret, debug) {
  DEBUG = debug;

  CONSUMER_KEY = key;
  CONSUMER_SECRET = secret;

  AUTHENTICATION_URL = DEBUG
    ? "https://cybqa.pesapal.com/pesapalv3/api/Auth/RequestToken"
    : "https://pay.pesapal.com/v3/api/Auth/RequestToken";

  REGISTER_IPN_URL = DEBUG
    ? "https://cybqa.pesapal.com/pesapalv3/api/URLSetup/RegisterIPN"
    : "https://pay.pesapal.com/v3/api/URLSetup/RegisterIPN";

  GET_IPN_URL = DEBUG
    ? "https://cybqa.pesapal.com/pesapalv3/api/URLSetup/GetIpnList"
    : "https://pay.pesapal.com/v3/api/URLSetup/GetIpnList";

  SUBMIT_ORDER_URL = DEBUG
    ? "https://cybqa.pesapal.com/pesapalv3/api/Transactions/SubmitOrderRequest"
    : "https://pay.pesapal.com/v3/api/Transactions/SubmitOrderRequest";

  GET_TRANSACTION_STATUS = DEBUG
    ? "https://cybqa.pesapal.com/pesapalv3/api/Transactions/GetTransactionStatus"
    : "https://pay.pesapal.com/v3/api/Transactions/GetTransactionStatus";

  if (DEBUG) {
    require("request-debug")(request);
  }
};

/**
 * Setup the module
 */
exports.authenticate = function () {
  payload = JSON.stringify({
    consumer_key: CONSUMER_KEY,
    consumer_secret: CONSUMER_SECRET,
  });
  headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  response = requests.request(
    "POST",
    AUTHENTICATION_URL,
    (headers = headers),
    (data = payload)
  );

  console.log(response);

  BEARER_TOKEN = JSON.parse(response).json.token;

  return response.json;
};

/**
 * Setup IPN url
 * @params url
 * @params ipn_notification_type
 */
exports.registerIPNurl = function (url,ipn_notification_type) {
    payload = JSON.stringify({
        url: ipn_notification_type,
        ipn_notification_type: ipn_notification_type,
    });
    headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Authorization":"Bearer "+BEARER_TOKEN
    };
  
    response = requests.request(
      "POST",
      REGISTER_IPN_URL,
      (headers = headers),
      (data = payload)
    );
  
    console.log(response);
    
    return JSON.parse(response);
  };
  
  /**
 * Get IPN list
 */
exports.getIPNurl = function () {
    payload = {};
    headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Authorization":"Bearer "+BEARER_TOKEN
    };
  
    response = requests.request(
      "GET",
      GET_IPN_URL,
      (headers = headers),
      (data = payload)
    );
  
    console.log(response);
    
    return JSON.parse(response);
  };

  /**
 * Setup IPN url
 * @params url
 * @params id
 * @params currency
 * @params amount
 * @params description
 * @params callback_url
 * @params notification_id
 * @params billing_address {@params email_address, @params phone_number,@params country_code,@params first_name, @params middle_name,@params last_name,
  @params line_1,@params line_2,@params city,@params state,@params postal_code,@params zip_code }
 */
exports.SubmitOrder = function (options) {
    // {
    //     "id": "TEST1515111110",
    //     "currency": "KES",
    //     "amount": 100,
    //     "description": "Payment description goes here",
    //     "callback_url": "https://www.myapplication.com/response-page",
    //     "notification_id": "fe078e53-78da-4a83-aa89-e7ded5c456e6",
    //     "billing_address": {
    //       "email_address": "john.doe@example.com",
    //       "phone_number": None,
    //       "country_code": "",
    //       "first_name": "John",
    //       "middle_name": "",
    //       "last_name": "Doe",
    //       "line_1": "",
    //       "line_2": "",
    //       "city": "",
    //       "state": "",
    //       "postal_code": None,
    //       "zip_code": None
    //     }
    //   }
    payload = JSON.stringify(options)
      headers = {
        'Content-Type': 'application/json',
        Accept: "application/json",
        "Authorization":"Bearer "+BEARER_TOKEN
      }
      
      response = requests.request("POST", SUBMIT_ORDER_URL, headers=headers, data=payload)
      
      return JSON.parse(response);
  };
  

/**
 * Get transaction status
 */
exports.getTransactionStatus = function (options) {
    payload = {};
    headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Authorization":"Bearer "+BEARER_TOKEN
    };
  
    response = requests.request(
      "GET",
      GET_TRANSACTION_STATUS +"?orderTrackingId="+options.orderTrackingId
      (headers = headers),
      (data = payload)
    );
  
    console.log(response);
    
    return JSON.parse(response);
  };
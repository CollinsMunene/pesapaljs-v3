var core = require("./internal/core");


/**
 * Init the module
 * @param options {{debug: boolean, key: string, secret: string}}
 */
exports.init = function (options) {
  options = options || {};

  if (!options.key || !options.secret)
    throw new Error("Need to specify both consumer key and secret");

  var debug = options.debug || false;
  core.setup(options.key, options.secret, debug);

  return core.authenticate();
};

exports.register_ipn_url = function (options) {
    options = options || {};
  
    if (!options.url || !options.ipn_notification_type)
      throw new Error("Need to specify both IPN url and IPN notification type");
  
    
    return core.registerIPNurl(options.url, options.ipn_notification_type);
  };

  exports.get_ipn_list = function (options) {
    options = options || {};
  
    if (!options.url || !options.ipn_notification_type)
      throw new Error("Need to specify both IPN url and IPN notification type");
  
    
    return core.getIPNurl();
  };

  exports.submit_order = function (options) {
    options = options || {};
  
    if (!options.id || !options.currency ||  !options.amount || !options.description || !options.callback_url || !options.notification_id || !options.billing_address)
      throw new Error("Need to specify all required fields || refer to pesapl v3 documentation");
  
    
    return core.SubmitOrder(options);
  };
  
  exports.get_transaction_status = function (options) {
    options = options || {};
  
    if (!options.orderTrackingId)
      throw new Error("Need to specify the order tracking id");
  
    
    return core.getTransactionStatus(options);
  };
  
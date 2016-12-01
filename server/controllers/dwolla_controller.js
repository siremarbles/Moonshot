var dwolla = require('dwolla-v2');

var client = new dwolla.Client({
	  id: process.env.DWOLLA_ID,
	  secret: process.env.DWOLLA_SECRET,
	  environment: 'sandbox',
});

var requestBody = {
	  firstName: 'Jane',
	  lastName: 'Merchant',
	  email: 'jmerchant@nomail.net',
	  ipAddress: '99.99.99.99'
};

accountToken
  .post('customers', requestBody)
  .then(function(res) {
	      res.headers.get('location'); // => 'https://api-uat.dwolla.com/customers/c7f300c0-f1ef-4151-9bbe-005005aa3747'
	    });

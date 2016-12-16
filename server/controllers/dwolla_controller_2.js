var dwolla = require('dwolla-v2');

var client = new dwolla.Client({id: "flcIuRqKniAVIyMDHlteQNqgAFbxuSg1HsblqQJO0MsyqYCTxG", secret: "3ekSYYOdAFyiYwTzaYzJ6lHnCjAuwbRmEQENBLShSw5Strzhjy"});

var accountToken = new client.Token({access_token: "MN7jVOgxXw1fiVSpN9nlagbMAcL1gXFimIfkN8hs9oS6Qh4iUK"});

var requestBody = {
  _links: {
    source: {
      href: 'https://api-uat.dwolla.com/funding-sources/118b08b9-e1eb-48b7-94ad-866989b0764e'
    },
    destination: {
      href: 'https://api-uat.dwolla.com/funding-sources/2fa64102-185d-443d-9001-dda9bc37651d'
    }
  },
  amount: {
    currency: 'USD',
    value: '1.00'
  }
};

// accountToken
//   .post('transfers', requestBody)
//   .then(function(res) {
//     res.headers.get('location'); // => 'https://api-uat.dwolla.com/transfers/74c9129b-d14a-e511-80da-0aa34a9b2388'
// 		//console.log(requestBody)
//   });


	 var request = require("request");
	//
	// var options = { method: 'POST',
	//   url: 'https://api-uat.dwolla.com/transfers',
	//   headers:
	//    { //'postman-token': '21f95dbc-6e9d-6699-cb0b-bb273ee55b10',
	//      'cache-control': 'no-cache',
	//      'idempotency-key': '463224c4-2108-4255-9b71-9a36bb172afb',
	//      'content-type': 'application/json',
	//      authorization: 'Bearer MN7jVOgxXw1fiVSpN9nlagbMAcL1gXFimIfkN8hs9oS6Qh4iUK',
	//      accept: 'application/vnd.dwolla.v1.hal+json' } };
	//
	//
	//
	// request(options, function (error, response, requestBody) {
	//   if (error) throw new Error(error);
	//
	//   console.log(response);
	// });



/*
must get an acces token and then save that access token to access dwolla

*/

exports.getDwollaAccessToken = function(req, res, next){
  var request = require("request");

var options = { method: 'POST',
  url: 'https://uat.dwolla.com/oauth/v2/token',
  headers:
   { 'content-type': 'application/x-www-form-urlencoded',
     //'postman-token': 'f1ec54cd-75df-c573-8c67-6fe8c17d4449',
     'cache-control': 'no-cache' },
  form:
   { client_id: 'flcIuRqKniAVIyMDHlteQNqgAFbxuSg1HsblqQJO0MsyqYCTxG',
     client_secret: '3ekSYYOdAFyiYwTzaYzJ6lHnCjAuwbRmEQENBLShSw5Strzhjy',
     code: '',
     grant_type: 'client_credentials',
     redirect_uri: 'localhost:8080' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  res.send(response);
  console.log(body);
});

}

exports.getDwollaRoot = function(req, res, next) {
var root = { method: 'GET',
  url: 'https://api-uat.dwolla.com/',
  headers:
   { //'postman-token': 'd670e1c2-7cbb-2117-eebf-225183f7e457',
     'cache-control': 'no-cache',
     authorization: 'Bearer cDMzTYGtl5bdQhbV0WFpfwRPJGrvg9hqsrAYq3bjaiB9mhhFrt',
     accept: 'application/vnd.dwolla.v1.hal+json' } };

request(root, function (error, response) {
  if (error) throw new Error(error);
  res.send(response);

  console.log(response);
});
}


//create user or customer
exports.createDwollaUser = function(req, res, next) {
var options = { method: 'POST',
  url: 'https://api-uat.dwolla.com/customers',
  headers:
   { //'postman-token': '2b458de8-b072-a131-af48-7cb63950e3e6',
     'cache-control': 'no-cache',
     authorization: 'Bearer cDMzTYGtl5bdQhbV0WFpfwRPJGrvg9hqsrAYq3bjaiB9mhhFrt',
     'content-type': 'application/json',
     accept: 'application/vnd.dwolla.v1.hal+json' } };

var customerbody = {
    "firstName": req.user.name.firstName, //take a firstname argument
    "lastName": req.user.name.lastname, //take a last name argument
    "email": req.user.email, //take an email argument
    "ipAddress": "143.156.7.8"  //need to get users ip address and put it here
}

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  res.send(response);

  console.log(response);
});
}

//charge customer
exports.chargeDwolla = function(req, res, next) {
var options = { method: 'POST',
  url: 'https://api-uat.dwolla.com/transfers',
  headers:
   { //'postman-token': 'dff729e7-f40a-ccbe-3436-2be5f23d61fe',
     'cache-control': 'no-cache',
     'idempotency-key': '4d7505ff-4d83-409b-88ef-486a7af9f588',
     'content-type': 'application/json',
     authorization: 'Bearer cDMzTYGtl5bdQhbV0WFpfwRPJGrvg9hqsrAYq3bjaiB9mhhFrt',
     accept: 'application/vnd.dwolla.v1.hal+json' } };

	var body =  {
    "_links": {
        "source": {
            "href": "http://api-uat.dwolla.com/funding-sources/{{VCRBalanceFundingSourceId}}" //this is the custonmers funding source
        },
        "destination": {
            "href": "http://api-uat.dwolla.com/funding-sources/{{CRFundingSourceId}}" //this will be our account
        }
    },
    "amount": {
        "currency": "USD",
        "value": "42.00"  // take a input value based on what membership teir they are
    },
    "metadata": {
        "foo": "bar"
    }
}

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(response);
});
}

//pull request for funds. In this case we would be depositing funds to user
//charge customer
exports.pullDwolla = function(req, res, next) {
var options = { method: 'POST',
  url: 'https://api-uat.dwolla.com/transfers',
  headers:
   { //'postman-token': 'dff729e7-f40a-ccbe-3436-2be5f23d61fe',
     'cache-control': 'no-cache',
     'idempotency-key': '4d7505ff-4d83-409b-88ef-486a7af9f588',
     'content-type': 'application/json',
     authorization: 'Bearer cDMzTYGtl5bdQhbV0WFpfwRPJGrvg9hqsrAYq3bjaiB9mhhFrt',
     accept: 'application/vnd.dwolla.v1.hal+json' } };

	var body =  {
    "_links": {
        "source": {
            "href": "http://api-uat.dwolla.com/funding-sources/{{VCRBalanceFundingSourceId}}" //this will be our account
        },
        "destination": {
            "href": "http://api-uat.dwolla.com/funding-sources/{{CRFundingSourceId}}" //this will be customers account
        }
    },
    "amount": {
        "currency": "USD",
        "value": "42.00"  // take a input value based on what membership teir they are
    },
    "metadata": {
        "foo": "bar"
    }
}


request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(response);
});
}

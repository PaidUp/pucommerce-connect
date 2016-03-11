'use strict'

module.exports = {


  friendlyName: 'Redeem Coupon',


  description: 'Redeem a coupon discount',


  cacheable: false,


  sync: false,

  inputs: {
    baseUrl : {
      example : 'http://localhost:9002',
      description : 'Url microservice.',
      required : true
    },
    token : {
      example : 'secret-word',
      description : 'secret word for authenticate microservice.',
      required : true
    },
    coupon : {
      example: 'NEWDISCOUNTCOUPON',
      description : 'It is a object that contain the key value to filters the coupons',
      required : true
    },
    productId : {
      example: 'Id1',
      description : 'It is a object that contain the key value to filters the list coupons. if you want a complete list os coupon send a empty object {}',
      required : true
    }

  },


  exits: {

    success: {
      _id: 'NEWDISCOUNTCOUPON',
      percent: 10
    }
  },


  fn: function(inputs, exits
    /**/
  ) {
    let Connector  = require('../core/common/connector');

    let config = {
      url: '/api/v1/commerce/coupon/redeem',
      baseUrl: inputs.baseUrl,
      method: 'post',
      token : inputs.token//'tdcommerce-secret'
    }
    let body = {
      coupon: inputs.coupon,
      productId: inputs.productId
    }

    Connector.request(config, {}, body, function(err, resp){
      if(err){
        return exits.error(err);
      }else{
        return exits.success(resp);
      }
    });
  },
};
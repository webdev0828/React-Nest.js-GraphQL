// // import models from '../app/models/schema';
// var models = require('../src/app/models/schema').default;
// var sinon = require('sinon');
// var chai = require('chai');
// var expect = chai.expect;
// // var mongoose = require('mongoose');
// require('sinon-mongoose');
//
// //Importing our todo model for our unit testing.
// var RestaurantModel = models['Restaurant'];
// var MenuModel = models['Menu'];
//
// describe('Get All Restaurants', function() {
//   it('should return all restaurants', function(done) {
//     var RestaurantMock = sinon.mock(RestaurantModel);
//     var expectedResult = { status: true, name: [] };
//     // RestaurantMock.expects('find').yield(null,expectedResult)
//     RestaurantModel.find({}, function(err, r) {
//       console.log('err ', err);
//       console.log('res', r);
//
//     });
//     done(5000);
//
//   });
// });

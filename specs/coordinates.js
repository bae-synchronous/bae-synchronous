var helper = require('../server/helper');
var coordinates = require('../server/coordinates');
var thirdPoint = require('../server/thirdPoint');
var dummy = require('../server/dummyData');

var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

describe('Helper Functions:', function() {

  describe('#replaceEmptySpaces()', function() {
    it("should replace empty spaces with '+'", function() {
        var address_string = dummy.address1.address;
        converted_address_string = helper.replaceEmptySpaces(address_string),
        expected_address_string = '50+Murray+Street,+Pyrmont';
        expect(converted_address_string).to.equal(expected_address_string);
    });
  });

  describe('#stringifyCoordinates()', function() {
    it("should concatinate coordinates and return a string", function() {
        expect(helper.stringifyCoordinates(dummy.address1.coordinates)).to.equal('-33.870353,151.197892');
    });
  });
});

describe('Third Point Formulas:', function() {

  describe.skip('#getThirdPoint()', function() {
    it("returns a third point (currently implements midpoint formula)", function() {
      var coordinates1 = dummy.address1.coordinates;
      var coordinates2 = dummy.address2.coordinates;
      console.log(coordinates1,coordinates2,calculateThirdPoint)
      var calculateThirdPoint = thirdPoint.getThirdPoint(coordinates1,coordinates2)
      expect(calculateThirdPoint).to.equal(dummy.thirdPoint.coordinates);
    });
  });

  describe.skip('#findMidpoint()', function() {
    it("should calculate the midpoint for two sets of coordinates", function() {
      var coordinates1 = dummy.address1.coordinates;
      var coordinates2 = dummy.address2.coordinates;
      expect(thirdPoint.getThirdPoint(coordinates1,coordinates2)).to.equal(dummy.thirdPoint.coordinates);
    });
  });
});

describe('Google API Calls:', function() {

  describe.skip('#getCoordinates()', function() {
    it('Google Geocoding API "GET" Request address return geographic coordinates for valid address', function() {
      return expect(coordinates.getCoordinates(dummy.address1.address)).to.eventually.equal(dummy.address1.coordinates);
    });
  });

  describe.skip('#getCoordinates()', function() {
    it('Google Geocoding API "GET" Request should return error message for invalid address', function() {
      return expect(coordinates.getCoordinates(dummy.address2.address)).to.eventually.equal('enter a valid address');
    });
  });

  describe.skip('#getCoordinatesForEachAddress()', function() {
    it('Google Geocoding API "GET" Request should return error message for invalid address', function() {
      return expect(coordinates.getCoordinatesForEachAddress(dummy.address1.address,dummy.address2.address)).to.eventually.equal({ lat: 25.4224497, lng: -121.0840329 });
    });
  });

  describe.skip('#getPlaces()', function() {
    it('Google Places API "GET" Request should return a list of places for valid coordinates', function() {
      return expect(coordinates.getPlaces(dummy.thirdPoint.coordinates,dummy.radius,dummy.category)).to.eventually.equal([]);
    });
  });

  describe.skip('#getPlaces()', function() {
    it('If Google API "GET" Request returns an empty array, return a message to client describing invalid address', function() {
      return expect(coordinates.getPlaces(dummy.thirdPoint.coordinates,dummy.radius,dummy.category)).to.eventually.equal({ lat: 25.4224497, lng: -121.0840329 });
    });
  });
});


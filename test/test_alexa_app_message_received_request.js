/*jshint expr: true*/
"use strict";
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var mockHelper = require("./helpers/mock_helper");
chai.use(chaiAsPromised);
var expect = chai.expect;
chai.config.includeStack = true;

describe("Alexa", function() {
  var Alexa = require("../index");
  describe("app", function() {
    var app = new Alexa.app("myapp");
    describe("#request", function() {
      describe("response", function() {
        var mockRequest = mockHelper.load("intent_request_message_received.json");

        context("with an intent request of messageReceived", function() {
          context("with no messageReceived handler", function() {
            var app = new Alexa.app("myapp");
            var subject = app.request(mockRequest);
            describe("messageReceived", function() {
              subject.catch(function(err) {
                return err;
              });
              it("responds with a failed promise", function() {
                return expect(subject).to.eventually.be.rejected;
              });
            });
          });

          context("with a messageReceived handler", function() {
            var app = new Alexa.app("myapp");
            app.messageReceived(function(request,response) {
                response.send();
            });
            var subject = app.request(mockRequest);
            describe("messageReceived", function() {
                subject.then();
                return expect(subject).to.eventually.be.fulfilled;
            });
          });
        });
      });
    });
  });
});

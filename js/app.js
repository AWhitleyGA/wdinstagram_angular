"use strict";

(function(){
angular
  .module("wdinstagram", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    RouterFunction
  ])
  .controller("GramIndexController", [
    "GramFactory",
    GramIndexControllerFunction
  ])
  .controller("GramNewController", [
    "GramFactory",
    "$state",
    GramNewControllerFunction
  ])
  .factory("GramFactory", [
    "$resource",
    GramFactoryFunction
  ])

  function GramFactoryFunction($resource) {
    return $resource("http://localhost:3000/entries")
  }

  function GramIndexControllerFunction(GramFactory) {
    this.grams = GramFactory.query()
    this.display = console.log(this.grams)
  }

  function GramNewControllerFunction(GramFactory, $state) {
    this.gram = new GramFactory()
    this.create = function() {
      GramFactory.save(this.gram, function() {
        $state.go("gramIndex")
      })
    }
  }

  function RouterFunction($stateProvider) {
    $stateProvider
    .state("gramIndex", {
      url: "/grams",
      templateUrl: "js/ng-views/index.html",
      controller: "GramIndexController",
      controllerAs: "vm"
    })
    .state("gramNew", {
      url: "/grams/new",
      templateUrl: "js/ng-views/new.html",
      controller: "GramNewController",
      controllerAs: "vm"
    })
  }

})();

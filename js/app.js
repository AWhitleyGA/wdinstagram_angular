"use strict";

// (function(){
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
  .controller("GramShowController", [
    "GramFactory",
    "$stateParams",
    GramShowControllerFunction
  ])
  .factory("GramFactory", [
    "$resource",
    GramFactoryFunction
  ])

  function GramFactoryFunction($resource) {
    return $resource("http://localhost:3000/entries/:id")
  }

  function GramIndexControllerFunction(GramFactory) {
    this.grams = GramFactory.query()
    this.display = console.log(this.grams)
  }

  function GramNewControllerFunction(GramFactory, $state) {
    this.gram = new GramFactory()
    this.create = function() {
      GramFactory.save(this.gram, () => {
        $state.go("gramIndex")
      })
    }
  }

  function GramShowControllerFunction(GramFactory, $stateParams) {
    this.gram = GramFactory.get({id: $stateParams.id})
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
    .state("gramShow", {
      url: "/grams/:id",
      templateUrl: "js/ng-views/show.html",
      controller: "GramShowController",
      controllerAs: "vm"
    })
  }

// })();

'use strict';

describe('Controller: MentorsOnlineCtrl', function () {

  // load the controller's module
  beforeEach(module('pflagUiApp'));

  var MentorsOnlineCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MentorsOnlineCtrl = $controller('MentorsOnlineCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MentorsOnlineCtrl.awesomeThings.length).toBe(3);
  });
});

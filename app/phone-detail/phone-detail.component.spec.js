describe('phoneDetail', function() {

    // Load the module that contains the 'phoneDetail' component before each test
    beforeEach(module('phoneDetail'));

    // Test the controller
    describe('PhoneDetailController', function() {
        var $httpBackend, ctrl;
        var xyzPhoneData = {
            name: 'phone xyz',
            images: ['image/url1.png', 'image/url2.png']
        };

        // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
        // This allows us to inject a service and assign it to a variable with the same name
        // as the service while avoiding a name conflict.
        beforeEach(inject(function($componentController, _$httpBackend_, $routeParams) {
            $httpBackend = _$httpBackend_;
            // train the $httpBackend service to expect an incoming HTTP request 
            // and what the response will be
            $httpBackend.expectGET('phones/xyz.json')
                        .respond(xyzPhoneData);

            $routeParams.phoneId = 'xyz';
            
            ctrl = $componentController('phoneDetail');

            // Override Jasmine's standard .toEqual() matcher.
            // It will compare a Resource() object with a plain JS object and it will decide they respresent the same value.
            // angular.equals ignores functions and $-prefixed properties, such as those added by the $resource service.
            jasmine.addCustomEqualityTester(angular.equals);
        }));
        
        it('should fetch the phone details', function() {
            // the responses are not returned until we call flush()
            $httpBackend.flush();
            expect(ctrl.phone).toEqual(xyzPhoneData);
        });
    });
});
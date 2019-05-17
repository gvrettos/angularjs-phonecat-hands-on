describe('phoneDetail', function() {

    // Load the module that contains the 'phoneDetail' component before each test
    beforeEach(module('phoneDetail'));

    // Test the controller
    describe('PhoneDetailController', function() {
        var $httpBackend, ctrl;

        // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
        // This allows us to inject a service and assign it to a variable with the same name
        // as the service while avoiding a name conflict.
        beforeEach(inject(function($componentController, _$httpBackend_, $routeParams) {
            $httpBackend = _$httpBackend_;
            // train the $httpBackend service to expect an incoming HTTP request 
            // and what the response will be
            $httpBackend.expectGET('phones/xyz.json')
                        .respond({name: 'phone xyz'});

            $routeParams.phoneId = 'xyz';
                        
            ctrl = $componentController('phoneDetail');
        }));
        
        it('should fetch the phone details', function() {
            expect(ctrl.phone).toBeUndefined();

            // the responses are not returned until we call flush()
            $httpBackend.flush();
            expect(ctrl.phone).toEqual({name: 'phone xyz'});
        });
    });
});
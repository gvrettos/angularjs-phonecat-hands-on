describe('phoneList', function() {

    // Load the module that contains the 'phoneList' component before each test
    beforeEach(module('phoneList'));

    // Test the controller
    describe('PhoneListController', function() {
        var $httpBackend, ctrl;

        // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
        // This allows us to inject a service and assign it to a variable with the same name
        // as the service while avoiding a name conflict.
        beforeEach(inject(function($componentController, _$httpBackend_) {
            $httpBackend = _$httpBackend_;
            // train the $httpBackend service to expect an incoming HTTP request 
            // and what the response will be
            $httpBackend.expectGET('phones/phones.json')
                        .respond([
                            {name: 'Nexus S'}, 
                            {name: 'Motorola DROID'}
                        ]);
                        
            ctrl = $componentController('phoneList');

            // Override Jasmine's standard .toEqual() matcher.
            // It will compare a Resource() object with a plain JS object and it will decide they respresent the same value.
            // angular.equals ignores functions and $-prefixed properties, such as those added by the $resource service.
            jasmine.addCustomEqualityTester(angular.equals);
        }));
        
        it('should create a `phones` model with 2 phones fetched with `$http`', function() {
            // the responses are not returned until we call flush()
            $httpBackend.flush();
            expect(ctrl.phones.length).toBe(2);
            expect(ctrl.phones).toEqual([
                {name: 'Nexus S'}, 
                {name: 'Motorola DROID'}
            ]);
        });

        it('should set a default value for the `orderProp` model', function() {
            expect(ctrl.orderProp).toBe('age');
        });
    });
});
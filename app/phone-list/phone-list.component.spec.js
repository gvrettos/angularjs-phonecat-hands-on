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
        }));
        
        it('should create a `phones` model with 2 phones fetched with `$http`', function() {
            expect(ctrl.phones).toBeUndefined();

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
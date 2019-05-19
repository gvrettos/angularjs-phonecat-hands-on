describe('Phone', function () {
    var $httpBackend;
    var Phone;
    var phonesData = [
        {name: 'Phone X'},
        {name: 'Phone Y'},
        {name: 'Phone Z'}
    ];

    beforeEach(function () {
        // Override Jasmine's standard .toEqual() matcher.
        // It will compare a Resource() object with a plain JS object and it will decide they respresent the same value.
        // angular.equals ignores functions and $-prefixed properties, such as those added by the $resource service.
        jasmine.addCustomEqualityTester(angular.equals);

        // Load the module that contains the `Phone` service
        module('core.phone');

        // Instantiate the service and "train" `$httpBackend`
        inject(function(_$httpBackend_, _Phone_) {
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('phones/phones.json').respond(phonesData);
            
            Phone = _Phone_;
        });
    });

    // Verify that there are no outstanding expectations or requests after each test
    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should fetch the phones data from `/phones/phones.json`', function() {
        var phones = Phone.query();
        expect(phones).toEqual([]);
        
        $httpBackend.flush();
        expect(phones).toEqual(phonesData);
    });

});
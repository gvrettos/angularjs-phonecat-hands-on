describe('PhoneCat Application', function() {

    describe('phoneList', function() {

        beforeEach(function() {
            browser.get('app');
        });

        it('should filter the phone list as a user types into the search box', function() {
            var phoneList = element.all(by.repeater('phone in $ctrl.phones'));
            var query = element(by.model('$ctrl.query'));
            
            expect(phoneList.count()).toBe(20);

            query.sendKeys('nexus');
            expect(phoneList.count()).toBe(1);

            query.clear();
            query.sendKeys('motorola');
            expect(phoneList.count()).toBe(8);
        });

        it('should be possible to control phone order via the drop-down menu', function() {
            var queryField = element(by.model('$ctrl.query'));
            var nameOption = element(by.model('$ctrl.orderProp')).element(by.css('option[value="name"]'));
            var phoneNameColumn = element.all(by.repeater('phone in $ctrl.phones').column('phone.name'));

            function getNames() {
                return phoneNameColumn.map(function(elem) {
                    return elem.getText();
                });
            }

            // narrow down the results
            queryField.sendKeys('tablet');

            expect(getNames()).toEqual([
                'Motorola XOOM\u2122 with Wi-Fi',
                'MOTOROLA XOOM\u2122'
            ]);

            // sort by name
            nameOption.click();

            // the results are sorted differently
            expect(getNames()).toEqual([
                'MOTOROLA XOOM\u2122',
                'Motorola XOOM\u2122 with Wi-Fi'
              ]);
        });

        it('should render phone specific links', function() {
            element(by.model('$ctrl.query')).sendKeys('nexus');

            element.all(by.css('.phones li a')).first().click();
            expect(browser.getCurrentUrl()).toContain('#!/phones/nexus-s');
        });
        
    });

});
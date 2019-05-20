describe('PhoneCat Application', function() {

    it('should redirect `app` to `app/#!/phones`', function() {
        browser.get('app');
        expect(browser.getCurrentUrl()).toContain('app/#!/phones');
    });

    describe('View: Phone list', function() {

        beforeEach(function() {
            browser.get('app/#!/phones');
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

    describe('View: Phone details', function() {
        beforeEach(function() {
            browser.get('app/#!/phones/nexus-s');
        });

        it('should display the `nexus-s` page', function() {
            expect(element(by.binding('$ctrl.phone.name')).getText()).toBe('Nexus S');
        });

        it('should verify the number of thumbnail images on the `Nexus S` details page', function() {
            expect(element.all(by.css('ul.phone-thumbs li')).count()).toEqual(4);

            // Or using the shortcut $$() notation instead of element.all(by.css()):
            expect($$('ul.phone-thumbs li').count()).toEqual(4);
        });

        it('should display the first phone image as the main phone image', function() {
            var mainImage = element(by.css('img.phone.selected'));
            expect(mainImage.getAttribute('src')).toMatch(/img\/phones\/nexus-s.0.jpg/);
        });

        it('should swap the main image when clicking on a thumbnail image', function() {
            var mainImage = element(by.css('img.phone.selected'));
            var thumbnails = element.all(by.css('.phone-thumbs img'));

            // TODO Improve test by looping through all available thumbnail images
            thumbnails.get(1).click();
            expect(mainImage.getAttribute('src')).toMatch(/img\/phones\/nexus-s.1.jpg/);

            thumbnails.get(2).click();
            expect(mainImage.getAttribute('src')).toMatch(/img\/phones\/nexus-s.2.jpg/);

            thumbnails.get(3).click();
            expect(mainImage.getAttribute('src')).toMatch(/img\/phones\/nexus-s.3.jpg/);

            thumbnails.get(0).click();
            expect(mainImage.getAttribute('src')).toMatch(/img\/phones\/nexus-s.0.jpg/);
        });
    });

});
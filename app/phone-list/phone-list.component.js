angular
    .module('phoneList')
    .component('phoneList', {
        templateUrl: 'phone-list/phone-list.template.html',
        controller: ['Phone', 
            function PhoneListController(Phone) {
                // asynchronous call that returns synchronously only a "future" object
                this.phones = Phone.query();
                this.orderProp = 'age';
            }
        ]
    });
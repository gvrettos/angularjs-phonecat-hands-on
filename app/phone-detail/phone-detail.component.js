angular.module('phoneDetail')
       .component('phoneDetail', {
            templateUrl: 'phone-detail/phone-detail.template.html',
            controller: ['$routeParams', 'Phone',
                function PhoneDetailController($routeParams, Phone) {
                    var self = this;
                    self.phone = Phone.get({
                        phoneId: $routeParams.phoneId
                    }, function(phone) {
                        // we need to set the image in the callback
                        // because phone is undefined until the "future" is resolved
                        self.setImage(phone.images[0]);
                    });

                    self.setImage = function setImage(imageUrl) {
                        self.mainImageUrl = imageUrl;
                    };
                }
            ]
       });
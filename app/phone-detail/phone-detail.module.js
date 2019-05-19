/* Although ngRoute is already imported by the app module, it breaks the modularity of phoneDetail module to omit it here. */
angular.module('phoneDetail', [
    'ngRoute',
    'core.phone'
]);
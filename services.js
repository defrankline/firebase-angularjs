var services = angular.module('services', ['ngResource']);

services.factory('StudentService', ['$resource', function ($resource) {
    return $resource('/api/students/:id', {}, {
        fetchAll: {method: 'GET', url: '/api/students/fetchAll'},
        paginated: {method: 'GET', url: '/api/students/paginated'},
        update: {method: 'PUT', params: {id: '@id'}},
    });
}]);
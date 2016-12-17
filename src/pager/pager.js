angular.module("AngularBoot").directive('pager', [function() {
    return {
        restrict: 'E',
        scope: {
            items: '=',
            itemsPerPage: "=",
            includeFirstLast: "=",
            includeNextPrev: "=",
            currentPage: '='
        },
        controller: 'PagerCtrl',
        templateUrl: 'app/demos/pagination/pager.html',
        link: function(scope, iElement, iAttrs, controller, transcludeFn) {
            scope.$watch('items', function(newVal, oldVal) {
                var pageNumbers = [];
                var pageNumber = Math.ceil(newVal.length / scope.itemsPerPage);
                for (var i = 1; i <= pageNumber; i++) {
                    pageNumbers.push(i);
                }
                scope.pageNumbers = pageNumbers;
                scope.selectPage(1);
            });
        }
    }
}]);
angular.module('AngularBoot').controller('PagerCtrl', ['$scope', function($scope) {
    var self = $scope;
    self.isActive = function(selectedPage) {
        return self.currentPage === selectedPage;
    };
    self.isPrevExists = function() {
        return self.currentPage !== 1;
    };
    self.isNextExists = function() {
        return self.currentPage !== self.pageNumbers.length;
    };
    self.selectPage = function(selectedPage) {
        if (!self.isActive(selectedPage) || selectedPage == 1) {
            self.currentPage = selectedPage;
        }
    };
    self.selectNext = function(nextPage) {
        if (self.isNextExists()) {
            self.selectPage(self.currentPage + 1);
        }
    };
    self.selectPrevious = function(nextPage) {
        if (self.isPrevExists()) {
            self.selectPage(self.currentPage - 1);
        }
    };
    self.selectFirst = function() {
        if (self.isPrevExists()) {
            self.selectPage(1);
        }
    };
    $scope.selectLast = function() {
        if (self.isNextExists()) {
            self.selectPage(self.pageNumbers.length);
        }
    }
}]);
angular.module('AngularBoot').factory('PagerService', function() {
    return {
        getItems: function(items, offset, limit) {
            return items.slice(offset, offset + limit);
        };
    };
});
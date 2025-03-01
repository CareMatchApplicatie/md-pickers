(function() {
"use strict";
/**
 * Created by Robin Thoni on 6/21/17.
 */

Date.prototype.addDays = function (days) {
    const dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
}

angular

    .module('demo', [
        'ngMaterial',
        'ngMessages',
        'mdPickers'
    ])

    .config(['$mdThemingProvider', function ($mdThemingProvider) {
        $mdThemingProvider.theme('dark').dark();
    }])

    .run(['$location', '$mdpLocale', function ($location, $mdpLocale) {
        if (location.search !== '?useDefaults') { // Quick and dirty
            $mdpLocale.time.minTime = '10h00';
            $mdpLocale.time.maxTime = '22h42';
            $mdpLocale.time.okLabel = 'Valider';
            $mdpLocale.time.cancelLabel = 'Annuler';
            $mdpLocale.time.timeFormat = 'HH[h]mm';
            $mdpLocale.time.noFloat = true;
            $mdpLocale.time.openOnClick = true;
            $mdpLocale.time.autoSwitch = true;
            $mdpLocale.time.ampm = false;
            $mdpLocale.time.clearOnCancel = true;


            $mdpLocale.date.minDate = new Date().addDays(-2);
            $mdpLocale.date.maxDate = new Date().addDays(2);
            $mdpLocale.date.okLabel = 'Valider';
            $mdpLocale.date.cancelLabel = 'Annuler';
            $mdpLocale.date.dateFilter = function (date) {
                return date.getDate() % 2 !== 0;
            };
            $mdpLocale.date.dateFormat = 'DD/MM/YYYY';
            $mdpLocale.date.displayFormat = 'ddd DD MMM';
            $mdpLocale.date.noFloat = true;
            $mdpLocale.date.openOnClick = true;
            $mdpLocale.date.clearOnCancel = true;
        }
    }]);
/**
 * Created by Robin Thoni on 6/21/17.
 */

angular.module('demo').controller('demoController', ['$scope', "$mdpDatePicker", "$mdpTimePicker", function($scope, $mdpDatePicker, $mdpTimePicker) {
    $scope.date1 = null;

    $scope.date2 = null;
    $scope.minDate2 = new Date().addDays(-7);
    $scope.maxDate2 = new Date().addDays(7);
    $scope.minTime2 = "01:42";
    $scope.maxTime2 = "23:42";
    $scope.dateFilter2 = function (date) {
        var d = date.getDate();
        return d % 2 !== 0 && d % 3 !== 0;
    };

    $scope.custom = {};
    $scope.custom.date3 = null;
    $scope.custom.minDate3 = null;
    $scope.custom.maxDate3 = null;
    $scope.custom.datePlaceholder3 = "Date 3";
    $scope.custom.minTime3 = "01:42:00";
    $scope.custom.maxTime3 = "23:42:00";
    $scope.custom.okLabel3 = "go!";
    $scope.custom.cancelLabel3 = "cancel!";
    $scope.custom.clearOnCancel3 = true;
    $scope.custom.dateFormat3 = "DD-MM-YYYY";
    $scope.custom.minDateStr3 = moment(new Date().addDays(-7)).format($scope.custom.dateFormat3);
    $scope.custom.maxDateStr3 = moment(new Date().addDays(7)).format($scope.custom.dateFormat3);
    $scope.custom.maxDate3 = new Date().addDays(7);
    $scope.custom.dateFilterEnabled3 = false;
    $scope.custom.dateFilterNo3 = false;
    $scope.custom.dateFilter3 = null;
    $scope.custom.timePlaceholder3 = "Time 3";
    $scope.custom.timeFormat3 = "HH:mm:ss";
    $scope.custom.autoSwitch3 = true;
    $scope.custom.ampm3 = true;

    $scope.date4 = null;

    $scope.currentDate = new Date();

    $scope.showDatePicker = function(ev) {
        $mdpDatePicker($scope.currentDate, {
            targetEvent: ev
        }).then(function(selectedDate) {
            $scope.currentDate = selectedDate;
        });
    };

    $scope.showTimePicker = function(ev) {
        $mdpTimePicker($scope.currentDate, {
            targetEvent: ev
        }).then(function(selectedDate) {
            $scope.currentDate = selectedDate;
        });
    };

    $scope.$watch('custom.minDateStr3', function(newValue, oldValue) {
        $scope.custom.minDate3 = moment(newValue, $scope.custom.dateFormat3, true);
    });
    $scope.$watch('custom.maxDateStr3', function(newValue, oldValue) {
        $scope.custom.maxDate3 = moment(newValue, $scope.custom.dateFormat3, true);
    });

    $scope.$watch('custom.dateFilterNo3', function (newValue, oldValue) {
        if (newValue) {
            $scope.custom.dateFilter3 = function (date) {
                var d = date.getDate();
                return $scope.custom.dateFilterEnabled3 && (d % 2 !== 0);
            };
        }
        else {
            $scope.custom.dateFilter3 = function (date) {
                var d = date.getDate();
                return $scope.custom.dateFilterEnabled3 && (d % 3 !== 0);
            };
        }
    });

}]);

})();
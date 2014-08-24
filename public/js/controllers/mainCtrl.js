/**
 * Created by Orlando on 24/8/2014.
 */
angular.module('MainCtrl', [])
    .controller('MainController',['$scope', 'video', function($scope, video)
    {
        $scope.url = "http://www.w3schools.com/html/mov_bbb.mp4";
        $scope.type = 'video/mp4';

        video.addSource('mp4', '/videos');

    }
    ]);
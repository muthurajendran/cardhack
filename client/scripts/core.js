'use strict';

/* Controllers */

var tinder = angular.module('tinder', ['hmTouchEvents']);

var hammerControl = tinder.controller('hmCtrl',[ '$scope', '$http', function ($scope,$http) {
  $scope.cards = [];
  
  $http({
      url: '/get-cards',
      method: 'get'
  }).then(function(data) {
      $scope.cards = data.data.cards;
      console.log(data);
  });

  $scope.$on('ngRepeatFinish', function(ngRepeatFinishedEvent) {
    $('div.target').not(':eq(0)').hide();
  });

}]);

hammerControl.directive('repDir', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinish');
                });
            }
        }
    }
});

hammerControl.directive('hmDir', function () {
  return {
    'restrict' : 'AE',
    'link' : function (scope, element, attrs) {

      console.log(element);
      scope.onHammer = function onHammer (event) {
        if (event.target === element[0].children[0]) {
          var x = event.center.x - (element[0].children[0].offsetWidth/2),
              y = event.center.y - (element[0].children[0].offsetHeight/2);

          scope.boxMessage = '{x:' + x + ', y:' + y + '}';

          if (event.type == "panleft"){
            console.log("cool");
          }
          $(".target").first().css({
            'left' : x + 'px',
            'top' : y + 'px'
          });
        }
      };

      scope.onPanEnd = function onPanEnd (event) {
        var end_left = element[0].children[0].offsetWidth/7
        var end_right = element[0].children[0].offsetWidth - (element[0].children[0].offsetWidth/10)

        if(event.center.x <= end_left){
          $(".target").first().remove();
          $(".target").first().show();
          alert("You said NO");
        }else if(event.center.x >= end_right){
          $(".target").first().remove();
          $(".target").first().show();
          alert("You said YES");
        }else{
          $(".target").first().css({
            'left' : '0px',
            'top' : '0px'
          });
        }

        if($( ".target" ).length===0)
          alert("No more cards");

      }
    }
  }
});



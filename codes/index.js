/**
 * Created by ALIREZA on 8/30/2017.
 */

var app = angular.module('Add_Remove_Box', []);

app.controller('Ctrl', function($scope){
    var i;
    var isRepeated = false;
    var actionLicense = true;
    var prevElement = null;
    var currentElement = null;
    var positionSide = null;

    $scope.choices = ["left", "right"];

    $scope.lefts = [{id: 'left1'}, {id: 'left2'}, {id: 'left3'}, {id: 'left4'}];
    for (i=0; i<$scope.lefts.length; i++){
        $scope.lefts[i].name = "left" + (i+1).toString();
    }

    $scope.rights = [{id: 'right1'}, {id: 'right2'}];
    for (i=0; i<$scope.rights.length; i++){
        $scope.rights[i].name = "right" + (i+1).toString();
    }

    $scope.insert = function ($event) {
        var side = $scope.selectedSide;
        if(side == null || side == "left"){
            var leftItemNo = $scope.lefts.length+1;
            $scope.lefts.push({'id':'left'+leftItemNo});
            $scope.lefts[leftItemNo - 1].name = $scope.choice.name;
        }
        else{
            var rightItemNo = $scope.rights.length+1;
            $scope.rights.push({'id':'right'+rightItemNo});
            $scope.rights[rightItemNo - 1].name = $scope.choice.name;
        }
    };

    $scope.deleteChoice = function() {
        if(positionSide === 0) {
            var ItemNo = -1;
            $scope.lefts.forEach(function (i, j) {
                if (i.name === currentElement.textContent) {
                    ItemNo = j;
                    return;
                }
            });
            $scope.lefts.splice(ItemNo,1);
        }
    };

    $scope.add = function () {
        if(actionLicense && positionSide === 0){
            actionLicense = false;

            var leftItemNo = -1;
            $scope.lefts.forEach(function (i,j) {
                if(i.name === currentElement.textContent){
                    leftItemNo = j;
                    return;
                }
            });
            $scope.lefts.splice(leftItemNo,1);

            var rightItemNo = $scope.rights.length+1;
            $scope.rights.push({'id':'right'+rightItemNo});
            $scope.rights[rightItemNo - 1].name = currentElement.textContent;

        }
    };

    $scope.remove = function () {
        if(actionLicense && positionSide === 1){
            actionLicense = false;

            var rightItemNo = -1;
            $scope.rights.forEach(function (i,j) {
                if(i.name === currentElement.textContent){
                    rightItemNo = j;
                    return;
                }
            });
            $scope.rights.splice(rightItemNo,1);

            var leftItemNo = $scope.lefts.length+1;
            $scope.lefts.push({'id':'left'+leftItemNo});
            $scope.lefts[leftItemNo - 1].name = currentElement.textContent;

        }
    };

    $scope.addAll = function () {

        $scope.lefts.forEach(function (i) {
            var rightItemNo = $scope.rights.length+1;
            $scope.rights.push({'id':'right'+rightItemNo});
            $scope.rights[rightItemNo - 1].name = i.name;

        });
        $scope.lefts.splice(0,$scope.lefts.length);

    };

    $scope.removeAll = function () {

        $scope.rights.forEach(function (i) {
            var leftItemNo = $scope.lefts.length+1;
            $scope.lefts.push({'id':'left'+leftItemNo});
            $scope.lefts[leftItemNo - 1].name = i.name;

        });
        $scope.rights.splice(0,$scope.rights.length);

    };


    $scope.clicked = function ($event, pos) {

        actionLicense = true;
        positionSide = pos;
        currentElement = $event.currentTarget;

        var deleteButton = document.getElementsByClassName("delete")[0];
        if(pos === 1){
            if(deleteButton.className.indexOf("button-deactive") === -1) {
                deleteButton.className += " button-deactive";
            }
        }else{
            deleteButton.className = deleteButton.className.replace(" button-deactive", "");
        }

        if(prevElement === null){
            prevElement = currentElement;
        }
        else{
            if(prevElement === currentElement){
                isRepeated = !isRepeated;
            }
            else{
                if (isRepeated){
                    isRepeated = false;
                }
            }
        }
        if (prevElement.className.indexOf("active") !== -1){
            prevElement.className = prevElement.className.replace(" active", "");
        }
        if (!isRepeated && currentElement.className.indexOf("active") === -1){
            currentElement.className += " active";
        }
        prevElement = currentElement;
    };

});
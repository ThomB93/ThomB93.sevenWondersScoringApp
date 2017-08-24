var app = angular.module("ScoringModule", []);

app.controller("ScoringController", ["$scope", function ($scope) {
    console.log("controller works");
    $scope.player = { "count": 0 };
    $scope.leadersExpac = {
        value1: false
    };
    $scope.players = [];


    $scope.onPlayerNumberChange = function () {
        $scope.players = [] //clear array 
        for (var index = 0; index < $scope.player.count; index++) {
            $scope.players.push({
                name: "", militaryScore: 0, goldScore: 0, wondersScore: 0, civilianScore: 0, commercialScore: 0,
                guildsScore: 0, scientificScore: 0, leaderScore: 0, totalScore: 0
            });
        }
        
        console.log($scope.players);
    }
    $scope.calculateTotal = function (player) {
        player.totalScore = player.militaryScore + player.goldScore + player.wondersScore + player.civilianScore + player.commercialScore
            + player.guildsScore + player.scientificScore + player.leaderScore;
    }
    $scope.addChartLabel = function(player) {
        
    }


}]); //controller end

var ctx = document.getElementById('scoringChart').getContext('2d');


var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: [],
        datasets: [{
            label: "Scoring Dataset",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [],
        }]
    },

    // Configuration options go here
    options: {}
});


function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}

/* $scope.$watch('playerCount', function (newValue, oldValue) {
        if (newValue > 7) {
            alert("Can't have more than 7 players.");
            $scope.playerCount = oldValue;
        }
        else if (newValue > oldValue) { //if increment player count
            $("#playerNames").append("<input id='player" + newValue +"' type='text' class='form-control' placeholder='Enter name for player" + newValue + "'>");
            
        }
        else if (newValue < oldValue) { //i decrement player count
            console.log("Removing")
            $("#player" + oldValue).remove();
        }
    }); */
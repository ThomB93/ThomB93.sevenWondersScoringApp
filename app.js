var app = angular.module("ScoringModule", []);

app.controller("ScoringController", [
  "$scope",
  function($scope) {
    console.log("controller works");
    $scope.player = { count: 0 }; //player.count
    $scope.leadersExpac = {
      value: false
    };
    $scope.players = [];

    $scope.onPlayerNumberChange = function() {
      $scope.players = []; //clear array
      removeData(chart); //clear chart
      for (var index = 0; index < $scope.player.count; index++) {
        $scope.players.push({
          name: "Player " + (index + 1),
          militaryScore: 0,
          goldScore: 0,
          wondersScore: 0,
          civilianScore: 0,
          commercialScore: 0,
          guildsScore: 0,
          scientificScore: 0,
          leadersScore: 0,
          totalScore: 0
        });
        addNewPlayerToChart(chart, $scope.players[index].name, [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]);
      }
      //reset chart datasets and add one for each player
      console.log($scope.players);
    };

    $scope.onPlayerNameChange = function(index, player) {
      //label in dataset should update with new player name
      updateChartPlayerName(chart, player.name, index);
    };

    $scope.onLeaderExpac = function() {
      var expacName = "Leaders";
      if ($scope.leadersExpac.value) {
        addChartLeaderLabel(chart, expacName);
      } else {
        removeChartLeaderLabel(chart, expacName);
      }
    };

    $scope.calculateTotal = function(player) {
      player.totalScore =
        player.militaryScore +
        player.goldScore +
        player.wondersScore +
        player.civilianScore +
        player.commercialScore +
        player.guildsScore +
        player.scientificScore +
        player.leadersScore;
      console.log($scope.players);
      //update chart data
      updateChartData(chart, player.name, [
        player.militaryScore,
        player.goldScore,
        player.wondersScore,
        player.civilianScore,
        player.commercialScore,
        player.guildsScore,
        player.scientificScore,
        player.leadersScore
      ]);
    };
  }
]); //controller end

var ctx = document.getElementById("scoringChart").getContext("2d");

var chart = new Chart(ctx, {
  // The type of chart we want to create
  type: "bar",

  // The data for our dataset
  data: {
    labels: ["Mil", "Gold", "Won", "Civ", "Com", "Guilds", "Sci"],
    datasets: []
  },

  // Configuration options go here
  options: {
    scales: {
      xAxes: [
        {
          stacked: false,
          beginAtZero: true,

          ticks: {
            stepSize: 1,
            min: 0,
            autoSkip: false
          }
        }
      ]
    }
  }
});

//add a new player to the chart with all data reset to 0
function addNewPlayerToChart(chart, label, data) {
  chart.data.datasets.push({
    label: label,
    backgroundColor: getRandomColor(),
    data: data
  });
  chart.update();
}
function updateChartPlayerName(chart, label, index) {
    chart.data.datasets[index].label = label;
    chart.update();
}

function updateChartData(chart, label, data) {
  chart.data.datasets.forEach(ds => {
    if (ds.label == label) {
      ds.data = data;
    }
  });
  chart.update();
}

function addChartLeaderLabel(chart, label) {
  chart.data.labels.push(label);
  chart.update();
}

function removeChartLeaderLabel(chart, label) {
  var index = chart.data.labels.indexOf(label);
  if (index > -1) {
    chart.data.labels.splice(index, 1);
  }
  chart.update();
}

//empties all arrays, clears the chart
function removeData(chart) {
  //chart.data.labels = [];
  chart.data.datasets = [];
  chart.update();
}

//returns a random color for each player
function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
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

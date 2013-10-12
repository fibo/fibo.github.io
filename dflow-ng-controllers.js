function Graph($scope) {
  $scope.nodes = [
    {
      "id": 1,
      "label": "LinearSpread",
      "x": 20,
      "y": 20,
      "inputPins": [
        {"x":  0, "y": 0 },
        {"x": 20, "y": 0 },
        {"x": 40, "y": 0 },
        {"x": 60, "y": 0 }
      ],
      "outputPins": [
        {"x": 0, "y": 14 }
      ]
    },
    {
      "id": 2,
      "label": "LinearSpread",
      "x": 50,
      "y": 100,
      "inputPins": [
        {"x":  0, "y": 0 },
        {"x": 20, "y": 0 },
        {"x": 40, "y": 0 },
        {"x": 60, "y": 0 }
      ],
      "outputPins": [
        {"x": 0, "y": 14 }
      ]
    },
  ];
}

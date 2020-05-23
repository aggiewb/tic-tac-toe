var HardMode = {};
(function() {
    var WINNING_COMBINATIONS = HardMode.WINNING_COMBINATIONS = [
        ['a-box', 'b-box', 'c-box'],
        ['d-box', 'e-box', 'f-box'],
        ['g-box', 'h-box', 'i-box'],
        ['a-box', 'd-box', 'g-box'],
        ['b-box', 'e-box', 'h-box'],
        ['c-box', 'f-box', 'i-box'],
        ['a-box', 'e-box', 'i-box'],
        ['c-box', 'e-box', 'g-box']
   ];

    /**
    * Gets all empty spaces on the board and checks if any of them are the last space needed to make a winning move.
    * If so, returns the winning space's element Id. Otherwise, returns undefined.
    */
    HardMode.getWinningId = function() {
        var emptyIds = Array.from(document.querySelectorAll('.unmarked')).map(function(emptySpace) {
            return emptySpace.id;
        });
        var markerById = {};
        for (var i = 0; i < WINNING_COMBINATIONS.length; i++) {
            var occupiedCount = 0;
            var occupiedMarker;
            var possibleWinningId;
            var winningCombination = WINNING_COMBINATIONS[i];
            for (var j = 0; j < winningCombination.length; j++) {
                var spaceId = winningCombination[j];
                if (emptyIds.includes(spaceId)) {
                    if (possibleWinningId) {
                        continue;
                    }
                    possibleWinningId = spaceId;
                } else {
                    var occupyingMarker = markerById[spaceId];
                    if (!occupyingMarker) {
                        occupyingMarker = document.getElementById(spaceId).className;
                        markerById[spaceId] = occupyingMarker;
                    }
                    if (occupiedCount === 0) {
                        occupiedMarker = occupyingMarker;
                        occupiedCount = 1;
                    } else if (occupiedMarker === occupyingMarker) {
                        occupiedCount = 2;
                    }
                }
            }
            if (occupiedCount === 2) {
                return possibleWinningId;
            }
            possibleWinningId = null;
        }
    };

    module.exports = HardMode;
})();

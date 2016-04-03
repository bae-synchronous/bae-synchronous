// currently implementing the midpoing formula to calculate a third point
function getThirdPoint (coordinates1, coordinates2) {
    return findMidpoint(coordinates1, coordinates2);
}

function findMidpoint(coordinates1,coordinates2){
    var thirdPoint = {};  
    thirdPoint.lat = ((coordinates1.lat + coordinates2.lat)/2);
    thirdPoint.lng = ((coordinates1.lng + coordinates2.lng)/2);
    return thirdPoint;
}

module.exports = {
    getThirdPoint: getThirdPoint,
    findMidpoint: findMidpoint
};
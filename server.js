const events = require('./datasource.json')

console.log(events.events.length)

function toRad(x) {
    return x * Math.PI / 180;
}

function haversineDistance(coords1, coords2, isMiles) {

    var lon1 = coords1[0];
    var lat1 = coords1[1];
    var lon2 = coords2[0];
    var lat2 = coords2[1];

    var R = 6371; // km

    var x1 = lat2 - lat1;
    var dLat = toRad(x1);
    var x2 = lon2 - lon1;
    var dLon = toRad(x2)
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    if (isMiles) d /= 1.60934;

    return d;




}

////////////////////////// la distance la plus proche que moi
const myLocation = [35.700352, 10.096909];

const distance_plus_proche = events.events.filter((item) => { return item.isVisble == true }).map(event => {
    const eventLocation = [event.long, event.lat];
    const distance = haversineDistance(myLocation, eventLocation);
    return { ...event, distance };
});



distance_plus_proche.sort((event1, event2) => event1.distance - event2.distance);


console.log(distance_plus_proche);




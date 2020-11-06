const  { nextISSTimesForMyLocation } = require('./iss');


// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log('It didn\'t work!', error);
//     return;
//   }
//   console.log('It worked! IP:', ip);
// });

// fetchCoordsByIP('24.80.82.209', (error, coords) => {
//   if (error) {
//     console.log('It didn\'t work!', error);
//     return;
//   }
//   console.log('It worked! Coordinates:', coords);
// });

// fetchISSFlyOverTimes({ latitude: 49.1617, longitude: -123.175 }, (error, response) => {
//   if (error) {
//     console.log('Error retrieving fly-over times.', error);
//     return;
//   }
//   console.log('ISS Fly-Over times based on your coordinates: \n', response);
// });

const formatPrintPassTimes = (passTimes) => {
  for (pass in passTimes) {
    const passTimeKey = passTimes[pass];
    const datetime = new Date(passTimeKey.risetime * 1000);
    console.log(`Next pass at ${datetime} for ${passTimeKey.duration} seconds!`);
  }
}

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) return console.log('It didn\'t work.', error);
  
  formatPrintPassTimes(passTimes);
});

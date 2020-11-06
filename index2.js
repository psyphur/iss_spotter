const { nextISSTimesForMyLocation } = require('./iss_promised');

const formatPrintPassTimes = (body) => {
  const passTimes = body.response;
  for (passes of passTimes) {
    const datetime = new Date(passes.risetime * 1000).toString();
    console.log(`Next pass at ${datetime} for ${passes.duration} seconds!`);
  }
}

nextISSTimesForMyLocation()
  .then((passTimes) => {
    formatPrintPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("An error occured:", error);
  })

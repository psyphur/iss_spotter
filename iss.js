const request = require('request');

const fetchMyIP = (cb) => {
  request('https://api.ipify.org/?format=json', (err, res, body) => {
    if (err) {
      cb(err, null);
      return;
    }
    
    if (res.statusCode !== 200) {
      const msg = `Status Code ${res.statusCode} when fetching IP. Response: ${body}`;
      cb(Error(msg), null);
      return;
    }
      
    const getIP = JSON.parse(body).ip;
    cb(null, getIP);
  });
};

const fetchCoordsByIP = (ip, cb) => {
  request(`http://ip-api.com/json/${ip}`, (err, res, body) => {
    if (err) {
      cb(err.message, null);
      return;
    }

    const data = JSON.parse(body);

    if (data.status !== "success") {
      const msg = `Status: ${data.status} when fetching coordinates for ${ip}. Response: ${body}`;
      cb(Error(msg), null);
      return;
    }

    const coords = {latitude: data.lat, longitude: data.lon};
    cb(null, coords);
  });
};

const fetchISSFlyOverTimes = (coords, cb) => {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (err, res, body) => {

    if (err) {
      cb(err, null);
      return;
    }

    if (res.statusCode !== 200) {
      const msg = `Status: ${res.statusCode} when fetching ISS Fly-Over times. Response: ${body}`;
      cb(Error(msg), null);
    }

    const data = JSON.parse(body).response;

    cb(null, data);
  });
};

const nextISSTimesForMyLocation = (cb) => {
  fetchMyIP((err, ip) => {
    if (err) return cb(err, null);

    fetchCoordsByIP(ip, (err, coords) => {
      if (err) return cb(err, null);

      fetchISSFlyOverTimes(coords, (err, passTimes) => {
        if (err) return cb(err, null);

        cb(null, passTimes);
      });
    });
  });
};


module.exports = { nextISSTimesForMyLocation };
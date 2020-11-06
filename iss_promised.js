const request = require('request-promise-native');

const fetchMyIP = () => {
  return request('https://api.ipify.org/?format=json');
};

const fetchCoordsByIP = (body) => {
  const ip = JSON.parse(body).ip;
  return request(`http://ip-api.com/json/${ip}`)
};

const fetchISSFlyOverTimes = (body) => {
  const coords = JSON.parse(body);
  const url = `http://api.open-notify.org/iss-pass.json?lat=${coords.lat}&lon=${coords.lon}`;
  return request(url);
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const response = JSON.parse(data);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };
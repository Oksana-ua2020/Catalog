var getTracksButton = document.querySelector('.tracks__get-track');
var apiUrl = 'https://ws.audioscrobbler.com/2.0/';
var apiMethod = 'chart.gettopartists';
var apiKey = '7015782d084c6befe18ec5ed1fb69225';
var apiFormat = 'json';
getTracksButton === null || getTracksButton === void 0 ? void 0 : getTracksButton.addEventListener('click', getTracksRequest);
function getTracksRequest() {
    var params = {
        method: apiMethod,
        api_key: apiKey,
        format: apiFormat
    };
    fetch("".concat(apiUrl, "?").concat(new URLSearchParams(params)))
        .then(function (res) { return res.json(); })
        .then(function (data) {
        console.log(data);
        return data;
    })["catch"](function (e) { return console.error(e); });
}

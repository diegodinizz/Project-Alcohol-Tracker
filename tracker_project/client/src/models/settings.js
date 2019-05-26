const PubSub = require('../helpers/pub_sub.js')
const RequestHelper = require('../helpers/request_helper.js')

const Settings = function (url) {
  this.url = url;
  this.request = new RequestHelper(this.url);
}

Settings.prototype.bindEvents = function () {
  PubSub.subscribe('SettingsView:settings-submitted', (event) => {
    this.postSettings(event.detail);
  })
}

Settings.prototype.postSettings = function(settingDetail){
    // console.log('post boozeDetails', boozeDetail)
    this.request.post(settingDetail)
    }

module.exports = Settings;
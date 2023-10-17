export default class UserInfo {
  constructor(name, job) {
    this._name = name;
    this._job = job;
  }

  getUserInfo() {}

  setUserInfo(userInfo) {
    this._bigName = userInfo.textContent;
    this._jobDescription = userInfo.textContent;
    console.log(userInfo);
  }
}

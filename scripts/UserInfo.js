export default class UserInfo {
  constructor(name, job) {
    this._name = name;
    this._job = job;
  }

  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      job: this._job.textContent,
    };
    return userInfo;
    console.log(userInfo);
  }

  setUserInfo() {
    this._name.value = userInfo.name;
    this._job.value = userInfo.job;
  }
}

export default class UserInfo {
  constructor(name, job) {
    this._name = name;
    this._job = job;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent,
    };
  }

  setUserInfo(user) {
    this._name.textContent = user.name;
    this._job.textContent = user.about;
  }
}

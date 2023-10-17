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

  setUserInfo(values) {
    this._nameValue = document.querySelector("#profile-title-edit");
    this._jobValue = document.querySelector("#profile-description-edit");
    this._name.textContent = this._nameValue.value;
    this._job.textContent = this._jobValue.value;
  }
}

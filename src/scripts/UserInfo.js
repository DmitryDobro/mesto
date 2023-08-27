class UserInfo {
  constructor(userName, userJob) {
    this._userName = document.querySelector(userName);
    this._userJob = document.querySelector(userJob);
  }
  getUserInfo() {
    this._userData = {
      userName: this._userName.textContent,
      userJob: this._userJob.textContent,
    };
    return this._userData;
  }
  setUserInfo(data) {
    this._userName.textContent = data.fullName;
    this._userJob.textContent = data.job;
  }
}
export { UserInfo };

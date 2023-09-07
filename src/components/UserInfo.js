class UserInfo {
  constructor(userName, userJob, userAvatar) {
    this._userName = document.querySelector(userName);
    this._userJob = document.querySelector(userJob);
    this._userAvatar = document.querySelector(userAvatar);
  }
  getUserInfo() {
    this._userData = {
      name: this._userName.textContent,
      about: this._userJob.textContent,
    };
    return this._userData;
  }
  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userJob.textContent = data.about;
  }
  setUserAvatar(url) {
    this._userAvatar.src = url.avatar;
  }
}
export { UserInfo };

class UserInfo {
  constructor(userNameSelector, userJobSelector, userAvatarSelector) {
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userJobSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }
  getUserInfo() {
    this._userData = {
      name: this._userName.textContent,
      about: this._userJob.textContent,
      avatar: this._userAvatar.src
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

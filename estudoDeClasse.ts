function applyUser(user: UserType) {
  console.log(JSON.stringify(user, null, 2));
}

interface UserType {
  name: string;
  mail: string;
  password: string;
  nickname: string;
}

class User implements UserType {
  name: string;
  mail: string;
  password: string;
  nickname: string;
  constructor(userData: {
    name: string;
    mail: string;
    password: string;
    nickname: string;
  }) {
    this.name = userData.name;
    this.mail = userData.mail;
    this.password = userData.password;
    this.nickname = userData.nickname;
  }

  publishUser() {
    applyUser({
      name: this.name,
      mail: this.mail,
      password: this.password,
      nickname: this.nickname,
    });
  }
}

const novoUsuário = new User({
  name: 'Emanuel',
  mail: 'manusilvaribeiro10@gmail.com',
  password: 'senha',
  nickname: 'eumanuel',
});

novoUsuário.publishUser();

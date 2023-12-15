class User {
  constructor(
    public id: string,
    public name: string,
    public surname: string,
    public phone: string,
    public email: string,
    public password: string
  ) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.phone = phone;
    this.email = email;
    this.password = password;
  }
}

export default User;

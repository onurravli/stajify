class Company {
  constructor(
    public id: string,
    public name: string,
    public phone: string,
    public email: string,
    public password: string,
    public city: string,
    public province: string
  ) {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.password = password;
    this.city = city;
    this.province = province;
  }
}

export default Company;

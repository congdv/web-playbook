class User {
  constructor(name, age, email) {
    this._name = name;
    this._age = age;
    this._email = email;
  }
  get name() {
    return this._name;
  }

  set name(newName) {
    this._name = newName;
  }
}

class Administrator extends User {
  constructor(name, age, email, role) {
    super(name, age, email);
    this._role = role;
  }

  get role() {
    return this._role;
  }

  set role(newRole) {
    this._role = newRole;
  }

  toString() {
    return `${this._name} ${this._age} ${this._email} ${this._role}`;
  }
}

const sara = new Administrator("Sara", 30, 'sara@gmail.com', 'Admin');

console.log(sara.name)
console.log(sara.role);
console.log(sara.toString())
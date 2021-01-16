const inquirer = require('inquirer');
const Database = require('./db');

const CREATE_ACCOUNT = 0;
const LOGIN_ACCOUNT = 1;
const EXIT = -1;

const DEPOSIT = 10;
const WITHDRAW = 11;
const YOUR_ACCOUNT = 12;

const config = {
  user: "congdv",
  password: 'Matkhaut123',
  host: 'localhost',
  port: 5432,
  database: 'bank'
}

const database = new Database(config);

let db = [];



class Account {
  constructor(accountNumber, password, database, id = 0) {
    this.accountNumber = accountNumber;
    this.password = password;
    this.balance = 0;
    this._database = database;
    this.id = id;
  }

  async doDeposit(amount) {
    this.balance += amount;
    await this._database.execute(`update accounts set balance = $1 where "accountNumber" = $2`, [this.balance, this.accountNumber]);
  }
  
  async doWithDraw(amount) {
    this.balance -= amount;
    await this._database.execute(`update accounts set balance = $1 where "accountNumber" = $2`, [this.balance, this.accountNumber]);
  }

  setBalance(balance) {
    this.balance = balance;
  }

  async getBalance() {
    const result = await this._database.execute(`select * from accounts where "accountNumber" = $1 and password = $2`, [this.accountNumber, this.password]);
    console.table(result.rows);
    this.balance = parseFloat(result.rows[0].balance);
    return this.balance;
  }

  async createTable() {

    return await this._database.execute(`CREATE TABLE "public"."accounts" (
      "id" serial,
      "accountNumber" text,
      "password" text,
      "balance" numeric,
      PRIMARY KEY ("id")
  );`)
  }
  async saveAccount() {
    return await this._database.execute('INSERT INTO accounts( "accountNumber", "password", balance) values($1, $2, $3)', [this.accountNumber, this.password, this.balance])
  }

  static async login(accountNumber, password,database){
    const result = await database.execute('select * from accounts where "accountNumber" = $1 and password = $2', [accountNumber, password]);
    if(result.rowCount > 0) {
      const loggedIn = new Account(accountNumber, password, database);
      loggedIn.setBalance(parseFloat(result.rows[0].balance));
      return loggedIn;
    } return null;
  }

  async startTransaction() {
    await this._database.execute('BEGIN');
  }

  async endTransaction() {
    await this._database.execute('COMMIT');
  }

  async rollback() {
    await this._database.execute('ROLLBACK')
  }

}

async function doWithDraw(account) {

  try {
    await account.startTransaction();
    const balance = await account.getBalance();
    const answer = await inquirer.prompt([
      {
        type: 'input',
        name: 'amount',
        message: 'Amount',
        validate: (input) => {
          if(isNaN(Number(input))) {
            console.log('\nThe amount is not number')
          } else if(Number(input) <= 0){
              console.log('\nThe amount is not zero or negative number')
          } else if(Number(input) > balance){
            console.log('\nThe amount is bigger than your balance')
          } else {
            return true;
          }
  
        }
      }
    ]);
    await account.doWithDraw(parseFloat(answer.amount));
    await account.endTransaction();  
  } catch (error) {
    await account.rollback();
  }
  
}

async function doDeposit(account) {

  try {
    await account.startTransaction();
    const answer = await inquirer.prompt([
      {
        type: 'input',
        name: 'amount',
        message: 'Amount',
        validate: (input) => {
          if(isNaN(Number(input))) {
            console.log('\nThe amount is not number')
          } else {
            if(Number(input) <= 0) {
              console.log('\nThe amount is not zero or negative number')
            } else {
              return true;
  
            }
          }
  
        }
      }
    ]);
    await account.doDeposit(parseFloat(answer.amount));
    await account.endTransaction();  
  } catch (error) {
    await account.rollback();
  }
  

}

async function showAccount(account) {
  const balance = await account.getBalance();
  console.log(`Account Number: ${account.accountNumber}`);
  console.log(`Balance: ${balance}`);
}

async function home(account) {
  let answer = null
  do {
    answer = await inquirer.prompt([
      {
        type: 'list',
        message: 'Your are in the system',
        name: 'selected',
        choices: [
          {
            name: 'Your Account',
            value: YOUR_ACCOUNT
          }, 
          {
            name: 'Deposit',
            value: DEPOSIT
          }, 
          {
            name: 'Withdraw',
            value: WITHDRAW
          },
          {
            name: 'Exit',
            value: EXIT
          }
        ]
      }
    ]);
    switch (answer.selected) {
      case YOUR_ACCOUNT: 
        await showAccount(account);
        break;
      case DEPOSIT:
        await doDeposit(account);
        break;

      case WITHDRAW:
        await doWithDraw(account);
        break;

      default:
        break;
    }
  } while (answer.selected !== EXIT);
 
}

async function createAccount() {
  const accountNumberAnswer = await inquirer.prompt([
    {
      type: 'input',
      name: 'accountNumber',
      message: 'Your account Number'
    },
    {
      type: 'input',
      name: 'password',
      message: 'Your Password'
    }
  ]);
  
  const newAccount = new Account(accountNumberAnswer.accountNumber, accountNumberAnswer.password, database)
  // await newAccount.createTable();
  await newAccount.saveAccount();
}

async function loginAccount() {
  const accountNumberAnswer = await inquirer.prompt([
    {
      type: 'input',
      name: 'accountNumber',
      message: 'Your account Number'
    },
    {
      type: 'input',
      name: 'password',
      message: 'Your Password'
    }
  ]);

  // const result = db.find((value) => value.accountNumber === accountNumberAnswer.accountNumber && value.password === accountNumberAnswer.password);
  const result = await Account.login(accountNumberAnswer.accountNumber, accountNumberAnswer.password, database);
  if(result) {
    await home(result);
  } else {
    console.log('-----Failed to login-----')
  }
}

async function main() {
  database.start();
  let answer = null;
  do {
    answer = await inquirer.prompt([
      {
        type: 'list',
        message: 'Select your options',
        name: 'selected',
        choices: [
          {
            name: 'Create an account',
            value: CREATE_ACCOUNT
          }, 
          {
            name: 'Login account',
            value: LOGIN_ACCOUNT
          },
          {
            name: 'Exit',
            value: EXIT
          }
        ]
      }
    ])
    
    switch (answer.selected) {
      case CREATE_ACCOUNT:
        await createAccount();
        break;
      case LOGIN_ACCOUNT:
        await loginAccount();
      default:
        break;
    }
  } while (answer.selected !== EXIT);
  database.stop();
}

main();
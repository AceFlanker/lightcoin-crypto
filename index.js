class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    // .reduce() is very "buggy" on finding stuff within this.transanctions...
    let sum = 0;
    for (const trans of this.transactions) {
      sum += trans.value;
    }
    return sum;
  }
  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}

class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {
    if (this.isAllowed) {
      this.time = new Date();
      this.account.addTransaction(this);
      return true;
    }
    return false;
  }
}

class Withdrawal extends Transaction {
  get isAllowed() {
    if (this.amount < this.account.balance) {
      return true;
    } else {
      return false;
    }
  }
  get value() {
    return -this.amount;
  }
}

class Deposit extends Transaction {
  get isAllowed() {
    return true;
  }
  get value () {
    return this.amount;
  }
}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("snow-patrol");

t1 = new Deposit(50.25, myAccount);
t1.commit();
// console.log('Transaction 1:', t1, t1.commit());

t2 = new Withdrawal(9.99, myAccount);
t2.commit();
// console.log('Transaction 2:', t2, t2.commit());

t3 = new Deposit(120.00, myAccount);
t3.commit();
// console.log('Transaction 3:', t3, t3.commit());

t4 = new Withdrawal(121.00, myAccount);
t4.commit();
// console.log('Transaction 4:', t4, t4.commit());

console.log('Balance:', myAccount.balance);

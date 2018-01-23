//back-end logic
function newAccount(name, accountType, balance) {
  this.name = name;
  this.accountType = accountType;
  this.balance = balance;
}

newAccount.prototype.transact = function(deposit, withdrawal) {
  if (deposit && withdrawal) {
    this.balance = this.balance + deposit - withdrawal;
  } else if (deposit) {
    this.balance += deposit;
  } else if (withdrawal) {
    this.balance -= withdrawal;
  } else {
    this.balance;
  }
  return this.balance;
}





//front-end logic
$(document).ready(function() {
  $("form#newAccount").submit(function(event) {
    event.preventDefault();
    var accountName = $("input#accountName").val();
    var initialDeposit = parseInt($("input#initialDeposit").val());
    var accountType = $("select#accountType").val();

    account = new newAccount(accountName, accountType, initialDeposit);

    $("#balanceName").text(accountName);
    $("#typeOutput").text(accountType);
    $("#currentBalance").text(initialDeposit);
  });

  $("#fundsForm").submit(function(event) {
    event.preventDefault();
    var deposit = parseInt($("input#deposit").val());
    var withdrawal = parseInt($("input#withdrawal").val());

    account.transact(deposit, withdrawal);
    $("#currentBalance").text(account.balance);
  });
});

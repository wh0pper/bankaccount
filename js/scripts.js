//back-end logic
function newAccount(name, accountType, balance, history) {
  this.name = name;
  this.accountType = accountType;
  this.balance = balance;
  this.depositHistory = [];
  this.withdrawalHistory = [];
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



var addCommas = function(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


var account = {};


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
    $("#currentBalance").text(addCommas(account.balance));

    //hide this form
    $("#newAccount").slideUp();

    //show transaction form
    $("#fundsForm").slideDown();

    //show account info
    $(".balance").show();
  });

  $("#newHead").click(function() {
      $("#newAccount").slideToggle();
  })

  $("#fundsForm").submit(function(event) {
    event.preventDefault();
    var deposit = parseInt($("input#deposit").val());
    var withdrawal = parseInt($("input#withdrawal").val());

    account.transact(deposit, withdrawal);
    $("#currentBalance").text(addCommas(account.balance));

    if (deposit) {
    account.depositHistory.push(deposit);
    }
    if (withdrawal) {
    account.withdrawalHistory.push(withdrawal);

    }

    //clear input field on sumbit
    $("input#deposit").val("");
    $("input#withdrawal").val("");
  });

  $("button#history").click(function() {
    $("div.history").slideToggle();
    $("#deposits").text("");
    account.depositHistory.forEach(function(deposit) {
      $("#deposits").append("$" + addCommas(deposit) + ", ");
    })
    account.withdrawalHistory.forEach(function(withdrawal) {
      $("#withdrawals").append("$" + addCommas(withdrawal) + ", ");
    })
  });
});

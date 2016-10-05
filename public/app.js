var MOCK_HISTORY = {
    "History": [
        {
            "id": "1111111",
            "Username": "Bill",
            "Password": "bar",
            "Item": {
                "Item": "Drinks",
                "Price": "10"
            }
        },
        {
            "id": "2222222",
            "Username": "John",
            "Password": "bar",
            "Item": {
                "Item": "Hat",
                "Price": "12"
            }
        }
    ]
};

var getItem = MOCK_HISTORY.History[0].Item;

// calculates function
var calculate = function(price, multiplyer) {
    return price * multiplyer;
};
// pushes information to mock database
var addHistory = function(id, username, item){
    MOCK_HISTORY.History.push({"id": id, "Username": username, "Password": "bar",
                                "Item": {"Item": item}});
};

// create account with username and password
var createAccount = function(username, password) {
    MOCK_HISTORY.History.push({"id": "3333333", "Username": username, 
                                "Password": password });
};

// grab info, calculate
$('#submit').click(function(){
    var itemBought = $('#item-bought').val();
    var pricePaid = $('#price-paid').val();
    // addHistory("5555", "Zen", itemBought);
    var actualPricePaid = calculate(pricePaid, 5);
    $("#item").text(itemBought);
    $("#actual-price").text(actualPricePaid);
    $('#item-bought').val('');
    $('#price-paid').val('');
});

// create account
$('#submit-user').click(function(){
    var username = $('#create-username').val();
    var password = $('#password').val();
    createAccount(username, password);
});

// login
$('#submit-login').click(function(){
    var username = $('#enter-username').val();
    var password = $('#enter-password').val();
    for (var user in MOCK_HISTORY.History){
        if(MOCK_HISTORY.History[user].Username == username && MOCK_HISTORY.History[user].Password == password){
            console.log("Yes " + username + " Yes " + password);
            return;
        } else {
            console.log("wrong password");
        }
    }

});

// history












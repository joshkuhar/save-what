var MOCK_HISTORY = {
    "History": [
        {
            "id": "1111111",
            "Username": "Bill",
            "Item": {
                "Item": "Drinks",
                "Price": "10"
            }
        },
        {
            "id": "2222222",
            "Username": "John",
            "Item": {
                "Item": "Hat",
                "Price": "12"
            }
        }
    ]
};

var getItem = MOCK_HISTORY.History[0].Item;
// Get history from user
// calculates function
var calculate = function(price, multiplyer) {
    return price * multiplyer;
};
// pushes information to mock database
var addHistory = function(id, username, item){
    MOCK_HISTORY.History.push({"id": id, "Username": username,
                                "Item": {"Item": item}});
}

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
    console.log(MOCK_HISTORY);
});

// create account
$('#submit-user').click(function(){
    var username = $('#create-username').val();
    var password = $('#password').val();
    console.log( username, password);
});













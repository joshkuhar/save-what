var MOCK_HISTORY = {
    "History": [
        {
            "id": "1111111",
            "Username": "Bill",
            "Age": "25",
            "Item": {
                "Item": "Drinks",
                "Price": "10"
            }
        },
        {
            "id": "2222222",
            "Username": "John",
            "Age": "30",
            "Item": {
                "Item": "Hat",
                "Price": "12"
            }
        }
    ]
};

var getItem = MOCK_HISTORY.History[0].Item;
// Get history from user

var calculate = function(price, multiplyer) {
    return price * multiplyer;
};

var addHistory = function(id, username, age, item){
    MOCK_HISTORY.History.push({"id": id, "Username": username,
                                "Age": age, "Item": {"Item": item}});
}


$('#submit').click(function(){
    var itemBought = $('#item-bought').val();
    var pricePaid = $('#price-paid').val();
    var age = $('#age').val();
    addHistory("5555", "Zen", age, itemBought);
    var actualPricePaid = calculate(pricePaid, 5);
    $("#item").text(itemBought);
    $("#actual-price").text(actualPricePaid);
    $('#item-bought').val('');
    $('#price-paid').val('');
    $('#age').val('');
    console.log(MOCK_HISTORY);
});

// Calculate true cost

// 











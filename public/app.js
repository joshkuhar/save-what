var cachedItems = [];

var getPage = function(){
    var ajax = $.ajax('/a', {
        type: 'GET',
        dataType: 'json'
    });
    ajax.done(  function  (result)    {
        console.log(result);
        for (var x = 0; x<result.length; x++){
            $('#get').append(result[x]._id + " :" + result[x].pass + "    <br>");
        }
    });
};

var postToDB = function(data){
    var ajax = $.ajax('/b', {
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify(data),
        contentType: 'application/json'
    });
    console.log('I am ' + data);
    ajax.done(  function  (result)    {
        console.log(result._id);
        $('#test').append('<br>' + result._id);
        console.log('I am result' + JSON.stringify(result));
    }); 
};
var deleteFromDB = function(id){
    var ajax = $.ajax('/b/' + id, {
        type: 'DELETE',
        dataType: 'json'
    });
    ajax.done( function (result) {
        console.log(result);
    });
};

var editItem = function(id, pass){
    var item = {
        'pass': pass,
        'id': id
    };
    var ajax = $.ajax('/b/' + id, {
        type: 'PUT',
        data: JSON.stringify(item),
        dataType: 'json',
        contentType: 'application/json'
    });
    ajax.done(function(result){
        console.log(result);
    });
};

// calculates function
var calculate = function(price, multiplyer) {
    return price * multiplyer;
};
// pushes information to mock database
var addHistory = function(id, username, item){
    MOCK_HISTORY.History.push({"id": id, 
                                "Username": username, 
                                "Password": "bar",
                                "Item": {
                                    "Item": item
                                }
                            });
};



// grab info, calculate
$('#submit').click(function(){
    var itemBought = $('#item-bought').val();
    var pricePaid = $('#price-paid').val();
    var newPrice = calculate(pricePaid, 5);
    displayItem(itemBought, newPrice);
    $('#item-bought').val('');
    $('#price-paid').val('');
});
var calculate = function(price, multiplyer) {
    return price * multiplyer;
};
var displayItem = function(item, price){
    $('#item').append('<li>' + item  + " " + price + " " + "<input type='submit' value='delete' id='delete'></li>");
    cacheItem(item, price);
};
var cacheItem = function(item, price){
    cachedItems.push({item, price});
};
$('#item').on('click', function(){
    console.log(console.log(cachedItems));
});
$('#save').click(function(){
    console.log(cachedItems);
});


    
















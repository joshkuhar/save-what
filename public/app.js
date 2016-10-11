



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
        // $('#test').append('<br>' + result._id);
        // console.log('I am result' + JSON.stringify(result));
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

var averageTwentyReturn = 4.42;

// grab info, calculate
$('#submit').click(function(){
    var itemBought = $('#item-bought').val();
    var pricePaid = $('#price-paid').val();
    var newPrice = calculate(pricePaid, averageTwentyReturn);
    displayItem(itemBought, newPrice);
    cacheItem(itemBought, pricePaid);
    $('#item-bought').val('');
    $('#price-paid').val('');
});
var calculate = function(price, multiplyer) {
    return price * multiplyer;
};
var displayItem = function(item, price){
    $('#item').append('<li>' + item  + " $" + price + " " + "<input type='submit' value='delete' id='delete'></li>");
};
var cachedItems = [];
var List = {};
var cacheItem = function(item, price){
    cachedItems.push({item: item, price: price});
};
$('#save').click(function(){
    if ($('#listName').val() === ""){
        alert("Please enter a name for your list.");
        return;
    } 
    List.name = $('#listName').val();
    List.items = cachedItems;
    postToDB(List);
    // console.log(List);
});
var getPage = function(data){
    var ajax = $.ajax('/a', {
        type: 'GET',
        dataType: 'json',
        data: data,
        contentType: 'application/json'
    });
    console.log(data);
    ajax.done(  function  (result)    {
        console.log(result[0].items);
        var eachResult = result[0].items;
        for (var x = 0; x<eachResult.length; x++){
            $('#history').append(eachResult[x].item + " " + eachResult[x].price + "<br>");
        }
    });
};
$('#get-history').click(function(){
    var search = $('#search').val();
    var searchName = {name: search};
    getPage(searchName);
    $('#search').val('');
    console.log(searchName);
});

    
















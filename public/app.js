'use strict';
var cachedItems = [];

var removeFromCache = function(index){
    cachedItems.splice(index, 1);
};
var removeFromCache2 = function(index){
    cachedItems[0].splice(index, 1);
}
var List = {};
var averageTwentyReturn = 4.42;

var postToDB = function(data){
    var ajax = $.ajax('/b', {
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify(data),
        contentType: 'application/json'
    });
    $('#listName').val('');
    $('#item').empty();
    cachedItems.length = 0;
    List = {};
    ajax.done(  function  (result)    {
        console.log(result._id);
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

var editItem = function(id, data){
    var item = {
        '_id': id,
        'data': data
    };
    var ajax = $.ajax('/b/' + id, {
        type: 'PUT',
        data: data,
        dataType: 'json',
        contentType: 'application/json'
    });
    ajax.done(function(result){
        console.log(result);
    });
};
var getPage = function(data){
    var ajax = $.ajax('/a', {
        type: 'GET',
        dataType: 'json',
        data: data,
        contentType: 'application/json'
    });
    ajax.done(  function  (result)    {
        var eachResult =  result[0].items;
        cachedItems.push(eachResult);
        for (var x = 0; x<eachResult.length; x++){
            $('#history').append('<li><span id="'+ x + ' "></span> ' + eachResult[x].item + " " + eachResult[x].price + "<input type='submit'value='delete'id='svd-delete'></li>");
        }
        $('#history').append('<span id="list-id">' + result[0]._id + '</span>');
    });
};

// calculates function
var calculate = function(price, multiplyer) {
    return price * multiplyer;
};
var displayItem = function(item, price){
    $('#item').append('<li id="current-list"><span id="'+cachedItems.length+'">' + item  + "</span> $" + price + " " + "<input type='submit' value='delete' id='delete-current'></li>");
};
var cacheItem = function(item, price){
    cachedItems.push({item: item, price: price});
};

// Listeners
// Submit to calculate
$('#submit').click(function(){
    var itemBought = $('#item-bought').val();
    var pricePaid = $('#price-paid').val();
    var newPrice = calculate(pricePaid, averageTwentyReturn);
    displayItem(itemBought, newPrice);
    cacheItem(itemBought, pricePaid);
    $('#item-bought').val('');
    $('#price-paid').val('');
});
// Save list with name for later retreival
$('#save').click(function(){
    if ($('#listName').val() === ""){
        alert("Please enter a name for your list.");
        return;
    } 
    List.name = $('#listName').val();
    List.items = cachedItems;
    postToDB(List);
});
// Retrieve previous lists
$('#get-history').click(function(){
    var search = $('#search').val();
    var searchName = {name: search};
    getPage(searchName);
    $('#search').val('');
    $('#remove-list').show();
});
// Delete previous lists
$('#remove-list').click(function(){
    var listId = $('#list-id').text();
    deleteFromDB(listId);
    cachedItems.length = 0;
    $('#remove-list').hide();
    $('#history').empty();
});
$('#item').on('click', '#delete-current', function(){
    var index = $(this).prev().attr('id');
    removeFromCache(index);
    $(this).parent().empty();
});
$('#history').on('click', '#svd-delete', function(){
    var index = $(this).prev().attr('id');
    removeFromCache2(index);
    $(this).parent().empty();
});
    
















'use strict';
var idForCachedItems = 0;
var cachedItems = [];
var List = {};
var averageTwentyReturn = 4.42;
var removeFromCache = function(id){
    for (var x = 0; x < cachedItems.length; x++) {
        if (cachedItems[x].id == id) {
            cachedItems.splice(x, 1);
        }
    }
};
var removeIdFromCachedItems = function(){
    var exportableCachedItems = [];
    for (var x = 0; x < cachedItems.length; x++){
        exportableCachedItems.push(cachedItems[x].items);
    }
    return exportableCachedItems;
}
var postToDB = function(data){
    var ajax = $.ajax('/b', {
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify(data),
        contentType: 'application/json'
    });

    ajax.done(  function  (result)    {
        console.log(result._id);
        $('#listName').val('');
        $('#item').empty();
        cachedItems.length = 0;
        List = {};
        idForCachedItems = 0;
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
    var ajax = $.ajax('/b/' + id, {
        type: 'PUT',
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: 'application/json'
    }); 

    ajax.done(function(result){
        console.log(result);
    });
};
$('#history').on('click', '#svd-delete', function(){
    var index = $(this).prev().attr('id');
    removeFromCache(index);
    $(this).parent().empty();
});
// must include name, items with an array formatted as below
// var data = {"name": "bar", "items": [{item: "hat", price: "2"}]};
$('#update').click(function(){
    var listId = $('#list-id').text();
    List.items = cachedItems;
    editItem(listId, List);
    List = {};
});










var getPage = function(data){
    var ajax = $.ajax('/a', {
        type: 'GET',
        dataType: 'json',
        data: data,
        contentType: 'application/json'
    });
    ajax.done(  function  (result)    {
        List.name = result[0].name;
        var eachResult = result[0].items;
        for (var x = 0; x<eachResult.length; x++){
            cachedItems.push( { id: x, items: eachResult[x] });
            $('#history').append('<li><span id="'+ idForCachedItems + ' "></span> ' + eachResult[x].item + " " + eachResult[x].price + "<input type='submit'value='delete'id='svd-delete'></li>");
            idForCachedItems++;
            // cachedItems.push( eachResult[x] ) ;
        }
        // cachedItems.push(eachResult);
        // for (var x = 0; x<eachResult.length; x++){
        //     $('#history').append('<li><span id="'+ idForCachedItems + ' "></span> ' + eachResult[x].item + " " + eachResult[x].price + "<input type='submit'value='delete'id='svd-delete'></li>");
        //     idForCachedItems++;
        // }
        $('#history').append('<span id="list-id">' + result[0]._id + '</span>');
    });
};

// calculates function
var calculate = function(price, multiplyer) {
    return price * multiplyer;
};
var displayItem = function(item, price){
    $('#item').append('<li id="current-list"><span id="'+idForCachedItems+'">' + item  + "</span> $" + price + " " + "<input type='submit' value='delete' id='delete-current'></li>");
};
var cacheItem = function(item, price){
    cachedItems.push( { id: idForCachedItems, items: {item: item, price: price}  }  );
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
    idForCachedItems++;
});
// Save list with name for later retreival
$('#save').click(function(){
    if ($('#listName').val() === ""){
        alert("Please enter a name for your list.");
        return;
    } 
    List.name = $('#listName').val();
    List.items = removeIdFromCachedItems();
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
    var id = $(this).prev().attr('id');
    removeFromCache(id);
    $(this).parent().empty();
});
















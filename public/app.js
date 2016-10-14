'use strict';

//model
var idForCachedItems = 0;
var cachedItems = [];
var List = {};
var averageTwentyReturn = 4.42;
var existingList = false;
var clearModels = function(){
    cachedItems.length = 0;
    List = {};
    existingList = false;
};


//controller
var calculate = function(price, multiplyer) {
    return price * multiplyer;
};
var cacheItem = function(item, price){
    cachedItems.push( { id: idForCachedItems, items: {item: item, price: price}  }  );
};
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
// ENDPOINTS
// GET endpoint
var getPage = function(data){
    var ajax = $.ajax('/a', {
        type: 'GET',
        dataType: 'json',
        data: data,
        contentType: 'application/json'
    });
    ajax.done(  function  (result)    {
        List.name = result[0].name;
        displayListName(result[0].name);
        var eachResult = result[0].items;
        console.log(eachResult);
        for (var x = 0; x<eachResult.length; x++){
            cachedItems.push( { id: x, items: eachResult[x] });
            showSavedListByName(x, eachResult);
            idForCachedItems++;
        }
        store_id(result[0]._id);
    });
};

// POST endpoint
var postToDB = function(data){
    var ajax = $.ajax('/b', {
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify(data),
        contentType: 'application/json'
    });
    ajax.done(function(result){
        cachedItems.length = 0;
        List = {};
        idForCachedItems = 0;
    }); 
};
// PUT endpoint
var editItem = function(id, data){
    console.log(id, data);
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

// DELETE endpoint
var deleteFromDB = function(id){
    var ajax = $.ajax('/b/' + id, {
        type: 'DELETE',
        dataType: 'json'
    });
    ajax.done( function (result) {
        console.log(result);
    });
};

// Listeners
// Calculate item and add to list
$('#add-to-list').click(function(){ 
    var item = $('#item-bought').val();
    var price = parseInt($('#price-paid').val());
    var newPrice = calculate(price, averageTwentyReturn);
    displayItem(item, newPrice.toFixed(2));
    cacheItem(item, newPrice.toFixed(2));
    $('#item-bought').val('');
    $('#price-paid').val('');
    $('#item-bought').focus();
    idForCachedItems++;
});
// Delete item  list
$('#item').on('click', '#delete-item', function(){
    var id = $(this).parent().attr('id');
    removeFromCache(id);
    $(this).parent().remove();
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
    displayListName(List.name);
    $(this).prop("disabled",true);
});
// Retrieve previous lists with search name
$('#get-history').click(function(){
    if (existingList == true){
        alert("Please clear current list before viewing a new one.")
        return;
    }
    var search = $('#search').val();
    var searchName = {name: search};
    getPage(searchName);
    $('#search').val('');
    $('#remove-list').show();
    $('#clear').show();
    $('#save').prop("disabled",true);
    existingList = true;
});
//Save updated list to data base
$('#save-updated-list').click(function(){
    var listId = $('#list-id').text();
    List.items = removeIdFromCachedItems();
    console.log(cachedItems);
    editItem(listId, List);
    List = {};
});
// Clear previous list
$('#clear').click(function(){
    clearViews();
    clearModels();
});

// Delete previous lists
$('#remove-list').click(function(){
    var listId = $('#list-id').text();
    deleteFromDB(listId);
    clearViews();
    clearModels();
});


//views
var clearViews = function(){
    $('#remove-list').hide();
    $('#clear').hide();
    $('#item').empty();
};
var showSavedListByName = function(index, value){
    $('#item').append('<li id='+idForCachedItems+'><span class="first"> '  + value[index].item +    '</span> <span class="second">' + value[index].price + "</span><input type='submit'value='delete'id='delete-item'></li>");
};
var store_id = function(id){
    $('#item').append('<span id="list-id">' + id + '</span>');
};
var clearElementAfterPost = function(){
        $('#listName').val('');
        $('#item').empty();
};
var displayItem = function(item, price){
    $('#item').append('<li id='+idForCachedItems+'><span class="first">' + item  + '</span> <span class="second">' + price + '</span><input type="submit" value="delete" id="delete-current"></li>');
};
var displayListName = function(name) {
    $('#item').prepend('<span id="list-name">'+name+'</span>');
};


 









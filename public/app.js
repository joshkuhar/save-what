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

var createItem = function(item, price){
    return {item: {itemName: item, priceLater: price}};
};

var addItemIdToCache = function(result){
    cachedItems[idForCachedItems - 1]._id = result._id;
};

//controller
var calculate = function(price, multiplyer) {
    return price * multiplyer;
};
var cacheItem = function(item, price){
    cachedItems.push( { id: idForCachedItems, item: {itemName: item, priceLater: price}  }  );
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
        exportableCachedItems.push( {_id: cachedItems[x]._id, items: cachedItems[x].item} );
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

var postItem = function(item){
    var ajax = $.ajax('/b', {
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify(item),
        contentType: 'application/json'
    });
    ajax.done(function(result){
        console.log(result);
        addItemIdToCache(result);

    });
}

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
    idForCachedItems++;
    postItem(createItem(item, newPrice));
    $('#item-bought').val('');
    $('#price-paid').val('');
    $('#item-bought').focus();
    showClearAndUpdate();
    showSaveAndUpdate();
    

});

// !!!!must update endpoint for deleting items.
// Delete item from  list
$('#item').on('click', '#delete-item', function(){
    var id = $(this).parent().attr('id');
    removeFromCache(id);
    $(this).parent().remove();
    console.log("clicked");
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
    $('#listName').val("");
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
    showClearAndUpdate();
    showSaveAndUpdate();
    existingList = true;
    $('#truevalue').show();
    $('#save').prop("disabled",false);
});
//Save updated list to data base
$('#save-updated-list').click(function(){
    var listId = $('#list-id').text();
    List.items = removeIdFromCachedItems();
    editItem(listId, List);
    List = {};
});
// Clear previous list
$('#clear').click(function(){
    clearViews();
    clearModels();
    $('#save').prop("disabled",false);
    $('#bottom').hide();
    $('#truevalue').hide();
});

// Delete previous lists
$('#remove-list').click(function(){
    var listId = $('#list-id').text();
    deleteFromDB(listId);
    clearViews();   
    clearModels();
    $('#truevalue').hide();
    $('#bottom').hide();
    $('#save').prop("disabled",false);
});


//views
var clearViews = function(){
    $('#remove-list').hide();
    $('#clear').hide();
    $('#item').empty();
    $('#name').empty();
};
var showSavedListByName = function(index, value){
    var listItemOpen = '<li id=' + idForCachedItems + '>';
    var firstSpan = '<span class="first">' + value[index].item + '</span>';
    var secondSpan = '<span class="second">$' + value[index].price + '</span>';
    var deleteBttn = '<input type="submit" value="delete" id="delete-item">';
    var listItemClose = '</li>';

    $('#item').append(listItemOpen + firstSpan + secondSpan + deleteBttn + listItemClose);
};
var store_id = function(id){
    $('#item').append('<span id="list-id">' + id + '</span>');
};
var clearElementAfterPost = function(){
        $('#listName').val('');
        $('#item').empty();
};
var displayItem = function(item, price){
    var open = '<li id='+idForCachedItems+'>';
    var firstSpan = '<span class="first">' + item  + '</span>';
    var secondSpan = '<span class="second">$' + price + ' </span>';
    var deleteBttn = '<input type="submit" value="delete" id="delete-item">';
    var listItemClose = '</li>';
    $('#item').append(open + firstSpan + secondSpan + deleteBttn + listItemClose);
    $('#truevalue').show();
};

var displayListName = function(name) {
    $('#name').prepend('<span id="list-name">List Name: '+name+'</span>');
};
var showClearAndUpdate = function(){
    $('#remove-list').show();
    $('#clear').show();
};
var showSaveAndUpdate = function(){
    $('#bottom').show();
};


 



    





'use strict';

//model
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
var createItem = function(item, price){
    return {item: {name: item, price: price}};
};
var calculate = function(price, multiplyer) {
    return price * multiplyer;
};
var cacheItem = function(item){
    cachedItems.push(item);
};
var removeFromCache = function(id){
    for (var x = 0; x < cachedItems.length; x++) {
        if (cachedItems[x]._id == id) {
            deleteFromDB(cachedItems[x]._id);
            cachedItems.splice(x, 1);
        }
    }
};
// ENDPOINTS
// GET endpoint
var getCategory = function(name){
    var ajax = $.ajax('/category/' + name, {
        type: 'GET',
        dataType: 'json',
        // data: data,
        contentType: 'application/json'
    });
    ajax.done(  function  (result)    {
        $('#delete-category').show();
        displayCategoryName(result._id, result.name);
        for (var indx = 0; indx<result.items.length; indx++){
            var x = result.items[indx];
            displayItem(x._id, x.item.name, x.item.price);
        }
    });
};
// POST ENDPOINTS
var postCategoryName = function(name){
    var ajax = $.ajax('/category', {
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify(name),
        contentType: 'application/json'
    });
    ajax.done(function(result){
        cacheItem(result);
        displayCategoryName(result._id, result.name);
    });
}
var postItem = function(id, item){
    var ajax = $.ajax('/item/'+id, {
        type: 'POST',
        dataType: 'json',
        data: JSON.stringify(item),
        // data: JSON.stringify(item),
        contentType: 'application/json'
    });
    ajax.done(function(result){
        console.log("I'm " + result);
        cacheItem(result);
        displayItem(result._id, result.item.name, result.item.price);
    });
}

// PUT endpoint delete item from list
var editItem = function(id, data){
    var ajax = $.ajax('/item/' + id, {
        type: 'PUT',
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: 'application/json'
    }); 
    ajax.done(function(result){
        console.log(result);
    });
};

// DELETE item from database
var deleteFromDB = function(id){
    var ajax = $.ajax('/item/' + id, {
        type: 'DELETE',
        dataType: 'json'
    });
    ajax.done( function (result) {
        console.log(result);
    });
};
var deleteCategory = function(id){
    var ajax = $.ajax('/category/' + id, {
        type: 'DELETE',
        dataType: 'json'
    });
    ajax.done( function (result) {
        console.log(result);
    });
}

// Listeners
// Calculate item and add to list
$('#add-to-list').click(function(){ 
    var item = $('#item-bought').val();
    var price = parseInt($('#price-paid').val());
    var newPrice = calculate(price, averageTwentyReturn);


    var id = $('.category-name').attr('id');
    postItem(id, createItem(item, newPrice));
    $('#item-bought').val('');
    $('#price-paid').val('');
    $('#item-bought').focus();
    showClearDelete();
});

// Delete item from  list
$('#item').on('click', '#delete-item', function(){
    var id = $(this).parent().attr('id');
    console.log(id);
    $(this).parent().remove();
    deleteFromDB(id);
    });
// Save list name
$('#save').click(function(){
    if ($('#listName').val() === ""){
        alert("Please enter a name for your list.");
        return;
    } 
    var categoryName = $('#listName').val();
    postCategoryName({name: categoryName});
    $('#listName').val("");
    // $(this).prop("disabled",true);
});
// Retrieve previous lists with search name
$('#get-category').click(function(){
    if (existingList == true){
        alert("Please clear current list before viewing a new one.")
        return;
    }
    var search = $('#search').val();    
    getCategory(search);
    $('#search').val('');
    showClearDelete();
    existingList = true;
    $('#truevalue').show();
    $('#name').show();
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
    // $('#delete-category').css('display', 'none');
    $('#clear').hide();
    $('#item').empty();
    $('#name').hide();
    $('#cat-container').empty();
    clearModels();
    $('#save').prop("disabled",false);
    $('#bottom').hide();
    $('#truevalue').hide();
});

// Delete previous lists
$('#delete-category').click(function(){
    var id = $('#cat-container span:first-child').attr('id');
    deleteCategory(id);
    clearViews();   
    clearModels();
    $('#truevalue').hide();
    $('#bottom').hide();
    $('#save').prop("disabled",false);
});

//views
var clearViews = function(){
    $('#delete-category').css('display', 'none');
    $('#clear').hide();
    $('#item').empty();
    $('#name').empty();
    $('#cat-container').empty();
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
var displayItem = function(id, item, price){
    var open = '<li id='+id+'>';
    var firstSpan = '<span class="first">' + item  + '</span><input class="editName"type="text"autofocus>';
    var secondSpan = '<span class="second">$' + price + ' </span>';
    var deleteBttn = '<input type="submit" value="delete" id="delete-item">';
    var listItemClose = '</li>';
    $('#item').append(open + firstSpan + secondSpan + deleteBttn + listItemClose);
    $('#truevalue').show();
};
// edit item name
$('#item').on('click', 'span', function(){
    $(this).hide().next().show();
    $('.editName').on('keydown', function(event){
        var id = $(this).parent().attr('id');
        var name = $(this).val();
        if(event.keyCode == 13) {
            editItem(id, {item: {name: name}});
            $(this).val('');
            $(this).hide().prev().text(name).show();
        }
    });
});

var displayCategoryName = function(id, name) {
    $('#cat-container').append('<span class="category-name"id="'+id+'">Name: '+name+'</span>');
};
var showClearDelete = function(){
    $('#delete-category').show();
    $('#clear').show();
    $('#bottom').show();
};

$('#login-page').on('click', function(){
    $('#login-form').show();
    });

$('#foot2').on('click', function(){
    console.log('click');
    // $('#foot2').hide();
    // $('#foot').show().css('background', 'transparent');    
    console.log($(this).text());

});






    





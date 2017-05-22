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
var token = null;
//controller
var createItem = function(item, price){
    return {item: {name: item, price: price}};
};
var calculate = function(price, multiplier) {
    return price * multiplier;
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
        if(result == null){
            console.log("Category doesn't exist");
            return;
        }
        displayCategoryName(result._id, result.name);
        for (var indx = 0; indx<result.items.length; indx++){
            var x = result.items[indx];
            displayItem(x._id, x.item.name, x.item.price);
        }
        $('#search').val('');
        showClearDelete();
        existingList = true;
        $('#truevalue').css('display', 'inline-block');
        
        $('#save').prop("disabled",false);
        $('#cat-name-input').hide();
        $('#cat-list').show();
        $('#dcat').show();
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
        cacheItem(result);
        displayItem(result._id, result.item.name, result.item.price);
        $('#dcat').show();
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


// Save list name
$('#save').click(function(event){
    event.preventDefault();
    if ($('#listName').val() === ""){
        alert("Please enter a name for your list.");
        return;
    } 
    var categoryName = $('#listName').val();
    postCategoryName({name: categoryName});
    $('#listName').val("");
    $('#cat-name-input').hide();
    // $('#instructions-top').hide();
    $('#cat-list').show();
    // $(this).prop("disabled",true);
});


// Calculate item and add to list
$('#add-to-list').click(function(event){ 
    event.preventDefault();
    if ($('#item-bought').val() === '' ) {
        alert("Please enter what you bought")
        return
    }
    if ($('#price-paid').val() === '' ) {
        alert("Please enter what you paid")
        return
    }
    var item = $('#item-bought').val();
    var price = parseFloat($('#price-paid').val()).toFixed(2);//parseFloat.toFixed(2)
    if ( isNaN(price) ) {
        alert("Please enter a number for what you paid")
        return
    }
    var newPrice = calculate(price, averageTwentyReturn);
    var id = $('.category-name').attr('id');
    postItem(id, createItem(item, newPrice.toFixed(2)));
    $('#item-bought').val('');
    $('#price-paid').val('');
    $('#item-bought').focus();
    showClearDelete();
    $('#dcat').show();

});

// Delete item from  list
$('#item').on('click', '#delete-item', function(event){
    event.preventDefault();
    var id = $(this).parent().attr('id');
    console.log(id);
    $(this).parent().remove();
    deleteFromDB(id);
    });

// Retrieve previous lists with search name
$('#get-category').click(function(event){
    event.preventDefault();
    if ($('#search').val() == '' ){
        alert("Please enter a list name to search for.")
        return;
    }
    if (existingList == true){
        alert("Please clear current list before viewing a new one.")
        return;
    }
    var search = $('#search').val();    
    getCategory(search);
});
//Save updated list to data base
$('#save-updated-list').click(function(event){
    event.preventDefault();
    var listId = $('#list-id').text();
    List.items = removeIdFromCachedItems();
    editItem(listId, List);
    List = {};
});
// Clear previous list
$('#clear').click(function(event){
    event.preventDefault();
    // $('#delete-category').css('display', 'none');
    $('#clear').hide();
    $('#item').empty();
    $('#cat-container').empty();
    clearModels();
    $('#save').prop("disabled",false);
    $('#bottom').hide();
    $('#truevalue').hide();
    $('#cat-name-input').show();
    $('#cat-list').hide();
    $('#dcat').hide();
});

// Delete previous lists
$('#dcat').click(function(event){
    event.preventDefault();
    var id = $('#cat-container span:first-child').attr('id');
    deleteCategory(id);
    clearViews();   
    clearModels();
    $('#truevalue').hide();
    $('#bottom').hide();
    $('#save').prop("disabled",false);
    $('#cat-list').hide();
    $('#cat-name-input').show();
    $('#dcat').hide();
});

//views
var clearViews = function(){
    $('#dcat').hide();
    $('#clear').hide();
    $('#item').empty();
    // $('#name').empty();
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
    var deleteBttn = '<button class="delete-button" id="delete-item">x</button>';
    var listItemClose = '</li>';
    $('#item').append(open + firstSpan + secondSpan + deleteBttn + listItemClose);
    $('#truevalue').css('display', 'inline-block');
};

$('#hover-icon').mouseenter(function(){
    $('#hover-explanation').css('display', 'inline-block');
});
$('#hover-icon').mouseleave(function(){
    $('#hover-explanation').css('display', 'none');
});
// edit item name
$('#item').on('click', 'span', function(event){
    event.preventDefault();
    $(this).hide().next().show();
    $('.editName').on('keydown', function(event){
        event.preventDefault();
        var id = $(this).parent().attr('id');
        var name = $(this).val();
        if(event.keyCode == 13) {
            editItem(id, {item: {name: name}});
            $(this).val('');
            $(this).hide().prev().text(name).show();
        }
    });
});

$('#cat-container').on('click', 'span', function(event){
    event.preventDefault();
    $('.category-name').hide();
    $('#cat-name').show();
    $('#cat-name').on('keydown', function(event){
        var id = $(this).prev().attr('id');
        var name = $(this).val();
        if(event.keyCode == 13) {
            editCategoryName(id, {name: name});
            $(this).val(' ');
            $(this).hide().prev().text(name).show();
        }
    });
});
var editCategoryName = function(id, data){
    var ajax = $.ajax('/category/' + id, {
        type: 'PUT',
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: 'application/json'
    });
    ajax.done(function(result){
        console.log(result);
    });
};

$('#start-create').on('click', function(){
    $('#login-credentials').hide();
    $('#create-credentials').show();
});

var displayCategoryName = function(id, name) {
    $('#cat-container').append('<span class="category-name"id="'+id+'">'+name+'</span><input id="cat-name"type="text"autofocus>');

};
var showClearDelete = function(){
    $('#dcat').show();
    $('#clear').show();
    $('#bottom').show();
};


$('#foot2').on('click', function(){
    console.log('click');
    // $('#foot2').hide();
    // $('#foot').show().css('background', 'transparent');    
    console.log($(this).text());

});






    





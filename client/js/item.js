
var main = function(Objects,Category) {
    "use strict";
    for(var i = 0;i < Category.length;i++){
        var $b = $("<a href = \" \">");
        if(i === 0){
            var $a = $("<span class = \"active\">").text(Category[i].name);
            $b.append($a)
        } 
        else{
            var $a = $("<span>").text(Category[i].name);
            $b.append($a)
        }
        $("body .tabs").append($b);
    }
    $(".tabs a span").toArray().forEach(function(element) {
        $(element).on("click", function() {

            var $element = $(element),
                $pricelist,$pricelist1,temp=[];

            $(".tabs a span").removeClass("active");
            $element.addClass("active");
            $("#pricelist").empty();
            for(var i = 0;i < Objects.length;i++){
                if($(element).text() === Objects[i].tag){
                    temp.push(Objects[i]);
                }
            }
            $pricelist = $("<div id = pricelist>");
            for (var i = 0; i <temp.length; i++) {
                if(i == temp.length-1){
                    $pricelist1 = $("<div id = pricelist2>");
                }
                else {
                    $pricelist1 = $("<div id = pricelist1>");
                }
                $pricelist1.append($("<h3>").text(temp[i].name));
                $pricelist1.append($("<h1>").text(temp[i].price));
                $pricelist1.append(RedItem(temp[i],Category,function(){
                    console.log("aaa");
                }))
                $pricelist1.append(DelItem(temp[i],function(){
                    console.log("aaa");
                }))
                $pricelist.append($pricelist1);
            }
            $pricelist.append(CreateNew(Category));
            $("body #pricelist").append($pricelist);
            var $buttonAdd = $("<button>").text("Добавить категорию");
            $buttonAdd.addClass("content_order_items_item_button");
            $buttonAdd.on("click",function(){
                var $content = $("<div>"),
                $popup = $("<div>"),
                $buttonZap = $("<button>").text("Добавить"),
                $buttonCancle = $("<button>").text("Отмена"),
                $lableName = $("<label>").text("Введите категорию: ");
                $content.addClass("content_container_popup");
                $popup.addClass("content_popup");
                $buttonZap.addClass("content_popup_button");
                $buttonCancle.addClass("content_popup_button");
            
                $buttonZap.on("click", function() {
                var category = $(".content_popup_input_login").val();
                if (category.trim() !== "") {
                    var newCategory = {
                        "name":category
                    };
                    $.post("/category", newCategory, function(result) {
                    console.log(result);
                    }).done(function(responde) {
                    console.log(responde);
                    popUpHideWithSuccess();
                    }).fail(function(jqXHR, textStatus, error) {
                    console.log(error);
                    if (jqXHR.status === 501) {
                    alert("Произошла ошибка!");
                    } else {
                    alert("Произошла ошибка!\n" + jqXHR.status + " " + jqXHR.textStatus);
                    }
                    });
                }
            })
            $buttonCancle.on("click", popUpHideWithCancle);
            $popup.append($lableName);
            $popup.append($("<input>").addClass("content_popup_input_login"));
            $popup.append($buttonZap);
            $popup.append($buttonCancle);
            $content.append($popup);
            $("main").append($content);    
        })
        var $buttonRed = $("<button>").text("Редактировать");
            $buttonRed.addClass("content_order_items_item_button");
            $buttonRed.on("click",function(){
                var $content = $("<div>"),
                $popup = $("<div>"),
                $buttonZap = $("<button>").text("Редактировать"),
                $buttonCancle = $("<button>").text("Отмена"),
                $lableName = $("<label>").text("Введите название: "),
                $lableName1 = $("<label>").text("Выберите категорию: "),
                $select1 = $("<select>");
                for(var i = 0;i<Category.length;i++){
                    $select1.append(($("<option>")).text(Category[i].name));
                }
                $content.addClass("content_container_popup");
                $popup.addClass("content_popup");
                $buttonZap.addClass("content_popup_button");
                $buttonCancle.addClass("content_popup_button");
            
                $buttonZap.on("click", function() {
                var category = $(".content_popup_input_login").val();
                if (category.trim() !== "") {
                    $.ajax({
                        'url': '/category/' +  $(".content_popup_input_role").val(),
                        'type': 'PUT',
                        'data': { "name": category},
                        success: function(responde){
                            popUpHideWithSuccess();
                        },
                        error: function(responde){
                            alert("error");
                        }
                    }).done(function(responde) {
                        console.log(responde);
                    }).fail(function(jqXHR, textStatus, error) {
                        console.log(error);
                        alert("Произошла ошибка!\n" + jqXHR.status + " " + jqXHR.textStatus);
                    })
                }
            })
            $buttonCancle.on("click", popUpHideWithCancle);
            $popup.append($lableName1);
            $popup.append($select1.addClass("content_popup_input_role"));
            $popup.append($lableName);
            $popup.append($("<input>").addClass("content_popup_input_login"));
            $popup.append($buttonZap);
            $popup.append($buttonCancle);
            $content.append($popup);
            $("main").append($content);    
        })
        var $buttonDel = $("<button>").text("Удалить категорию");
            $buttonDel.addClass("content_order_items_item_button");
            $buttonDel.on("click",function(){
                var $content = $("<div>"),
                $popup = $("<div>"),
                $buttonZap = $("<button>").text("Удалить"),
                $buttonCancle = $("<button>").text("Отмена"),
                $lableName1 = $("<label>").text("Выберите категорию: "),
                $select1 = $("<select>");
                for(var i = 0;i<Category.length;i++){
                    $select1.append(($("<option>")).text(Category[i].name));
                }
                $content.addClass("content_container_popup");
                $popup.addClass("content_popup");
                $buttonZap.addClass("content_popup_button");
                $buttonCancle.addClass("content_popup_button");
            
                $buttonZap.on("click", function() {
                    $.ajax({
                        'url': '/category/' +  $(".content_popup_input_role").val(),
                        'type': 'DELETE',
                        success: function(responde){
                            popUpHideWithSuccess();
                        },
                        error: function(responde){
                            alert("error");
                        }
                    }).done(function(responde) {
                        console.log(responde);
                        popUpHideWithSuccess();
                    }).fail(function(jqXHR, textStatus, error) {
                        console.log(error);
                        alert("Произошла ошибка!\n" + jqXHR.status + " " + jqXHR.textStatus);
                    })
                })
            $buttonCancle.on("click", popUpHideWithCancle);
            $popup.append($lableName1);
            $popup.append($select1.addClass("content_popup_input_role"));
            $popup.append($buttonZap);
            $popup.append($buttonCancle);
            $content.append($popup);
            $("main").append($content);    
        })
            $pricelist.append($buttonAdd);
            $pricelist.append($buttonRed);
            $pricelist.append($buttonDel);
            return false;

        });
        
    });
    $(".tabs a:first-child span").trigger("click");

    
    
};
var RedItem = function(item,Category, callback) {
    var $buttonRed = $("<button>");
    $buttonRed.addClass("content_order_items_item_button");
    $buttonRed.text("Редактировать");

    $buttonRed.on("click", function() {
        var $content = $("<div>"),
                $popup = $("<div>"),
                $buttonZap = $("<button>").text("Редактировать"),
                $buttonCancle = $("<button>").text("Отмена"),
                $lableName = $("<label>").text("Название услуги: "),
                $lableName1 = $("<label>").text("Цена: ");
                $lableName2 = $("<label>").text("Категория: "),
                $select1 = $("<select>");
                for(var i = 0;i<Category.length;i++){
                    $select1.append(($("<option>")).text(Category[i].name));
                }
                $content.addClass("content_container_popup");
                $popup.addClass("content_popup");
                $buttonZap.addClass("content_popup_button");
                $buttonCancle.addClass("content_popup_button");
            
                $buttonZap.on("click", function() {
                var name = $(".content_popup_input_login").val();
                var tag = $(".content_popup_input_role").val();
                var price =$(".content_popup_input_price").val();

                if (name.trim() !== "" && price.trim() !== "") {
                    $.ajax({
                        "url": "/item/" + item._id,
                        "type": "PUT",
                        "data": { "name": name, "price": price,"tag":tag },
                        success: function(responde){
                            console.log("uebok");
                            popUpHideWithSuccess()
                        },
                        error: function(responde){
                            alert("error")
                        }
                    }).done(function(responde) {
                        console.log(responde);
                        popUpHideWithSuccess();
                    }).fail(function(err) {
                        console.log("Произошла ошибка: " + err);
                    });
                }
            })
            $buttonCancle.on("click", popUpHideWithCancle);
            $popup.append($lableName);
            $popup.append($("<input>").addClass("content_popup_input_login"));
            $popup.append($lableName1);
            $popup.append($select1.addClass("content_popup_input_role"));
            $popup.append($lableName2);
            $popup.append($("<input>").addClass("content_popup_input_price"));
            $popup.append($buttonZap);
            $popup.append($buttonCancle);
            $content.append($popup);
            $("main").append($content);
            $(".content_popup_input_login").attr("value", item.name);
            $(".content_popup_input_price").attr("value", item.price);
            for(var i =0;i<Category.length;i++){
                if(item.tag === Category[i].name) $("select:nth-child(" + (i+1)+ ")").attr("selected","");
            }
        return false;
    });

    return $buttonRed;
}
var DelItem = function(item, callback) {
    var $buttonDel = $("<button>");
    $buttonDel.addClass("content_order_items_item_button");
    $buttonDel.text("Удалить");

    $buttonDel.on("click", function() {
        var $content = $("<div>"),
                $popup = $("<div>"),
                $buttonZap = $("<button>").text("Удалить"),
                $lableName = $("<label>").text("Действительно удалить? "),
                $buttonCancle = $("<button>").text("Отмена");
                $content.addClass("content_container_popup");
                $popup.addClass("content_popup");
                $buttonZap.addClass("content_popup_button");
                $buttonCancle.addClass("content_popup_button");
                $buttonZap.on("click", function() {
                    $.ajax({
                        'url': '/item/' + item._id,
                        'type': 'DELETE',
                        success: function(){
                            popUpHideWithSuccess();
                        },
                        error: function(){
                            alert("error");
                        }
                    }).done(function(responde) {
                        console.log(responde);
                        popUpHideWithSuccess();
                    }).fail(function(jqXHR, textStatus, error) {
                        console.log(error);
                        alert("Произошла ошибка!\n" + jqXHR.status + " " + jqXHR.textStatus);
                    });
                })
                $buttonCancle.on("click", popUpHideWithCancle);
                $popup.append($lableName);
                $popup.append($buttonZap);
                $popup.append($buttonCancle);
                $content.append($popup);
                $("main").append($content); 
        return false;
    });
    return $buttonDel;
}
var CreateNew = function(Category,callback){
    var $buttonAdd = $("<button>").text("Добавить");
    $buttonAdd.addClass("content_order_items_item_button");

    $buttonAdd.on("click", () => {
        var $content = $("<div>"),
                $popup = $("<div>"),
                $buttonZap = $("<button>").text("Удалить"),
                $lableName = $("<label>").text("Название услуги: "),
                $lableName1 = $("<label>").text("Цена: "),
                $lableName2 = $("<label>").text("Категория: "),
                $select1 = $("<select>");
                for(var i = 0;i<Category.length;i++){
                    $select1.append(($("<option>")).text(Category[i].name));
                }
                $buttonCancle = $("<button>").text("Отмена");
                $content.addClass("content_container_popup");
                $popup.addClass("content_popup");
                $buttonZap.addClass("content_popup_button");
                $buttonCancle.addClass("content_popup_button");
                $buttonZap.on("click", function() {
                    var name = $(".content_popup_input_login").val();
                    var tag = $(".content_popup_input_role").val();
                    var price =$(".content_popup_input_price").val();
                    if(name.trim() !== "" && price.trim() !== "" ){
                        $.ajax({
                            "url": "/item/",
                            "type": "POST",
                            "data": { "name": name, "price": price,"tag":tag},
                            success:function(){
                                popUpHideWithSuccess();
                            },
                            error:function(){
                                popUpHideWithCancle();
                            }
                        }).done(function(responde) {
                            console.log(responde);
                            popUpHideWithSuccess();
                        }).fail(function(err) {
                            console.log("Произошла ошибка: " + err);
                        });
                    }
                })
                $buttonCancle.on("click", popUpHideWithCancle);
                $popup.append($lableName);
                $popup.append($("<input>").addClass("content_popup_input_login"));
                $popup.append($lableName1);
                $popup.append($("<input>").addClass("content_popup_input_price"));
                $popup.append($lableName2);
                $popup.append($select1.addClass("content_popup_input_role"));
                $popup.append($buttonZap);
                $popup.append($buttonCancle);
                $content.append($popup);
                $("main").append($content); 
            })
            return $buttonAdd;
}
var popUpHideWithCancle = function(){
    $(".content_container_popup").remove();
    }
    
 var popUpHideWithSuccess =  function(){
    $(".content_popup").empty();
    $(".content_popup").append($("<label>").addClass("sucscess").text("Успешно!"));
    setTimeout(() => {
    $(".content_container_popup").hide();
    location.reload();
    }, 3000);
    };
$(document).ready(function() {
    $.getJSON("/item",function(Objects){
        $.getJSON("/category",function(Category){
            main(Objects,Category);
        })
    })
});
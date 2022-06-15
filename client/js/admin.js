var main = function(ManagersObjects) {
    "use strict";

    var $content = $("<div>"),
    $content2 = $("<div>"),
    $content3 = $("<div>");
    $content2.addClass("content_order_items_item_name");
    $content3.addClass("content_order_items_item_client");
    $content.addClass("content_order_items");
    var $content1 = $("<div>");
    $content1.addClass("content_order_items_item");
    $content2.append($("<h3>").text("Логин"));
    $content3.append($("<h3>").text("Роль"));
    $content1.append($content2);
    $content1.append($content3);
    $content.append($content1);
    for (var i = 0; i < ManagersObjects.length; i++) {
        if(ManagersObjects[i].login === location.href.split("/")[4]) continue;
        var $elem = $("<div>"),
        $name = $("<div>"),
        $client = $("<div>"),
        $manager = $("<div>");

        $elem.addClass("content_order_items_item");
        $name.addClass("content_order_items_item_name");
        $client.addClass("content_order_items_item_client");
        $manager.addClass("content_order_items_item_manager");
        $elem.append($name);
        $elem.append($client);
        $elem.append($manager);
        $content.append($elem);
        $name.append($("<p>").text(ManagersObjects[i].login));
        $client.append($("<p>").text(ManagersObjects[i].role));
        $manager.append(RedManager(ManagersObjects[i]));
        $manager.append(DelManager(ManagersObjects[i]));
        }
    $("main .content").append($content);
    $("main .content").append(CreateNew());
};

var RedManager = function(manager, callback) {
    var $buttonRed = $("<button>").attr("href", "manager/" + manager._id);
    $buttonRed.addClass("content_order_items_item_button");
    $buttonRed.text("Редактировать");

    $buttonRed.on("click", function() {
        var $content = $("<div>"),
        $popup = $("<div>"),
        $buttonZap = $("<button>").text("Сохранить"),
        $buttonCancle = $("<button>").text("Отмена"),
        $lableName = $("<label>").text("Введите логин: "),
        $lableFName = $("<label>").text("Введите роль: "),
        $select1 = $("<select>");
        $select1.append(($("<option class = \"option1\">")).text("Администратор"));
        $select1.append(($("<option class = \"option2\">")).text("Менеджер"));
        $select1.append(($("<option class = \"option3\">")).text("Сотрудник"));
        $content.addClass("content_container_popup");
        $popup.addClass("content_popup");
        $buttonZap.addClass("content_popup_button");
        $buttonCancle.addClass("content_popup_button");
    
        $buttonZap.on("click", function() {
        var login = $(".content_popup_input_login").val(),
        role = $(".content_popup_input_role").val();
        if (login.trim() !== "") {
            $.ajax({
                'url': '/manager/' + manager.login,
                'type': 'PUT',
                'data': { "login":login, "role":role},
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
    });
    
        $buttonCancle.on("click", popUpHideWithCancle);
        $popup.append($lableName);
        $popup.append($("<input>").addClass("content_popup_input_login"));
        $popup.append($lableFName);
        $popup.append($select1.addClass("content_popup_input_role"));
        $popup.append($buttonZap);
        $popup.append($buttonCancle);
        $content.append($popup);
        $("main").append($content);
        $(".content_popup_input_login").attr("value", manager.login);
        if(manager.role === "Администратор") $(".option1").attr("selected","");
        else if(manager.role === "Менеджер") $(".option2").attr("selected","");
        else if(manager.role === "Сотрудник") $(".option3").attr("selected","");
    })

    return $buttonRed;
}


var DelManager = function(manager, callback) {
    var $buttonDel = $("<button>").attr("href", "manager/" + manager.login);
    $buttonDel.addClass("content_order_items_item_button");
    $buttonDel.text("Удалить");

    $buttonDel.on("click", function() {
        var $content = $("<div>"),
        $popup = $("<div>"),
        $buttonZap = $("<button>").text("Удалить"),
        $buttonCancle = $("<button>").text("Отмена"),
        $lableName = $("<label>").text("Точно удалить?");
        $content.addClass("content_container_popup");
        $popup.addClass("content_popup");
        $buttonZap.addClass("content_popup_button");
        $buttonCancle.addClass("content_popup_button");
        $buttonZap.on("click", function() {
                $.ajax({
                    'url': '/manager/' + manager.login,
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
                })})
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

var CreateNew = function(callback){
    var $buttonAdd = $("<button>").text("Добавить");
    $buttonAdd.addClass("content_order_items_item_button");

    $buttonAdd.on("click", () => {
        var $content = $("<div>"),
        $popup = $("<div>"),
        $buttonZap = $("<button>").text("Добавить"),
        $buttonCancle = $("<button>").text("Отмена"),
        $lableName = $("<label>").text("Введите логин: "),
        $lableFName = $("<label>").text("Введите роль: "),
        $select1 = $("<select>");
        $select1.append(($("<option>")).text("Администратор"));
        $select1.append(($("<option>")).text("Менеджер"));
        $select1.append(($("<option>")).text("Сотрудник"));
        $content.addClass("content_container_popup");
        $popup.addClass("content_popup");
        $buttonZap.addClass("content_popup_button");
        $buttonCancle.addClass("content_popup_button");
    
        $buttonZap.on("click", function() {
        var login = $(".content_popup_input_login").val(),
        role = $(".content_popup_input_role").val();
        if (login.trim() !== "") {
            var newManager = {
                "login":login,
                "role":role
            };
            $.post("/manager", newManager, function(result) {
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
        });
    
        $buttonCancle.on("click", popUpHideWithCancle);
        $popup.append($lableName);
        $popup.append($("<input>").addClass("content_popup_input_login"));
        $popup.append($lableFName);
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
    $.getJSON("/manager", function(ManagersObjects) {
        main(ManagersObjects);
    });
});
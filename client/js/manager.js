var main = function(ManagersObjects) {
    "use strict";
    var $butLogin = $('.content_items_item_button'),
    $input = $('.reg_input_name');

    $butLogin.on("click", function() {
        var login = $input.val(), flag, role;

        if (login !== null && login.trim() !== "") {
            for (var i = 0; i < ManagersObjects.length; i++) {
                if(ManagersObjects[i].login === login) {
                    flag = true;
                    role = ManagersObjects[i].role;
                }
            }
            if(flag){
                if(role === "Менеджер"){
                    $.ajax({
                    'url': '/manager/' + login,
                    'type': 'GET'
                }).done(function(responde) {
                    window.location.replace('manager/' + login + '/' + 'manager.html');
                }).fail(function(jqXHR, textStatus, error) {
                    console.log(error);
                    alert("Произошла ошибка!\n" + jqXHR.status + " " + jqXHR.textStatus);
                });
                }
                else if(role === "Администратор"){
                    $.ajax({
                        'url': '/manager/' + login,
                        'type': 'GET'
                    }).done(function(responde) {
                        window.location.replace('manager/' + login + '/' + 'admin.html');
                    }).fail(function(jqXHR, textStatus, error) {
                        console.log(error);
                        alert("Произошла ошибка!\n" + jqXHR.status + " " + jqXHR.textStatus);
                    });
                }
                else if(role === "Сотрудник"){
                    $.ajax({
                        'url': '/manager/' + login,
                        'type': 'GET'
                    }).done(function(responde) {
                        window.location.replace('manager/' + login + '/' + 'person.html');
                    }).fail(function(jqXHR, textStatus, error) {
                        console.log(error);
                        alert("Произошла ошибка!\n" + jqXHR.status + " " + jqXHR.textStatus);
                    });
                }
            }
            else alert("Такого пользователя не найдено!");
        }
    });
}

$(document).ready(function() {
    $.getJSON("/manager", function(ManagersObjects) {
        main(ManagersObjects);
    });
});
var main = function(RecordObjects){
    "use strict";
    console.log(RecordObjects);
    var $inputSurname = $(".side-panel .surname"),
    $inputName = $(".side-panel .name"),
    $inputTel = $(".side-panel .tel"),
    $but1 = $(".side-panel .but1")
    console.log("fdsf");
    $but1.on("click", function() {
        console.log("fdsf");
        var surname = $inputSurname.val(),
        name = $inputName.val(),
        tel = $inputTel.val();
        console.log(surname);
        if (surname !== null && surname.trim() !== "") {
            var newRecord = { "surname" : surname,"name":name,"tel":tel };
            $.post("/record", newRecord, function(result) {
                console.log(result);
                RecordObjects.push(newRecord);
            }).done(function(responde) {
                console.log(responde);
                alert('Успешно!');
                location.reload();
            }).fail(function(jqXHR, textStatus, error) {
                console.log(error);
                if (jqXHR.status === 501) {
                    alert("Не успешно");
                } else {
                    alert("Произошла ошибка!\n" + jqXHR.status + " " + jqXHR.textStatus);
                }
            });
        }
        
    });
};
$(document).ready(function() {
    $.get("/record",{}, function(UsersObjects) {
        main(UsersObjects);
    });
});
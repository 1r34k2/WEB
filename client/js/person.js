
var main = function(Objects) {
    "use strict";
    // var self=[];
    // for (var i = 0; i < Objects.length; i++) {
    //     if(Objects[i].login === location.href.split("/")[4]){
    //         self.push(Objects[i]);
    //     }
    // }
    var temp;
    $(".tabs a span").toArray().forEach(function(element) {
        $(element).on("click", function() {
            var $element = $(element),
            $pricelist;
            $(".tabs a span").removeClass("active");
            $element.addClass("active");
            if ($element.parent().is(":nth-child(1)")) {
                $("main .record").empty();
                var $pricelist,$pricelist1=$("<div class=\"records\">");
                temp=Objects;
                $pricelist = $("<div class=\"record\">");
                var $pricelist2 = $("<div class=\"record1\">");
                $pricelist2.append($("<h3>").text("Фамилия"));
                $pricelist2.append($("<h3>").text("Имя"));
                $pricelist2.append($("<h3>").text("Телефон"));
                $pricelist2.append($("<h3>").text("Дата"));
                $pricelist2.append($("<h3>").text("Время"));
                $pricelist.append($pricelist2);
                for (var i = 0; i <temp.length; i++) {
                    if(temp[i].status !== "Обрабатывается") continue;
                    $pricelist1.append($("<h3>").text(temp[i].surname));
                    $pricelist1.append($("<h3>").text(temp[i].name));
                    $pricelist1.append($("<h3>").text(temp[i].tel));
                    $pricelist1.append($("<h3>").text(temp[i].date));
                    $pricelist1.append($("<h3>").text(temp[i].time));
                    if(temp[i].date.trim() === "" && temp[i].time.trim() === "") $pricelist1.append(RedItem(temp[i],function(){
                        console.log("aaa");
                    }))
                    else $pricelist1.append($("<h3>").text(""));
                    $pricelist1.append(DelItem(temp[i],function(){
                        console.log("aaa");
                    }))
                    $pricelist.append($pricelist1);
                }
                $("main .record").append($pricelist);
                return false;
            } 
            else if ($element.parent().is(":nth-child(2)")) {
                $("main .record").empty();
                var $pricelist,$pricelist1=$("<div class=\"records\">");
                temp=Objects;
                $pricelist = $("<div class=\"record\">");
                var $pricelist2 = $("<div class=\"record1\">");
                $pricelist2.append($("<h3>").text("Фамилия"));
                $pricelist2.append($("<h3>").text("Имя"));
                $pricelist2.append($("<h3>").text("Телефон"));
                $pricelist2.append($("<h3>").text("Дата"));
                $pricelist2.append($("<h3>").text("Время"));
                $pricelist.append($pricelist2);
                for (var i = 0; i <temp.length; i++) {
                    if(temp[i].status === "Обрабатывается") continue;
                    $pricelist1.append($("<h3>").text(temp[i].surname));
                    $pricelist1.append($("<h3>").text(temp[i].name));
                    $pricelist1.append($("<h3>").text(temp[i].tel));
                    $pricelist1.append($("<h3>").text(temp[i].date));
                    $pricelist1.append($("<h3>").text(temp[i].time));
                    $pricelist1.append($("<h3>").text(""));
                    $pricelist1.append(DelItem1(temp[i],function(){
                        console.log("aaa");
                    }))
                    $pricelist.append($pricelist1);
                }
                $("main .record").append($pricelist);
                return false;                  
            };        
        });
    });
    $(".tabs a:first-child span").trigger("click");
           

    
};
var RedItem = function(record, callback) {
    var $buttonRed = $("<button>");
    $buttonRed.addClass("content_order_items_item_button");
    $buttonRed.text("Принять");

    $buttonRed.on("click", function() {
        var $content = $("<div>"),
        $popup = $("<div>"),
        $buttonZap = $("<button>").text("Сохранить"),
        $buttonCancle = $("<button>").text("Отмена"),
        $lableName = $("<label>").text("Введите дату: "),
        $lableFName = $("<label>").text("Введите время: ");
        $content.addClass("content_container_popup");
        $popup.addClass("content_popup");
        $buttonZap.addClass("content_popup_button");
        $buttonCancle.addClass("content_popup_button");
        $buttonZap.on("click", function() {
        var newRecordDate = $(".content_popup_input_login").val(),
        newRecordTime = $(".content_popup_input_role").val();
        if (newRecordDate.trim() !== "" && newRecordTime.trim() !== "") {
            $.ajax({
                "url": "/record/" + record._id,
                "type": "PUT",
                "data": { "date": newRecordDate, "time": newRecordTime,"status":record.status },
                success:function(){
                    popUpHideWithSuccess();
                },
                error:function(){
                    alert("error");
                }
            }).done(function(responde) {
                console.log(responde);
            }).fail(function(err) {
                console.log("Произошла ошибка: " + err);
            });
        }
    });
    
        $buttonCancle.on("click", popUpHideWithCancle);
        $popup.append($lableName);
        $popup.append($("<input>").addClass("content_popup_input_login"));
        $popup.append($lableFName);
        $popup.append($("<input>").addClass("content_popup_input_role"));
        $popup.append($buttonZap);
        $popup.append($buttonCancle);
        $content.append($popup);
        $("main").append($content);
        return false;
    })
        

    return $buttonRed;
}
var DelItem = function(record, callback) {
    var $buttonDel = $("<button>");
    $buttonDel.addClass("content_order_items_item_button");
    $buttonDel.text("Удалить");

    
    $buttonDel.on("click", function() {
        var $content = $("<div>"),
        $popup = $("<div>"),
        $buttonZap = $("<button>").text("Удалить"),
        $buttonCancle = $("<button>").text("Отмена"),
        $lableName = $("<label>").text("Действительно удалить?: ");
        $content.addClass("content_container_popup");
        $popup.addClass("content_popup");
        $buttonZap.addClass("content_popup_button");
        $buttonCancle.addClass("content_popup_button");
        $buttonZap.on("click", function() {
            $.ajax({
                'url': '/record/' + record._id,
                'type': 'PUT',
                'data':{"date":record.date,"time":record.time,"status":"Удалён"},
                success: function(){
                    popUpHideWithSuccess();
                },
                error: function(){
                    alert("error");
                }
            }).done(function(responde) {
                console.log(responde);
            }).fail(function(jqXHR, textStatus, error) {
                console.log(error);
                alert("Произошла ошибка!\n" + jqXHR.status + " " + jqXHR.textStatus);
            });
    });
    
        $buttonCancle.on("click", popUpHideWithCancle);
        $popup.append($lableName);
        $popup.append($buttonZap);
        $popup.append($buttonCancle);
        $content.append($popup);
        $("main").append($content);
        return false;
})
    return $buttonDel;
}
var DelItem1 = function(record, callback) {
    var $buttonDel = $("<button>");
    $buttonDel.addClass("content_order_items_item_button");
    $buttonDel.text("Удалить");

    $buttonDel.on("click", function() {
        var $content = $("<div>"),
        $popup = $("<div>"),
        $buttonZap = $("<button>").text("Удалить"),
        $buttonCancle = $("<button>").text("Отмена"),
        $lableName = $("<label>").text("Действительно удалить?: ");
        $content.addClass("content_container_popup");
        $popup.addClass("content_popup");
        $buttonZap.addClass("content_popup_button");
        $buttonCancle.addClass("content_popup_button");
        $buttonZap.on("click", function() {
            $.ajax({
                'url': '/record/' + record._id,
                'type': 'DELETE',
                success: function(){
                    popUpHideWithSuccess();
                },
                error: function(){
                    alert("error");
                }
            }).done(function(responde) {
                console.log(responde);
            }).fail(function(jqXHR, textStatus, error) {
                console.log(error);
                alert("Произошла ошибка!\n" + jqXHR.status + " " + jqXHR.textStatus);
            });
    });
    
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
    $.getJSON("/record",function(Objects){
        main(Objects);
    })
});
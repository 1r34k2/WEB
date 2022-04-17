var main = function() {
    "use strict";
    var cuts = [
        ["Женская стрижка (длина волос до 25 см.)","590Р"],
        ["Женская стрижка (длина волос от 25 см.)","780P"],
        ["Мужская стрижка (машинкой)","390P"],
        ["Мужская стрижка (ножницами, стайлинг)","590P"],
        ["Барбер стрижка","790P"],
        ["Детская стрижка","390P"],
        ["Стрижка челки","290P"],
        ["Коррекция формы бороды","390P"]
    ];
    var care = [
        ["Полировка волос","1590Р"],
        ["MONEPLEX Ultra-защита в окрашивании","1780P"],
        ["MONEPLEX Ultra-защита в окрашивании (суперосветление)","1390P"],
        ["MONEPLEX Ultra-защита при блондировании","1590P"],
        ["MONEPLEX Ultra-восстановление и защита волос","1790P"],
        ["MONE Professional Маска \"Экстремальное увлажнение\"","1390P"],
        ["MONE Professional Маска \"Защита и сохранение цвета\"","1290P"],
        ["MATRIX Экстремальное восстановление RE-Bond","2390P"],
        ["MATRIX Нейтрализация желтизны Brass off","1390P"],
        ["MATRIX Маска глубокого восстановления Total Treat","2390P"],
        ["MATRIX Восстанавливающий уход 5+Protopak","1390P"]
    ];
    var styling = [
        ["Укладка (в составе другой услуги)","290Р"],
        ["Укладка","580P"],
        ["Коктейльная прическа","1390P"],
        ["Свадебная прическа","2490P"],
        ["Простое плетение(1 коса)","290P"],
        ["Сложное плетение(1 коса)","390P"]
    ];
    var coloring = [
        ["MONE Professional Окрашивание корней (до 2 см)","1390Р"],
        ["MONE Professional Окрашивание (в один тон)","2580P"],
        ["MONE Professional Тонирование (в один тон)","1390P"],
        ["MONE Professional Тонирование (в составе другой услуги)","2490P"],
        ["MONE Professional Мелирование - Мини","2290P"],
        ["MONE Professional Мелирование Т-зоны","2290P"],
        ["MONE Professional Мелирование половины головы","2290P"],
        ["MONE Professional Мелирование всей головы","3290P"],
        ["MONE Professional Блондирование длины","2390P"]
    ];
    var temp;
    $(".tabs a span").toArray().forEach(function(element) {
        $(element).on("click", function() {

            var $element = $(element),
                $pricelist,$pricelist1;

            $(".tabs a span").removeClass("active");
            $element.addClass("active");
            $("#pricelist").empty();
            if ($element.parent().is(":nth-child(1)")) {
                temp = cuts;
            } else if ($element.parent().is(":nth-child(2)")) {
                temp = care;
            } else if ($element.parent().is(":nth-child(3)")) {
                temp = styling;
            } else if ($element.parent().is(":nth-child(4)")){
                temp = coloring;
            }
            $pricelist = $("<div id = pricelist>");
            for (var i = 0; i <temp.length; i++) {
                if(i == temp.length-1){
                    $pricelist1 = $("<div id = pricelist2>");
                }
                else {
                    $pricelist1 = $("<div id = pricelist1>");
                }
                $pricelist1.append($("<h3>").text(temp[i][0]));
                $pricelist1.append($("<h1>").text(temp[i][1]));
                $pricelist.append($pricelist1);
            }
            $("body #pricelist").append($pricelist);
            return false;
        });
    });
    $(".tabs a:first-child span").trigger("click");
};

$(document).ready(main);
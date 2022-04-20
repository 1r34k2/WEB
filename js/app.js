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
        
    ];
    var styling = [
        
    ];
    var coloring = [
        
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
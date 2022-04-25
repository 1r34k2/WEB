
var main = function(cutsObjects,careObjects,stylingObjects,coloringObjects) {
    "use strict";
    console.log(coloringObjects);
    var care = careObjects.map(function(car) {
        return car.description;
    });
    var cuts = cutsObjects.map(function(cut) {
        return cut.description;
    });
    var cutsPrices = cutsObjects.map(function(cut) {
        return cut.price;
    });
    var carePrices = careObjects.map(function(car) {
        return car.price;
    });
    var coloring = coloringObjects.map(function(col) {
        return col.description;
    });
    var coloringPrices = coloringObjects.map(function(col) {
        return col.price;
    });
    var styling = stylingObjects.map(function(sty) {
        return sty.description;
    });
    var stylingPrices = stylingObjects.map(function(sty) {
        return sty.price;
    });
    var temp,tempPrices;
    $(".tabs a span").toArray().forEach(function(element) {
        $(element).on("click", function() {

            var $element = $(element),
                $pricelist,$pricelist1;

            $(".tabs a span").removeClass("active");
            $element.addClass("active");
            $("#pricelist").empty();
            if ($element.parent().is(":nth-child(1)")) {
                temp = cuts;
                tempPrices = cutsPrices;
            } else if ($element.parent().is(":nth-child(2)")) {
                temp = care;
                tempPrices = carePrices;
            } else if ($element.parent().is(":nth-child(3)")) {
                temp = styling;
                tempPrices = stylingPrices;
            } else if ($element.parent().is(":nth-child(4)")){
                temp = coloring;
                tempPrices = coloringPrices;
            }
            $pricelist = $("<div id = pricelist>");
            for (var i = 0; i <temp.length; i++) {
                if(i == temp.length-1){
                    $pricelist1 = $("<div id = pricelist2>");
                }
                else {
                    $pricelist1 = $("<div id = pricelist1>");
                }
                $pricelist1.append($("<h3>").text(temp[i]));
                $pricelist1.append($("<h1>").text(tempPrices[i]));
                $pricelist.append($pricelist1);
            }
            $("body #pricelist").append($pricelist);
            return false;
        });
    });
    $(".tabs a:first-child span").trigger("click");
};

$(document).ready(function() {
    $.post("/care",{},function(callback1){
        $.post("/cuts",{},function(callback2){
            $.post("/styling",{},function(callback3){
                $.post("/coloring",{},function(callback4){
                    main(callback2,callback1,callback3,callback4);
                })
            })
        })
    })
});
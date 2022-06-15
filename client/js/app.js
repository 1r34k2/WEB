
var main = function(Objects,Category) {
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
                    $pricelist1 = $("<div id = pricelist6>");
                }
                else {
                    $pricelist1 = $("<div id = pricelist7>");
                }
                $pricelist1.append($("<h3>").text(temp[i].name));
                $pricelist1.append($("<h1>").text(temp[i].price));
                $pricelist.append($pricelist1);
            }
            $("body #pricelist").append($pricelist);
            return false;
        });
    });
    $(".tabs a:first-child span").trigger("click");
};

$(document).ready(function() {
    $.getJSON("/item",function(Objects){
        $.getJSON("/category",function(Category){
            main(Objects,Category);
        })
        
    })
});
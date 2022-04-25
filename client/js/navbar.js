const createNavBar = () => {
    let navbar = document.querySelector('navbar');

    navbar.innerHTML =
        '\
        <h3 id = stock_button><a href="stock.html">Акции</a></h3>\
        <h3 id = pricelist_button><a href="pricelist.html">Прайс лист</a></h3>\
        <h3 id = salons_button><a href="salons.html">О нас</a></h3>\
   ';
}
createNavBar();
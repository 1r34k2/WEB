const createFooter = () => {
     let footer = document.querySelector('footer');

     footer.innerHTML =
         '\
        <p class="footer-title">О компании</p>\
        <p class="info">Maecenas mollis ligula diam, a tincidunt ligula rutrum non. </p>\
        <p class="info">Обратная свзяь - irekkamalutdinov@yandex.ru</p>\
        <p class="info">Телефон - +7(999)999-99-99</p>\
        <div class="footer-social-container">\
            <div>\
                <a href="/policy" class="social-link">Политика конфиденциальности</a>\
                <a href="/UA" class="social-link">Пользовательское соглашение</a>\
                <a href="/index.html" class="social-link">На главную</a>\
            </div>\
        </div>\
    ';
 }
 createFooter();
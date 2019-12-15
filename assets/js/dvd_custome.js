$(document).ready(function () {

    let kunjungan = getCookie('lastVisited');

    // kunjungan == '' ? console.log('kos') : console.log('ada');;

    let nav_links = $('.rd-navbar-nav li');

    // console.log(getCookie('lastVisited'));
    // console.log(nav_links.innerText);

    for (let i = 0; i <= nav_links.length; i++) {
        let menu_txt = nav_links[i];

        if (nav_links[i].innerText == getCookie('lastVisited')) {
            console.log(menu_txt.firstChild);
            nav_links[i].click();
            // clickedMenu(nav_links[i], menu_txt)

        }
        // console.log(" =>  " + menu_txt);

    }
})

$('.rd-navbar-nav li').click(function (e) {
    e.preventDefault();
    let selectedMenu = $(this)[0].children;
    let Menu_li_send = $(this);
    let Menu_text_send = Menu_li_send[0].innerText;

    clickedMenu(Menu_li_send, Menu_text_send);


});

function clickedMenu(get_Menu_li = null, get_Menu_txt = null) {


    let Menu_li = get_Menu_li;
    let Menu_text = get_Menu_txt;
    let Menu_filtered = Menu_text.toLowerCase().split(' ');


    // console.log(Menu_li);

    // mengaktifkan menu
    Menu_li.addClass('active').siblings().removeClass('active');

    // mengaktifkan section halaman

    $(`#${Menu_filtered}`).fadeIn('slow').addClass('selected').siblings().fadeOut('slow').removeClass('selected');

    // memeriksa khusus kontak footer
    const contact_footer = $('#contact_footer');
    Menu_filtered[0] == "kontak" ? contact_footer.hide() : contact_footer.show();

    // scrolling page
    $("#ui-to-top").click()



    setCookie("lastVisited", get_Menu_txt, 360);

    // console.log(document.cookie);
    // console.log(getCookie('lastVisited'));

}


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
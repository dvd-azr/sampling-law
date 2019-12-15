$(document).ready(function () {

    let kunjungan = getCookie('lastVisited');

    // kunjungan == '' ? console.log('kos') : console.log('ada');;

    let nav_links = Array.from($('.rd-navbar-nav li'));

    let visited_link = nav_links.filter(nav => nav.textContent.toUpperCase().includes(kunjungan))

    visited_link[0].click()


    // console.log("Cookie Kunjungan => " +
    //     kunjungan);
    // console.log(visited_link[0].textContent);
    // console.log(document.cookie);


});


$('.rd-navbar-nav li').click(function (e) {
    e.preventDefault();
    let Menu_li_send = $(this);
    let Menu_text_send = Menu_li_send[0].innerText;

    clickedMenu(Menu_li_send, Menu_text_send);

    // console.log(Menu_text_send);
    // setCookie("lastVisited", Menu_text_send, 360);

});


function clickedMenu(get_Menu_li = null, get_Menu_txt = null) {


    let Menu_li = get_Menu_li;
    let Menu_text = get_Menu_txt;
    let Menu_filtered = Menu_text.toLowerCase().split(' ');

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



// Cookie Get & Set
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
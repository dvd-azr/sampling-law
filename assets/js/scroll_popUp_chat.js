let pertamakali = getCookie('popUp_init');
let pop_dhat_min = getCookie('popUp_min');
let sapa_pembuka = getCookie('sapa_pembuka');



const main_dchat_wrap = $('.main_dchat_wrapper');
const minimize = main_dchat_wrap.find('.btn__details a');
const dchat_btn = $('.dchat_btn__wrapper.init');
const mssg_box = main_dchat_wrap.find('.dchat_messages_box')
const input_groups = main_dchat_wrap.find('.input-group')


let pop_ke = 0;
let pop_min = 0;


// inisialisasi perfectScrollBar pada chat-body
mssg_box.perfectScrollbar();

$(document).on('scroll', function () {


    if (pertamakali == '' && pop_ke == 0) {
        pop_ke += 1;

        console.log("scrolling mase");
        console.log(pertamakali);
        console.log("init pop ke =>  " +
            pop_ke);

        setCookie("popUp_init", 1, 360);
        init_sambutan();


    } else if (pertamakali == 1 && pop_ke == 1) {

        // Jika PopUp di Minimize
        if (pop_dhat_min == 1) {


            main_dchat_wrap.removeClass('active').addClass('min');
            // Menampilkan triger chat 
            dchat_btn.removeClass('init').css({
                "visibility": "visible",
                "transition": "0.2s"
            });




        } else {

            console.log("masuk ke else");

            // jika halaman telah direfresh
            init_sambutan();



        }


        // console.log(pertamakali);
        // console.log(pop_ke);



    }
    // console.log(pop_ke);
    pop_ke += 1;

});

function notifSound(opsi) {
    const audio = new Audio("assets/sound/notify.mp3");

    opsi == 'on' ? audio.play() : audio.pause();

};


function init_sambutan() {

    if (sapa_pembuka != '' && sapa_pembuka == 1) {
        // Memunculkan popUp dr samping
        main_dchat_wrap.addClass('active');

        SapaPembuka('off');

    } else if (sapa_pembuka == 2) {
        // Memunculkan popUp dr samping
        main_dchat_wrap.addClass('active');
        SapaPembuka('off');
        tawaran('off');

    } else {



        setTimeout(() => {
            // Memunculkan popUp dr samping
            main_dchat_wrap.addClass('active');


            setTimeout(() => {

                setCookie("sapa_pembuka", 1, 360);
                SapaPembuka('on');


                setTimeout(() => {

                    tawaran('on');
                    setCookie("sapa_pembuka", 2, 360);

                }, 7000);


            }, 5000);


        }, 5000);

    }


}


function SapaPembuka(sound) {

    let tm = new Date().getHours();
    let sapaan = tm < 12 ? "Selamat Pagi" : 12 <= tm && tm < 17 ? "Selamat Siang" :
        "Selamat Malam";

    let pembuka = `
            <div class="message">
                <div class="message-content">
                    Hai, 😀 ${sapaan}
                </div>
            </div>
    
    `;
    $('.dchat_messages_box').addClass('pd_20').append(pembuka);
    notifSound(sound);

};



function tawaran(sound) {
    let tawar = `
            <div class="message">
                <div class="message-content">
                    Apakah ada sesuatu yang dapat kami bantu.?
                </div>
            </div>
            `;
    $('.dchat_messages_box').append(tawar).animate();
    notifSound(sound);

};




// ========================================
// Menjalankan tombol Minimize
minimize.on('click', function () {

    console.log("minimize");
    console.log(pop_min);

    main_dchat_wrap.addClass('min');

    // menangani saat max
    if (main_dchat_wrap.hasClass('max')) {

        main_dchat_wrap.toggleClass('max');
        dchat_btn.toggleClass('active');

    }
    setTimeout(() => {
        main_dchat_wrap.removeClass('active')
    }, 500);


    dchat_btn.removeClass('init').css({
        "visibility": "visible",
        "transition": "0.2s"
    });








    pop_min += 1;
    setCookie("popUp_min", 1, 360);


});

// ========================================

let dchat_btn_trigered = 0;
// Tombol Chat
dchat_btn.click(function () {
    $(this).toggleClass('active');
    // console.log($(this));

    main_dchat_wrap.toggleClass('max').toggleClass("min");

    $('#pesan').val('')
    $('.input-group-append').removeClass('show');

    dchat_btn_trigered += 1;
    // console.log(dchat_btn_trigered);


    if (sapa_pembuka != '' && sapa_pembuka == 1 && dchat_btn_trigered == 1) {

        SapaPembuka('off');

    } else if (sapa_pembuka == 2 && dchat_btn_trigered == 1) {

        SapaPembuka('off');
        tawaran('off');
    }




});

// ============================================

// menampilkan Input mssg
mssg_box.on('click', function () {
    console.log("body");

    main_dchat_wrap.find('.dchat_header').addClass('small');

    main_dchat_wrap.find('.dchat__controls').addClass('show');
    main_dchat_wrap.find('input .input-group').focus();
})


// ============================================

// menampilkan Tombol Kirim saat input tidak kosong
input_groups.find('#pesan').on('keyup', function (e) {
    const message = $(this).val();
    const send_btn = $(this).siblings();


    if (!$.trim(message) == '') {
        send_btn.addClass('show')

    } else {
        send_btn.removeClass('show')

    }
});

// =====================================================
// Mengirim Pesan User saat ENTER
input_groups.find('#pesan').on('keypress', function (e) {
    if (e.which == 13) {
        newMessage()
    }
});


// Mengirim Pesan User lewat Tombol
input_groups.find(".input-group-append").click(function () {
    newMessage();
});

// ======================================================

let mssg_counter = 0;

function newMessage() {

    const message = input_groups.find('#pesan').val();
    if ($.trim(message) == '') {
        // jika Pesan kosong
        return false;
    }

    const mssg = `
            <div class="message send">
                <div class="message-content">${message}</div>
            </div> 
           `;


    mssg_box.append(mssg);
    input_groups.find('#pesan').val(null);
    input_groups.find('.input-group-append').removeClass('show')

    updateScroll();

    if (mssg_counter == 0) {
        mssg_counter += 1;
        console.log("pesan pertama");
        contactsReply();
    } else {
        mssg_counter += 1
    }

    // console.log(mssg_counter);
};

function updateScroll() {
    // const $dchat_messages_box = $('.dchat_messages_box');
    mssg_box.scrollTop(mssg_box.prop("scrollHeight"));
    // update posisi perfectScrollBar
    mssg_box.perfectScrollbar('update');
};


function contactsReply() {
    let WA_Qr = `
            <div class="message">
                <div class="message-content">
                    <span class="img-thumbnail-variant-1" href="./assets/images/WA_qr_code/qr_WA-700px.png"
                        data-lightgallery="item">
                        <figure>
                            <img src="./assets/images/WA_qr_code/qr_WA-700px.png" alt="" width="886" height="668" />
                        </figure>

                    </span>

                    Silahkan click & scan QR code diatas agar terhubung langsung dengan kami melalui
                    WhatsAPP (WA) di handphone Anda.

                </div>
            </div>
        `;

    let Wa_link = `
        <div class="message">
            <div class="message-content">
                <a target="_blank"
                    href="https://api.whatsapp.com/send?phone=6281333936989&amp;text=Hai, Angker Lawyers . .">

                    Click disini untuk terhubung via browser desktop / android anda.
                    <img style="width: 48px;" src="./assets/images/whatsapp-icon-square.svg" alt="">
                </a>



            </div>
        </div>

`;


    setTimeout(() => {


        mssg_box.append($.trim(WA_Qr));
        notifSound('on');
        updateScroll();
        setTimeout(() => {
            mssg_box.append(Wa_link);
            notifSound('on');
            updateScroll();

        }, 10000)

    }, 5000);
};
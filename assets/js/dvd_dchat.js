$(function () {

    console.log("init dChat");

    $('.main_dchat_wrapper').addClass('active');

    // inisialisasi perfectScrollBar pada chat-body
    $('.main_dchat_body .dchat_messages_box').perfectScrollbar();


    function notifSound() {
        const audio = new Audio("assets/sound/notify.mp3");
        audio.play();
    };

    setTimeout(function () {
        SapaPembuka();
        setTimeout(() => {
            tawaran();
        }, 5000)
    }, 7000)




    function SapaPembuka() {

        let tm = new Date().getHours();
        let sapaan = tm < 12 ? "Selamat Pagi" : 12 <= tm && tm < 17 ? "Selamat Siang" :
            "Selamat Malam";

        let pembuka = `
                <div class="message">
                    <div class="message-content">
                        ${sapaan} 😀
                    </div>
                </div>
        
        `;
        $('.dchat_messages_box').addClass('pd_20').append(pembuka);
        notifSound();

    };



    function tawaran() {
        let tawar = `
                <div class="message">
                    <div class="message-content">
                        Apakah ada yang dapat kami bantu.?
                    </div>
                </div>
                `;
        $('.dchat_messages_box').append(tawar).animate();
        notifSound();

    };


    // 
    $('.dchat_messages_box').click(function () {

        $('.dchat_header').addClass('small');

        $('.dchat__controls').addClass('show');
        $('input .input-group').focus();


    });

    // ==============================================================
    // Minimize
    $('.btn__details a').click(function () {
        console.log("minimize");
        $('.main_dchat_wrapper.active').addClass('min')

        let main_dchat = $('.main_dchat_wrapper');


        // menangani saat max
        if (main_dchat.hasClass('max')) {
            main_dchat.toggleClass('max').toggleClass("min");
            $('.btn__wrapper').toggleClass('active');
        }

        setTimeout(() => {
            $('.main_dchat_wrapper.active').removeClass('active')
        }, 500);
        $('.btn__wrapper.init').removeClass('init').css({
            // "transform": 'scale()',
            "visibility": "visible",
            "transition": "0.2s"
        })


    });


    // ==============================================================


    // ==================================================


    // menampilkan Tombol Kirim saat input tidak kosong
    $('#pesan').on('keyup', function (e) {
        const message = $(this).val();
        const send_btn = $(this).siblings();


        if (!$.trim(message) == '') {
            send_btn.addClass('show')

        } else {
            send_btn.removeClass('show')

        }
    });

    // =====================================================
    $('#pesan').on('keypress', function (e) {
        if (e.which == 13) {
            newMessage()
        }
    });

    $(".input-group-append").click(function () {
        newMessage();
    });

    let mssg_counter = 0;

    function newMessage() {

        const message = $('#pesan').val();
        if ($.trim(message) == '') {
            // jika Pesan kosong
            return false;
        }

        const mssg = `
                <div class="message send">
                    <div class="message-content">${message}</div>
                </div> 
               `;
        $('.dchat_messages_box').append(mssg);
        $('#pesan').val(null);
        $('.input-group-append').removeClass('show')

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
        const $dchat_messages_box = $('.dchat_messages_box');
        $dchat_messages_box.scrollTop($dchat_messages_box.prop("scrollHeight"));
        // update posisi perfectScrollBar
        $dchat_messages_box.perfectScrollbar('update');
    };


    function contactsReply() {
        let WA_Qr = `
                <div class="message">
                    <div class="message-content">
                    <a target="_blank" class="img-thumbnail-variant-1" href="./assets/images/WA_qr_code/qr_WA-700px.png"
                    data-lightgallery="item">
                    <figure>
                        <img src="./assets/images/WA_qr_code/qr_WA-700px.png" alt="" width="886" height="668" />
                    </figure>

                </a>

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


            $('.dchat_messages_box').append(WA_Qr);
            notifSound();
            updateScroll();
            setTimeout(() => {
                $('.dchat_messages_box').append(Wa_link);
                notifSound();
                updateScroll();

            }, 10000)

        }, 5000);
    };



    // Tombol Chat
    $('.btn__wrapper').click(function () {
        $(this).toggleClass('active');
        // console.log($(this));

        let main_dchat = $('.main_dchat_wrapper');
        main_dchat.toggleClass('max').toggleClass("min");

        $('#pesan').val('')
        $('.input-group-append').removeClass('show')

    });






});
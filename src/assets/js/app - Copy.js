var heightHeader = $('.site-header').outerHeight();
var heightTop = $('.site-header').outerHeight();

$(window).scroll(function() {

    var scrollTop = $(this).scrollTop();
    var w = window.innerWidth;
    if (scrollTop > heightHeader) {
        if (w > 1025) {
            $('body').addClass('have-fixed');
            $('.nav-bar').addClass('fadeInDown');

        }
    } else {
        $('body').removeClass('have-fixed');
        $('.nav-bar').removeClass('fadeInDown');

    }

});

$(document).ready(function() {
    new WOW().init();
    $('.carousel').carousel({
        interval: 2000
    });
    // $(".owl-carousel").owlCarousel();
    $('.single-item').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1
    });
    $('.multiple-items').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 3
    });
    $('.one-time').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 5,
        touchMove: false,
        slidesToScroll: 1
    });
    $('.uneven').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4
    });
    $('.responsive').slick({
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
    $('.autoplay').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000
    });

    $('.slideHome').slick({
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        nextArrow: '<button type="button" class="banner-category-slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
        prevArrow: '<button type="button" class="banner-category-slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>'
    });

    $(".owl-ofert").owlCarousel({
        pagination: false,
        navigation: true,
        autoplay: true,
        items: 4,
        itemsDesktopSmall: [1024, 4],
        itemsTablet: [768, 3],
        itemsTabletSmall: [767, 2],
        itemsMobile: [479, 1]
    });
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        items: 4,
        autoplay: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 4
            }
        }
    })

    $('#myTab a').click(function(e) {
        e.preventDefault();
        $(this).tab('show');
    });

    $(".button").on("click", function() {
        var oldValue = $("#quantity").val(),
            newVal = 1;
        if ($(this).text() == "+") {
            newVal = parseInt(oldValue) + 1;
        } else if (oldValue > 1) {
            newVal = parseInt(oldValue) - 1;
        }
        $("#quantity").val(newVal);

        updatePricing();

    });

    var body = $('body');
    var doc = $(document);

    var showLeftPush = $('#showRightPush');
    var nav = $('#cbp-spmenu-s1');

    showLeftPush.on('click', function(e) {
        e.stopPropagation();

        body.toggleClass('cbp-spmenu-push-toleft');
        nav.toggleClass('cbp-spmenu-open');
        showLeftPush.toggleClass('active');
    });

    $('.gf-menu-device-wrapper .close-menu').on('click', function() {
        showLeftPush.trigger('click');
    });

    doc.on('click', function(e) {
        if (!$(e.target).closest('#cbp-spmenu-s1').length && showLeftPush.hasClass('active')) {
            showLeftPush.trigger('click');
        }
    });

    // MODAL
    var $modalParent = $('div.newsletterwrapper'),
        modalWindow = $('#email-modal'),
        emailModal = $('#email-modal'),
        modalPageURL = window.location.pathname;

    modalWindow = modalWindow.html();
    modalWindow = '<div id="email-modal">' + modalWindow + '</div>';
    $modalParent.css({ 'position': 'relative' });
    $('.wrapper #email-modal').remove();
    $modalParent.append(modalWindow);


    $('#email-modal .btn.close').click(function(e) {
        e.preventDefault();
        // closeEmailModalWindow();
        $('#email-modal').hide();
    });
    setTimeout(function() {
        $('#email-modal').show();
    }, 3000);
    $('body').keydown(function(e) {
        if (e.which == 27) {
            closeEmailModalWindow();
            $('body').unbind('keydown');
        }
    });
    $('#mc_embed_signup form').submit(function() {
        if ($('#mc_embed_signup .email').val() != '') {
            closeEmailModalWindow();
        }
    });

    function closeEmailModalWindow() {
        $('#email-modal .modal-window').fadeOut(600, function() {
            $('#email-modal .modal-overlay').fadeOut(600, function() {
                $('#email-modal').hide();
            });
        });
        $('#email-modal').css("display", "none !important");
    }

    function openEmailModalWindow() {
        $('#email-modal').fadeIn(600, function() {
            $('#email-modal .modal-window').fadeIn(600);
        });
    }


});
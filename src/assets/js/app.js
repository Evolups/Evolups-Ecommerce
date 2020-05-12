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
    // $('.carousel').carousel({
    //     interval: 2000
    // });
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
        autoplaySpeed: 5000,
        nextArrow: '<button type="button" class="banner-category-slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
        prevArrow: '<button type="button" class="banner-category-slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>'
    });

    // $(".owl-carousel").owlCarousel({
    //     pagination: false,
    //     navigation: true,
    //     items: 3,
    //     itemsDesktopSmall: [1024, 3],
    //     itemsTablet: [768, 2],
    //     itemsTabletSmall: [767, 2],
    //     itemsMobile: [479, 2]
    // });

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
});
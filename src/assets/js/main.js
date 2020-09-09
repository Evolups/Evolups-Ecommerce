jQuery(document).ready(main);

function main(){
    $(window).scroll(function(){
     if($(this).scrollTop() > 100){
         $("#Arriba").fadeIn();
     }else{
         $("#Arriba").fadeOut();
     }
    
    });

   $("#Arriba").click(function(){
    $("html, body").animate({
        scrollTop : 0

    }, 600);
    return false;
   });

}
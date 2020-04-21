(function() {
  var __sections__ = {};
  (function() {
    for(var i = 0, s = document.getElementById('sections-script').getAttribute('data-sections').split(','); i < s.length; i++)
      __sections__[s[i]] = true;
  })();
  (function() {
  if (!__sections__["brands-block"] && !window.DesignMode) return;
  try {
    
function process_slick_event(evt) {
  var _slick = $( "#" +evt.target.id + " .slide_brand");
  if( _slick.length )
  {
    switch ( evt.originalEvent.type ) {
      case "shopify:section:load" : 
        console.log('Load ' + _slick.attr("id"));
        _slick.slick (
            {

              slidesToShow: 5,
              slidesToScroll: 1,
              nextArrow: '<button type="button" class="brands-slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
              prevArrow: '<button type="button" class="brands-slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
			  responsive: [
          
      		{
              breakpoint: 1024,
              settings: {
              slidesToShow: 4,
              slidesToScroll: 1
            }
          },
          {
              breakpoint: 768,
              settings: {
              slidesToShow: 3,
              slidesToScroll: 1
            }
          },
      	   {
              breakpoint: 700,
              settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          },
      	   {
              breakpoint: 500,
              settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
     	 ]
            }
          );
      break; 
      case "shopify:section:unload" :
        console.log('Unload ' + _slick.attr("id"));
        _slick.slick('unslick');
      break;

     } 
  }
}
    
$(document)
 .on( 'shopify:section:load', process_slick_event )
 .on( 'shopify:section:unload', process_slick_event )
;



  } catch(e) { console.error(e); }
})();

(function() {
  if (!__sections__["custom-block-category"] && !window.DesignMode) return;
  try {
    
function process_slick_event(evt) {
  var _slick = $( "#" +evt.target.id + " .slide_brands_category");
  if( _slick.length )
  {
    switch ( evt.originalEvent.type ) {
      case "shopify:section:load" : 
        console.log('Load ' + _slick.attr("id"));
        _slick.slick (
            {
              slidesToShow: 5,
              slidesToScroll: 1,
 			  nextArrow: '<button type="button" class="banner-category-slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
              prevArrow: '<button type="button" class="banner-category-slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
              responsive: [

      		{
              breakpoint: 1400,
              settings: {
              slidesToShow: 4,
              slidesToScroll: 1
            }
          },
          {
              breakpoint: 900,
              settings: {
              slidesToShow: 3,
              slidesToScroll: 1
            }
          },
      	   {
              breakpoint: 700,
              settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          }
                 ]
            }
          );
      break; 
      case "shopify:section:unload" :
        console.log('Unload ' + _slick.attr("id"));
        _slick.slick('unslick');
      break;

     } 
  }
}
    
$(document)
 .on( 'shopify:section:load', process_slick_event )
 .on( 'shopify:section:unload', process_slick_event )
;



  } catch(e) { console.error(e); }
})();

(function() {
  if (!__sections__["lookbook"]) return;
  try {
    
function process_slick_event(evt) {
  var _slick = $( "#" +evt.target.id + " .slick-lookbook");
  if( _slick.length )
  {
    switch ( evt.originalEvent.type ) {
      case "shopify:section:load" : 
        console.log('Load ' + _slick.attr("id"));
        _slick.slick (
            {

              nextArrow: '<button type="button" class="slideshow-slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
              prevArrow: '<button type="button" class="slideshow-slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
              slidesToScroll: 1,
              autoplay: _slick.data('slick').autoplay,
              autoplaySpeed: _slick.data('slick').autoplaySpeed
            }
          );
      break; 
      case "shopify:section:unload" :
        console.log('Unload ' + _slick.attr("id"));
        _slick.slick('unslick');
      break;

     } 
  }
}
    
$(document)
 .on( 'shopify:section:load', process_slick_event )
 .on( 'shopify:section:unload', process_slick_event )
;


  } catch(e) { console.error(e); }
})();

(function() {
  if (!__sections__["slideshow"] && !window.DesignMode) return;
  try {
    
function process_slick_event(evt) {
  var _slick = $( "#" +evt.target.id + " .variable-width");
  if( _slick.length )
  {
    switch ( evt.originalEvent.type ) {
      case "shopify:section:load" : 
        console.log('Load ' + _slick.attr("id"));
        _slick.slick (
            {

              nextArrow: '<button type="button" class="slideshow-slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
              prevArrow: '<button type="button" class="slideshow-slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
              slidesToScroll: 1,
              autoplay: _slick.data('slick').autoplay,
              autoplaySpeed: _slick.data('slick').autoplaySpeed
            }
          );
      break; 
      case "shopify:section:unload" :
        console.log('Unload ' + _slick.attr("id"));
        _slick.slick('unslick');
      break;

     } 
  }
}
    
$(document)
 .on( 'shopify:section:load', process_slick_event )
 .on( 'shopify:section:unload', process_slick_event )
;


  } catch(e) { console.error(e); }
})();

})();

$(document).ready(function() {

  $(".btn-scroll-top").hide();

  // smooth scroll
  $('.btn-scroll-top').on('click', function(e){
      $('html, body').animate({scrollTop : 0},800);
  return false;
  })
  // to-top button
  $(window).scroll(function(){
    if ($(this).scrollTop() > 600) {
      $('.btn-scroll-top').fadeIn();
    } else {
      $('.btn-scroll-top').fadeOut();
    }
  });

  // carousel
  $("#carousel").owlCarousel({
    slideSpeed : 300,
    paginationSpeed : 400,
    singleItem: true,
    pagination: false,
    dots: false,
    items : 1,
    itemsDesktop : false,
    itemsDesktopSmall : false,
    itemsTablet: false,
    itemsMobile : false
  });
  // carousel navigation
  $(".news-slider__next").click(function(){
    $("#carousel").trigger('next.owl.carousel');
  })
  $(".news-slider__prev").click(function(){
    $("#carousel").trigger('prev.owl.carousel');
  });

});

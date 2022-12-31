jQuery(document).ready(function ($) {
  $(".banner-sliders").slick({
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    prevArrow: "<i className='prev fa fa-arrow-left'></i>",
    nextArrow: "<i className='next fa fa-arrow-right'></i>",
    centerMode: true,
    centerPadding: "300px",
    responsive: [
      {
        breakpoint: 1445,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerPadding: "200px",
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerPadding: "50px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "50px",
        },
      },
    ],
  });

  $(".collection-slides").slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    centerMode: true,
    centerPadding: "200px",
    responsive: [
      {
        breakpoint: 1445,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          centerPadding: "100px",
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerPadding: "100px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerPadding: "50px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "50px",
        },
      },
    ],
  });

  $(".category-slider").slick({
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    responsive: [
      {
        breakpoint: 1445,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 445,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "100px",
        },
      },
    ],
  });
});

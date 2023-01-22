export const homeSliderData = [
  {
    id: 0,
    title: "0Help Center",
    featuredImageUrl:
      "https://cdn.sanity.io/images/la9zs95a/production/e8ce637075a77179727dc9dd88c3e7ae91a5fb9d-1280x720.jpg",
    floorPrice: "5",
    path: "/collection/help_center",
  },
  {
    id: 1,
    title: "1Help Center",
    featuredImageUrl:
      "https://cdn.sanity.io/images/la9zs95a/production/e8ce637075a77179727dc9dd88c3e7ae91a5fb9d-1280x720.jpg",
    floorPrice: "5",
    path: "/collection/help_center",
  },
  {
    id: 2,
    title: "2Help Center",
    featuredImageUrl:
      "https://cdn.sanity.io/images/la9zs95a/production/e8ce637075a77179727dc9dd88c3e7ae91a5fb9d-1280x720.jpg",
    floorPrice: "5",
    path: "/collection/help_center",
  },
  {
    id: 3,
    title: "3Help Center",
    featuredImageUrl:
      "https://cdn.sanity.io/images/la9zs95a/production/e8ce637075a77179727dc9dd88c3e7ae91a5fb9d-1280x720.jpg",
    floorPrice: "5",
    path: "/collection/help_center",
  },
];

const SlickArrowLeft = ({ onClick }) => (
  <i className="slick-arrow prev fa fa-arrow-left" onClick={onClick}></i>
);

const SlickArrowRight = ({ onClick }) => (
  <i className="slick-arrow next fa fa-arrow-right" onClick={onClick}></i>
);

export const settings = {
  infinite: true,
  slidesToShow: 2,
  slidesToScroll: 1,
  arrows: true,
  adaptiveHeight: true,
  dots: false,
  prevArrow: <SlickArrowLeft />,
  nextArrow: <SlickArrowRight />,

  centerMode: true,
  centerPadding: "200px",
  responsive: [
    {
      breakpoint: 1445,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        centerPadding: "50px",
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        centerPadding: "50px",
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        centerPadding: "50px",
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
        slidesToShow: 1.3,
        slidesToScroll: 1,
        centerPadding: "50px",
      },
    },
  ],
  className: "banner-sliders",
};

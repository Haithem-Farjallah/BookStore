import React from "react";
import { NavLink } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
const Sliders = ({ results, loading }) => {
  const SamplePrevArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <FontAwesomeIcon icon={faAngleLeft} color="#827A7A" size="2x" />
      </div>
    );
  };
  const SampleNextArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <FontAwesomeIcon icon={faAngleRight} color="#827A7A" size="2x" />
      </div>
    );
  };

  var settings = {
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings} className="cards  ">
      {!loading &&
        results.map((result, index) => (
          <NavLink key={index} to={`/books/${result._id}`}>
            <div className="mb-5 ">
              <img
                src={result.image}
                alt="Book"
                className="h-[45vh] rounded-xl  w-full  brightness-95 shadow-2xl "
              />
            </div>
            <h1 className=" text-darkblue font-semibold text-center h-12 line-clamp-2 mx-2  ">
              {result.name}{" "}
            </h1>
          </NavLink>
        ))}
    </Slider>
  );
};

export default Sliders;

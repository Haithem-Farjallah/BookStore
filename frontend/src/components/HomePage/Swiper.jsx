import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import bookImg from "../../images/book.jpg";
// Initialize Swiper core components

function Slider({ loading, results }) {
  return (
    <Swiper
      className="h-screen"
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      loop={true}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
    >
      {!loading &&
        results.length !== 0 &&
        results.map((result, index) => (
          <SwiperSlide key={index} className="rounded-xl overflow-hidden">
            {result.volumeInfo.imageLinks ? (
              <img
                loading="lazy"
                src={result.volumeInfo.imageLinks.thumbnail}
                alt=""
                className="h-52 w-full"
              />
            ) : (
              <img
                src={bookImg}
                loading="lazy"
                className="h-52 w-full"
                alt="Book Image"
              />
            )}
          </SwiperSlide>
        ))}
    </Swiper>
  );
}

export default Slider;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        title_width: "38rem",
        searchwidth: "34rem",
        listwidth: "60rem",
        scrollwidth: "95vw",
        imagewidth: "25rem",
        widthcomments: "94%",
        widthtitle: "51rem",
      },
      height: {
        imgheight: "25rem",
        searchheight: "32rem",
        bookheight: "8rem",
        doubleRange: "2px",
        imagehright: "24rem",
      },
      colors: {
        darkblue: "#241d45" /*5f5f7e */,
        pgray: "#827A7A",
        bgreen: "#299054",
        bgcolor: "#f5f6fa",
        whitebg: "#f6f7f8",
        /*lightpurple:'#6255A5',*/
        lightgreen: "#45D979",
        lightgray: "#d9dad9",
        darkbg: "rgba(0,0,0,0.5)",
        searchbg: "#eee",
        bggreen: "#267e6a",
        grayy: "#e9ecef",
        darkgray: "#424246",
        darkpage: "#121212",
      },
      boxShadow: {
        test: "0 0px 1px hsla(0,0%,0%,0.2),0 1px 2px hsla(0,0%,0%,0.2)",
        testhover: "0 0px 1px hsla(0,0%,0%,0.6),0 1px 2px hsla(0,0%,0%,0.2)",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      screens: {
        'laptop': '1024px',
        'XL': '320px', // Custom breakpoint for 1024px
        'main': '424px', // Custom breakpoint for 1024px
      },
      backgroundImage: {
        'background-gradient': 'linear-gradient(240deg, #FFED8C -11.5%, #FFF 86.78%)',
        'button-gradient-backend': 'linear-gradient(102deg, #FF9E4A 0%, #FF6F1F 87.74%)',
        'button-orange-backend': 'linear-gradient(90deg, #FC7727 0%, #F69401 100%)',
        'id-card-gradient': 'linear-gradient(0deg, #FF9E4A -7.09%, #FF6F1F 100%)',
      
      },
      boxShadow: {
        'custom-backend': '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
      },
      fontFamily: {
        poppins: "'Poppins', sans-serif",
        roboto: "'Roboto', sans-serif",
        instrumentSans: "Instrument Sans, sans-serif",
        tiroBangla: "Tiro Bangla , sans-serif",
        hindSiliguri: "Hind Siliguri , sans-serif",
        notoSans: "Noto Sans, sans-serif",
        montserrat: "Montserrat, sans-serif",
        raleway: "Raleway, sans-serif",
        inter: "Inter, sans-serif"
      },
      colors: {
        firstColor: "#0E214E", // background color
        secondColor: "#1DACFF", // nav + footer color
        thirdColor: "#6788F8", // button normal color
        fourthColor: "#202A7C", // button hover color
        fifthColor: "#010B3C", // bg for dark mode and text color for light mode
        sixthColor: "#D7DFEF", // text color for dark mode
      },
    },
  },
  plugins: [require("daisyui")],
}


module.exports = {
  content: ["./src/**/*.{html,js}"], // adjust paths to your project
  theme: {
    extend: {
      keyframes: {
        fadeInOut: {
          '0%': { opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
      animation: {
        // name: duration timing-function fill-mode
        'fadeInOut': 'fadeInOut 2s ease forwards',
      },
    },
  },
  plugins: [],
};
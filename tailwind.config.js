module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      transitionProperty: {
        visibility: "visibility",},
    },
  },
  variants:  {
    extend: {
      backgroundColor: ['active'],
      textColor: ['active'],
    }
  },
  plugins: [],
};

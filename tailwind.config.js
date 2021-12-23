module.exports = {
  purge: ['src/components/BuySell.js',
          'src/components/ExchangeToken.js',
          'src/components/GetBalance.js',
          'src/components/grahc.js',
          'src/components/ListOfTokens.js',
          'src/components/modal.js',
          'src/components/Navbar.js',
          'src/components/SellToken.js'],
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

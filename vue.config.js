module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/styles/bootstrap_scss.scss";
          @import "@/styles/colors.scss";
          @import "@/styles/variables.scss";
        `,
      },
    },
  },
};

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "~bootstrap/scss/bootstrap.scss";
          @import "@/styles/colors.scss";
        `,
      },
    },
  },
};

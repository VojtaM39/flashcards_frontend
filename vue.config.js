module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/styles/bootstrap.scss";
          @import "@/styles/colors.scss";
          @import "@/styles/variables.scss";
        `,
      },
    },
  },
};

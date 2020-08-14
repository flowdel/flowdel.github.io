// Note: @see https://webpack.js.org/configuration/dev-server/
const devServer = {

    // Note: THIS IS NOT RECOMMENDED as apps that do not check the host are
    // vulnerable to DNS rebinding attacks.
    disableHostCheck: true,

    // Note: Enable gzip compression for everything served
    compress: true,

    overlay: {
        warnings: false,
        errors: true,
    },

    proxy: {
        '/api': {
            target: 'https://strapi.kameas.ru/',
        },
    },
};

module.exports = {
    devServer,
    outputDir: 'docs',
};

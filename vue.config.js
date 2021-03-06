// const BACKEND_HOST = process.env.StarLink_ERP_BACKEND_HOST
module.exports = {
    runtimeCompiler: true,
    publicPath: process.env.NODE_ENV === 'production' ? '/public/' : './',
    /* 输出文件目录：在npm run build时，生成文件的目录名称 */
    outputDir: 'dist',
    /* 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录 */
    assetsDir: 'assets',
    /* 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度 */
    productionSourceMap: false,
    /* 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存，你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变) */
    filenameHashing: true,
    /* 代码保存时进行eslint检测 */
    lintOnSave: true,

    // 配置loader
    chainWebpack: config => {
    // GraphQL Loader
        config.module
            .rule('md')
            .test(/\.md$/)
            .use('text-loader')
            .loader('text-loader')
            .end()
            .use('markdown-loader')
            .loader('markdown-loader')
            .end()
    },
    // 配置别名
    configureWebpack: {
        resolve: {
            alias: {
                '_a_': '@/assets',
                '_c_': '@/components',
                '_v_': '@/views'
            }
        },
        devtool: 'source-map'
    },
    /* webpack-dev-server 相关配置 */
    devServer: {
        /* 自动打开浏览器 */
        open: true,
        /* 设置为0.0.0.0则所有的地址均能访问 */
        host: '0.0.0.0',
        port: 8066,
        https: false,
        hotOnly: false,
        /* 使用代理 */
        // proxyTable: {
        //     '/jwt': {
        //         target: BACKEND_HOST || 'http://localhost:8765',
        //         // target: 'http://192.168.0.10:8765',
        //         pathRewrite: {
        //             '^/jwt': '/jwt'
        //         }
        //     },
        //     '/api': {
        //         target: BACKEND_HOST || 'http://localhost:8765',
        //         // target: 'http://192.168.0.105:8765',
        //         secure: false, // 如果是https接口，需要配置这个参数
        //         changeOrigin: true, // 是否跨域
        //         pathRewrite: {
        //             '^/api': '/api'
        //         }
        //     }
        // }
    }
}

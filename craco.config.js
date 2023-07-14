const path = require(`path`)



module.exports= {
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src/'),
            '@page': path.resolve(__dirname, 'src/page')
           
        }
    }
}
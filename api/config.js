const fs = require('fs');


module.exports = {
    Config : class {
        constructor (url) {
            this.url = url;
        }

        set (key, data) {
            var config = JSON.parse(fs.readFileSync(this.url));

            config[key] = data;
    
            fs.writeFileSync(this.url, JSON.stringify(config));
        }

        get (key) {
            var config =  JSON.parse(fs.readFileSync(this.url));
            return config[key];
        }
    }
}
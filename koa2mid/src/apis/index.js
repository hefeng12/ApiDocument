const fs = require('fs');
// const module1 = require('./module1')
const url = __dirname +'/';
const files = fs.readdirSync(url);

let apis = [];
files.forEach((item)=>{
    // console.log(item)
    if(item!=='index.js'){
        item = './'+item;
        const module = require(item);
        let everyMdule = {
            name:module.name,
            description:module.description,
            children:[]
        };
        module.children.forEach(it=>{
            let data = {
                methods:it.methods,
                url:module.baseUrl+it.url,
                success:it.success,
                error:it.error,
                name:it.name
            };
            it.description&&(data.description = it.description)
            it.headers&&(data.headers = it.headers)
            if(it.methods==='get'){
                it.params&&(data.params = it.params);
            }else{
                it.data&&(data.data = it.data);
            }
            everyMdule.children.push(data);
        })
        apis.push(everyMdule)
    }
})

module.exports = apis;
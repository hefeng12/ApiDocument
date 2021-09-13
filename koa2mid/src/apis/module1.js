module.exports={
    name:'模块一',
    baseUrl:'api',
    description:"模块一的描述",
    children:[
        {
            name:'接口一',
            methods:'get',
            url:'/login',
            description:'该接口的描述',
            params:[
                //get方式所需的参数，可以有多个，也可以为空，请求时会自动拼接到url后面
                {
                    name:'userName',//字段名
                    value:'xiaohe',//字段值
                    type:'String',//字段类型
                    description:'该字段的描述',//字段描述
                    isNecessary:true,//是否必须
                },
            ],
            data:[
                //post方式所需的参数，可以有多个，也可以为空，请求时会自动放到请求的body里面
                {
                    name:'userName',//字段名
                    value:'xiaohe',//字段值
                    type:'String',//字段类型
                    description:'该字段的描述',//字段描述
                    isNecessary:true,//是否必须
                },
            ],
            headers:{
                //请求时特殊的请求头，比如要携带一些token等。(可以不写)
                //如果请求时要求的请求数据时json类型需要在请求头添加请求类型，比如：
                'Content-Type':'application/json;charset=UTF-8',
            },
            success:{
                code:200,
                msg:'success',
                data:{
                    user:'789',
                    token:'123456'
                }
            },
            error:{
                code:0,
                msg:'error'
            }
        },
        {
            name:'接口二',
            methods:'post',
            url:'/login',
            description:'该接口的描述',
            params:[
                //get方式所需的参数，可以有多个，也可以为空，请求时会自动拼接到url后面
                {
                    name:'userName',//字段名
                    value:'xiaohe',//字段值
                    type:'String',//字段类型
                    description:'该字段的描述',//字段描述
                    isNecessary:true,//是否必须
                },
            ],
            data:[
                //post方式所需的参数，可以有多个，也可以为空，请求时会自动放到请求的body里面
                {
                    name:'userName',//字段名
                    value:'xiaohe',//字段值
                    type:'String',//字段类型
                    description:'该字段的描述',//字段描述
                    isNecessary:true,//是否必须
                },
            ],
            headers:{
                //请求时特殊的请求头，比如要携带一些token等。(可以不写)
                //如果请求时要求的请求数据时json类型需要在请求头添加请求类型，比如：
                'Content-Type':'application/json;charset=UTF-8',
            },
            success:{
                code:200,
                msg:'success',
                data:{
                    user:'789',
                    token:'123456'
                }
            },
            error:{
                code:0,
                msg:'error'
            }
        }
    ]
}
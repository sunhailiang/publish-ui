module.exports={
    title:'okr-ui', // 网站标题
    description:'okr公共组件库',  // 网站描述
    dest:'./build', // 设置输出目录
    port:'8088',  // 端口
    themeConfig:{ // 主题配置
        nav:[
            {
                text:'主页',
                link:'/'
            } // 导航条
        ],
        sidebar:{ // 侧边栏配置
            '/components/':[
                {
                    collapsable:true, // 默认折叠
                    children:[
                        'button'
                    ]
                }
            ]
        }
    }
}
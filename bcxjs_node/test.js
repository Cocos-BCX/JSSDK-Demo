
require('./bcx.min.js');

var http = require("http");
var url = require("url");
var querystring = require('querystring')
let bcx=new BCX({
    default_ws_node:"ws://47.93.62.96:8049",
    ws_node_list:[
        {url:"ws://47.93.62.96:8049",name:"COCOS3.0节点1"},
        {url:"ws://39.106.126.54:8049",name:"COCOS3.0节点2"}
    ],
    networks:[{
        core_asset:"COCOS",
        chain_id:"b9e7cee4709ddaf08e3b7cba63b71c211c845e37c9bf2b865a7b2a592c8adb28" 
    }], 
    faucet_url:"http://47.93.62.96:8041",
    auto_reconnect:true,
    check_cached_nodes_data:false                     
});

bcx.passwordLogin({
    account:"test1",//query.loginUserName,
    password:"12345678"
}).then(res=>{
    console.info("bcx passwordLogin res",res);
}); 


let server=http.createServer(function(request, response) {
    var pathname = url.parse(request.url);
    var query = querystring.parse(pathname.query); 
    if (pathname.pathname === '/trxToken') {
        //访问连接如http://192.168.27.233:8888/trxToken?to=test01&token=1
        bcx.transferAsset({
            fromAccount:"test1",
            toAccount:"test2",//query.to,
            amount:1,//query.token,
            assetId:"COCOS",
            memo:""
        }).then(result=>{
            console.info('bcx transferAsset',result);
            response.writeHead(200, { "Content-Type": "text/plain" });
            response.write(JSON.stringify(result));
            response.end();
        })
    } 
}).listen(9999);

bcx.subscribeToRpcConnectionStatus({
    callback:status=>{
        console.info("rpc status",status);
        if(status=="closed"){
            server.close();
        }
    }
})

// bcx.subscribeToChainTranscation({
//     callback:function(res){
//         console.log("subscribeToChainTranscation res",res);
//         if(res.status==1&&res.data.type=="account_create"){
//             bcx.transferAsset({
//                 to:res.data.parseOperations.new_account,//query.to,
//                 amount:100,//query.token,
//                 assetId:"COCOS",
//                 memo:"新账户注册送100(node服务)"
//             }).then(result=>{
//                 console.info('bcx transferAsset',result);
//             })
//         }
//     }
// })

bcx.subscribeToBlocks({
    callback:res=>{
        console.info("subscribeToBlocks res",res);
    }
})

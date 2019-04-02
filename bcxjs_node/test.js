
require('./bcx.min.js');

var http = require("http");
var url = require("url");
var querystring = require('querystring')

let bcx=new BCX({
    default_ws_node:"ws://47.93.62.96:8020",
    ws_node_list:[
        {url:"ws://47.93.62.96:8020",name:"cocos新链"}
    ],
    networks:[{
        core_asset:"COCOS",
        chain_id:"9fc429a48b47447afa5e6618fde46d1a5f7b2266f00ce60866f9fdd92236e137" 
    }], 
    faucet_url:"http://47.93.62.96:4000",
    auto_reconnect:true                     
});

bcx.passwordLogin({
    account:"test2",//query.loginUserName,
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


let _bcx=require('./bcx.node.js');
var http = require("http");
var url = require("url");
var querystring = require('querystring')
let bcx=_bcx.createBCX({
    default_ws_node:"ws://test.cocosbcx.net",
    ws_node_list:[	
        {url:"ws://test.cocosbcx.net",name:"Cocos - China - Beijing"}   	
    ],
    networks:[
        {
            core_asset:"COCOS",
            chain_id:"c1ac4bb7bd7d94874a1cb98b39a8a582421d03d022dfa4be8c70567076e03ad0" 
        }
    ], 
    faucet_url:"",
    auto_reconnect:true,
    real_sub:true,
    check_cached_nodes_data:false                 
});

// bcx.queryBlock({
//     block:600000
// }).then(res=>{
//     console.info("queryBlock res",res);
// })
// bcx.passwordLogin({
//     account:"test1",
//     password:"12345678"
// }).then(res=>{
//     console.info("bcx.getAccountInfo()",bcx.getAccountInfo())
//     if(res.code==1){
//         bcx.publishVotes({
//             type:"witnesses",
//             vote_ids:["1.2.9", "1.2.10", "1.2.12", "1.2.5", "1.2.6", "1.2.15", "1.2.7", "1.2.8", "1.2.11", "1.2.13", "1.2.14"],
//             votes:2222
//         }).then(res=>{
//             console.info("publishVotes res",res);
//         })
//         // bcx.updateCollateralForGas({
//         //     mortgager:"test1",
//         //     beneficiary:"test2",
//         //     amount:120,
//         //     isPropose:false
//         // }).then(res=>{
//         //     console.info("updateCollateralForGas res",res);
//         // })
//     }
// });

// bcx.createAccountWithPassword({
//     account:"test1231",
//     password:"12345678",
//     autoLogin:true,
//     callback:function(res){
//         console.info("signup res",res);
//     }
// })

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

// bcx.subscribeToRpcConnectionStatus({
//     callback:status=>{
//         console.info("rpc status",status);
//         if(status=="closed"){
//             server.close();
//         }
//     }
// })

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

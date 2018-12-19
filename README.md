# bcxjs

Javascript API，用于使用COCOS-BCX RPC API与基于COCOS-BCX的区块链集成。

## 使用

### 引入API文件

```html
 <script type="text/javascript" src="bcx.min.js"></script>
 ```
 
### 初始化

```js
var bcx=new BCX({
            default_ws_node:”ws://XXXXXXXXX” //节点rpc地址,选填。惹没有指定此项则会自动连接ws_node_list中速度最快的节点
            ws_node_list:[{url:"ws://xxxxxxx",name:"xxxxx"}]//API服务器节点列表，必填
            faucet_url:"http://***.***.***.***:****", //注册入口
            networks:[{
                core_asset:"***",//核心资产符号
                chain_id:"***************************"   
            }], 
            auto_reconnect:false,//当RPC断开时是否自动连接，默认为true
            app_keys:["************************"]//合约授权，不进行合约授权，则不用配置此选项
	 })
```

### 调用实例

```js
bcx.transferAsset({
     to:"test",
     amount:1
     assetId:"COCOS",
     memo:""
}).then(res=>{
     console.log('transferAsset res',res);
})
```  


## API说明

#### 1.没有特殊说明均有一个可选参数callback

callback返回的result为Object对象,结构为{code:0,message:””}。

code=1时表示成功，无message状态描述。

code!=1时意味执行失败，message为失败状态描述。

#### 2.没有殊说明均只有一个参数，该参数为一个对象，对象包含所有相关参数，其中也包含callback

调用示例：
```js
bcl.getPrivateKey({
     callback:res=>{}
})
```    

#### 3.除订阅类接口，其他接口在不传callback参数时均返回promise对象

#### 4.接口的参数类型没有特殊说明均为字符串

#### 5.接口的参数没有特殊说明均不能为空，callback为可选参数

#### 6.查询类接口返回数据实例:{code:1,data:[]}

#### 7.非查询类接口返回数据会多一个数据字段trxData,值为一个对象

示例：
```js
trxData:{
 block_num:*****,//区块高度
 trx_id:"************************"//交易ID
}
```

#### 8.非查询类接口若涉及关联ID业务(如创建NH资产产生的ID)返回的数据中将包含data对象

//示例
```js
data:{
  real_running_time: 387//运行时间
  result: "4.2.288"//关联业务id
}
```

## 状态码说明

| code | message | 说明 | 关联接口 |
| --- | --- | --- | --- |
| 300 | Chain sync error, please check your system clock | 链同步错误，请检查您的系统时钟 | *(表示所有接口) |
| 301 | RPC connection failed. Please check your network | 连接RPC失败，请检查你的网络 | * |
| 1 |  | 操作成功,无message | * |
| 0 | failed | 操作失败，返回错误状态描述不固定，可直接提示res.message或统一提示为操作失败 | * |
| 1010 | Parameter is missing | 参数缺失 | * |
| 1011 | Parameter error | 参数错误 | * |
| 1020 | The network is busy, please check your network connection | 网络繁忙，请检查你的网络连接 | * |
| 1030 | Please enter the correct account name(/^[a-z]([a-z0-9\.-]){4,63}/$) | 请输入正确的账户名 | CreateAccountWithPassword |


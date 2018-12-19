# Cocos-BCX链系统互操作API -- BCXJS

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
                chain_id:"***************************"//链id   
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

| code | message | 说明 | 关联API | 
| --- | --- | --- | --- |
| 300 | Chain sync error, please check your system clock | 链同步错误，请检查您的系统时钟 | init | 
| 301 | RPC connection failed. Please check your network | 连接RPC失败，请检查你的网络 | init | 
| 1 | 无 | 操作成功 | 　 | 
| 0 | failed | 操作失败，返回错误状态描述不固定，可直接提示res.message或统一提示为操作失败 | 　 | 
| 1010 | Parameter is missing | 参数缺失 | 　 | 
| 1011 | Parameter error | 参数错误 | QueryBlock, queryTXID | 
| 1020 | The network is busy, please check your network connection | 网络繁忙，请检查你的网络连接 | passwordLogin等 | 
| 1030 | Please enter the correct account name(/^[a-z]([a-z0-9\.-]){4,63}/$) | 请输入正确的账户名(正则/^[a-z]([a-z0-9\.-]){4,63}/$) | CreateAccountWithPassword | 
| 1040 | ** not found | ** 不存在 | passwordLogin等 | 
| 105 | wrong password | 密码错误 | passwordLogin,unlockAccount | 
| 106 | The account is already unlocked | 账户已经处于解锁状态 | unlockAccount | 
| 107 | Please import the private key | 请先导入私钥 | unlockAccount | 
| 108 | User name or password error (please confirm that your account is registered in account mode, and the account registered in wallet mode cannot be logged in using account mode) | 用户名或密码错误(请确认你的账户是通过账户模式注册的，钱包模式注册的账户不能使用账户模式登录) | passwordLogin | 
| 109 | Please enter the correct private key | 请输入正确的私钥 | keyLogin | 
| 110 | The private key has no account information | 该私钥没有对应的账户信息 | keyLogin | 
| 111 | Please login first | 请先登录 | changePassword | 
| 112 | Must have owner permission to change the password, please confirm that you imported the ownerPrivateKey | 必须拥有owner权限才可以进行密码修改,请确认你导入的是ownerPrivateKey | changePassword | 
| 113 | Please enter the correct original/temporary password | 请输入正确的原始密码/临时密码 | changePassword | 
| 114 | Account is locked or not logged in. | 帐户被锁定或未登录 | changePasswor、transferAsset、getPrivateKey等 | 
| 115 | There is no asset ** on block chain | 区块链上不存在资产** | transferAsset等 | 
| 116 | Account receivable does not exist | 收款方账户不存在 | transferAsset等 | 
| 117 | The current asset precision is configured as *,and the decimal cannot exceed * | 当前资产精度配置为*，小数点不能超过* | transferAsset等 | 
| 118 | Encrypt memo failed | 备注加密失败 | transferAsset等 | 
| 119 | Expiry of the transaction | 交易过期 | transferAsset等 | 
| 120 | Error fetching account record | 获取帐户记录错误 | queryUserOperations | 
| 121 | block and transaction information cannot be found | 查询不到相关区块及交易信息 | queryBlockTXID | 
| 122 | Parameter blockOrTXID is incorrect | 参数blockOrTXID不正确 | queryBlockTXID | 
| 123 | Parameter account can not be empty | 参数account不能为空 | queryUserInfo | 
| 124 | Receivables account name can not be empty | 收款方账户名不能为空 | transferAsset | 
| 125 | Users do not own * * assets | 用户未拥有***资产 | queryAccountBalances | 
| 127 | No reward available | 没有可领取的奖励 | getVestingBalances,claimVestingBalance | 
| 129 | Parameter 'memo' can not be empty | memo不能为空 | decodeMemo | 
| 130 | Please enter the correct contract name(/^[a-z]([a-z0-9\.-]){4,63}$/) | 请输入正确的合约名称(正则/^[a-z]([a-z0-9\.-]){4,63}$/) | createContract | 
| 131 | Parameter 'worldView' can not be empty | 世界观名称不能为空 | creatWorldView | 
| 133 | Parameter 'toAccount' can not be empty | toAccount不能为空 | transferNHAsset | 
| 135 | Please check parameter data type | 请检查参数数据类型 | creatNHAssetOrder | 
| 136 | Parameter 'orderId' can not be empty | orderId不能为空 | cancelNHAssetOrder | 
| 137 | Parameter 'NHAssetHashOrIds' can not be empty | NHAssetHashOrIds不能为空 | lookupNHAssets | 
| 138 | Parameter 'url' can not be empty | 接入点地址不能为空 | switchAPINode | 
| 139 | Node address must start with ws:// or wss:// | 节点地址必须以 ws:// 或 wss:// 开头 | addAPINode | 
| 140 | API server node address already exists | API服务器节点地址已经存在 | switchAPINode | 
| 141 | Please check the data in parameter NHAssets | 请检查参数NHAssets中的数据 | creatNHAsset批量创建NH | 
| 142 | Please check the data type of parameter NHAssets | 请检查参数NHAssets的数据类型 | creatNHAsset批量创建NH | 
| 144 | Your current batch creation / deletion / transfer number is *, and batch operations can not exceed * | 您当前批量 创建/删除/转移 NH资产数量为*，批量操作数量不能超过* | creatNHAsset、deleteNHAsset、transferNHAsset | 
| 145 | ** contract not found | XX合约不存在 | callContractFunction，queryContract，queryAccountContractData | 
| 146 | The account does not contain information about the contract | 账户没有该合约相关的信息 | queryAccountContractData | 
| 147 |  NHAsset do not exist | 非同质资产不存在 | queryNHAssets | 
| 148 | Request timeout, please try to unlock the account or login the account | 请求超时，请尝试解锁账户或登录账户 | queryVotes | 
| 149 | This wallet has already been imported | 此私钥已导入过钱包 | importPrivateKey | 
| 150 | Key import error | 导入私钥失败 | importPrivateKey | 
| 151 | File saving is not supported | 您的浏览器不支持文件保存 | backupDownload | 
| 152 | Invalid backup to download conversion | 无效的备份下载转换 | backupDownload | 
| 153 | Please unlock your wallet first | 请先解锁钱包 | importPrivateKey | 
| 154 | Please restore your wallet first | 请先恢复你的钱包 | backupDownload、unlockAccount | 
| 155 | Your browser may not support wallet file recovery | 浏览器不支持钱包文件恢复 | loadWalletFile | 
| 156 | The wallet has been imported. Do not repeat import | 该钱包已经导入，请勿重复导入 | restoreWallet | 
| 157 | Can't delete wallet, does not exist in index | 请求超时，请尝试解锁账户或登录账户 | deleteWallet | 
| 158 | Imported Wallet core assets can not be ***, and it should be *** | 导入的钱包核心资产不能为***，应为*** | restoreWallet | 
| 159 | Account exists | 账户已存在 | createAccountWithWallet | 
| 160 | You are not the creator of the Asset ***. | 你不是该资产的创建者 | issueAsset | 
| 161 | Orders do not exist | 订单不存在 | fillNHAssetOrder | 
| 162 | The asset already exists | 资产已存在 | createAsset | 
| 163 | The wallet already exists. Please try importing the private key | 钱包已经存在，请尝试导入私钥 | restoreWallet | 
| 164 | worldViews do not exist | 世界观不存在 | queryWorldViews | 
| 165 | There is no wallet account information on the chain | 链上没有该钱包账户信息 | restoreWallet | 
| 166 | The Wallet Chain ID does not match the current chain configuration information. The chain ID of the wallet is:***** | 该钱包链id与当前链配置信息不匹配，该钱包的链id为：**** | restoreWallet | 
| 167 | The current contract version ID was not found | 当前合约版本id没有找到* | queryContract | 


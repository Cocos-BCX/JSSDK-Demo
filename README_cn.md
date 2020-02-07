[English](https://github.com/Cocos-BCX/JSSDK-Demo/blob/master/README.md "English")

### JSSdk-Demo 使用说明

### 说明
###### JSSdk-Demo 通过集成[JS-SDK](https://github.com/Cocos-BCX/JSSDK) ，提供一个界面化的JSSDK接口体验工具；


### 使用 
###### clone 项目代码，并在浏览器中打开项目中的index.xml 文件即可，使用浏览器 ‘开发者工具’功能查看数据输出。

### 使用示例
 ###### 1.创建账户
 ![avatar](https://github.com/Cocos-BCX/JSSDK-Demo/blob/master/images/create_account.png)

 ###### 2.登录账户
  ![avatar](https://github.com/Cocos-BCX/JSSDK-Demo/blob/master/images/login.png)

  ###### 3.转账
  ![avatar](https://github.com/Cocos-BCX/JSSDK-Demo/blob/master/images/transfer.png)

- [JSSDK接口详细说明](https://github.com/Cocos-BCX/JSSDK/blob/master/README_cn.md)

###### 4.切换节点使用示例
1. 初始化jssdk对象bcx;

  ```ruby
  var _configParams = {
      ws_node_list: [{
        url: "wss://api.cocosbcx.net",
        name: "Cocos - China - Beijing"
      }, ],
      networks: [{
        core_asset: "COCOS",
        chain_id: "6057d856c398875cac2650fe33caef3d5f6b403d184c5154abbff526ec1143c4"
      }],
      faucet_url: "https://faucet.cocosbcx.net",
      auto_reconnect: true,
      // real_sub: true,
      // check_cached_nodes_data: false
    };
    bcx = new BCX(_configParams);
    ```
 - 初始化过程会使用_configParams中的节点参数，建立默认的节点连接；

2. 切换节点
 - API
 - apiConfig
	- 函数功能
	- API参数配置
	- 使用apiConfig函数切换节点示例
```ruby
  var node_config = { 
        default_ws_node: network.ws,
        ws_node_list:[
          {
            url: network.ws,
            name: network.name
          }, 
        ],
        networks:[
            {
                core_asset: "COCOS",
                chain_id: network.chainId 
            }
        ], 
        faucet_url:network.faucetUrl,
        auto_reconnect:true,
        real_sub:true,
        check_cached_nodes_data:false
      } 

      bcx.apiConfig(node_config, true).then(res=>{
        resolve(res)
      });
```

	- 参数说明
		- 参数一：
		- node\_config ： 要切换的节点参数配置，default_ws_node要切换节点的url，必须配置。

	- 参数二：
		- Boolean类型，true表示更改配置并切换节点，false表示只更改配置不切换节点。

3. 切换结果查询
    - API 
    - getAPIConfig
	- 返回值中的select_ws_node为当前连接的节点
	```ruby
      getApiConfig().then(res => {
         console.log("select_ws_node",res.select_ws_node)
       })
	```

4. 检查切换是否成功
	- 通过比较切换时apiConfig中的default_ws_node和getApiConfig中的select_ws_node是否一致判定, 相等则说明节点切换成功，否则失败。

```ruby
 apiConfigChangeAjax: function (chooseNode) {
      let _this = this
      apiConfigChange(chooseNode).then( res => {
        console.log('apiConfigChange')
        console.log(res)
        getApiConfig().then( getApiConfigRes => {
          console.log("getApiConfigRes")
          console.log(getApiConfigRes)
        let chooseNode = cacheSession.get('node').filter( item => {
          return item.name == _this.nodeName
        })[0]
          if (getApiConfigRes.select_ws_node == chooseNode.ws) {
            alert('切换成功')
          } else {
            alert('切换失败')
          }
        })
      })
    }
```

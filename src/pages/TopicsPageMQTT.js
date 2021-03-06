import React, { useEffect } from "react";
// import './App.css'
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

// https://cloud.tencent.com/document/product/876/19363
// https://console.cloud.tencent.com/tcb/env/login
// https://docs.cloudbase.net/api-reference/webv2/initialization.html
import cloudbase from "@cloudbase/js-sdk";
import { http } from "../helpers";

// node引入包名
// 浏览器、微信小程序，支付宝小程序引入./dist编译的js文件
//  js版本下载地址：
//  https://github.com/aliyun/alibabacloud-iot-device-sdk/
//  https://github.com/mqttjs/MQTT.js/tree/v3.0.0
// const iot = require('alibabacloud-iot-device-sdk/dist/alibabacloud-iot-device-sdk.js');
const mqtt = require('mqtt');
const cryptojs = require('crypto-js');


// https://reactrouter.com/web/example/nesting
export default function TopicsPage() {
  let {path, url} = useRouteMatch();
  console.log(cloudbase)
  const app = cloudbase.init({
    env: 'hello-cloudbase-4go22m4jaa7a36e5' // 您的环境id
  })
  var auth = app.auth({persistence: 'local'});


  async function login(){
    const signInResp = await auth.anonymousAuthProvider().signIn();
    // 匿名登录成功检测登录状态isAnonymous字段为true
    const loginState = await auth.getLoginState();
    console.log(signInResp, loginState.isAnonymous); // true
  }

  useEffect(() => {

    // TODO fingerprintjs, clientjs or their alternatives
    // TODO multiple devices, as remote control device and display device.
    // TODO localStorage
    // TODO username and password , or Google / Github Login
    const [ productKey, productSecret, deviceName] = 
      ['a16ErpTCBWY', 'gKFpA0YgWsdVpb5U', 'ABC' + Date.now()];

    const [clientId, random] = [`${deviceName}.${productKey}`, Date.now()];

    const content = `deviceName${
      deviceName
    }productKey${productKey}random${random}`;
    const signedContent = cryptojs.HmacSHA1(content,productSecret).toString();
    // const device = mqtt.connect(`wss://${productKey}.iot-as-mqtt.cn-shanghai.aliyuncs.com:443`,{
    //   clientId: `${clientId}|securemode=-2,authType=regnwl,random=${random},signmethod=hmacsha1|`,
    //   username: `${deviceName}&${productKey}`,
    //   password: signedContent,
    //   keepalive: 300,
    // });
    // get为订阅的信息
    // data 为双向
    // const sb = `/${productKey}/${deviceName}/user/data`;
    // device.subscribe(sb , null , (...e) => {
    //   console.log('inside subscribe', e)
    // });
    // device.on(`connect`, (...e) => {
      // console.log(`connect successfully!`, e);
      // update 为上报
      // data为双向
      // const id = setInterval(() => {
      //   device.publish(`/${productKey}/${deviceName}/user/data`, `hello world!` + new Date(), (err) => {
      //     if (err) {
      //       clearInterval(id);
      //     }
      //   });
      // }, 3000);
    // });
    // device.on('message', (topic, payload) => {
    //   console.log(topic, payload.toString());
    // });
    // device.on('error', (err) => {
    //   console.log('error:',err);
    // });
    async function dbLogics(){
      login();
      const db = app.database();
      const devices = db.collection("devices");
      const result = await devices.where({deviceId: '0000'}).get();
      console.log('tencent cloudbase', result)

      http.post('https://service-ripfq8y3-1251786267.sh.apigw.tencentcs.com/release/register',{deviceName: 'test'+ Date.now()}).then(response => {
        console.log(response)
      })
    }
    dbLogics();

    // clean up things when component destroyed.
    // https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup 
    return () => { 
      // device.unsubscribe(sb, (...e)=>console.log('inside unsubscribe',e));
      // device.end({force: true}, (...e)=>console.log('inside end',e))
    }
  }, []); // [] empty array 
  // see https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects
  return (
    <div>
      <h2>UnFinished未完成 Topics/Remote</h2>

      <ul>
        <li>
          <Link to={`${url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${url}/props-v-state`}>
            Props v. State
          </Link>
        </li>
      </ul>

      {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
      <Switch>
        <Route exact path={path}>
          <h3>Please select a topic.</h3>
        </Route>
        <Route path={`${path}/:topicId`}>
          <Topic />
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  let { topicId } = useParams();
  return <h3>Requested topic ID: {topicId}</h3>;
}
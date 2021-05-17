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

// node引入包名
// 浏览器、微信小程序，支付宝小程序引入./dist编译的js文件
//  js版本下载地址：
//    https://github.com/aliyun/alibabacloud-iot-device-sdk/
//  https://github.com/mqttjs/MQTT.js/tree/v3.0.0
const iot = require('alibabacloud-iot-device-sdk/dist/alibabacloud-iot-device-sdk.js');

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
    const [ productKey, deviceName, deviceSecret] = ['a16ErpTCBWY', '0000', 'cdda15575d6c4cf344e5c12c9e11b823']
    const device = iot.device({
      productKey,
      deviceName,
      deviceSecret,
      tls: false,
      // 支付宝小程序和微信小程序额外需要配置协议参数
      // "protocol": 'alis://', "protocol": 'wxs://',
      // `hello!!!`
    });
    // get为订阅的信息
    const sb = `/${productKey}/${deviceName}/user/get`;
    device.subscribe(sb , null , (...e) => {
      console.log('inside subscribe', e)
    });
    device.on(`connect`, (...e) => {
      console.log(`connect successfully!`, e);
      // update 为上报
      device.publish(`/${productKey}/${deviceName}/user/update`, `hello world!`);
    });
    device.on('message', (topic, payload) => {
      console.log(topic, payload.toString());
    });

    async function dbLogics(){
      login();
      const db = app.database();
      const devices = db.collection("devices");
      const result = await devices.where({deviceId: '0000'}).get();
      console.log('tencent cloudbase', result)
    }
    dbLogics();

    // clean up things when component destroyed.
    // https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup 
    return () => { 
      device.unsubscribe(sb, (...e)=>console.log('inside unsubscribe',e));
      device.end({force: true}, (...e)=>console.log('inside end',e))
    }
  }, []); // [] empty array 
  // see https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects
  return (
    <div>
      <h2>Topics</h2>

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
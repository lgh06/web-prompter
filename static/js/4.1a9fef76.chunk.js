(this["webpackJsonpprompter-web"]=this["webpackJsonpprompter-web"]||[]).push([[4],{42:function(e,n,t){"use strict";t.r(n),t.d(n,"default",(function(){return h}));var c=t(26),o=t.n(c),r=t(33),s=t(0),a=t(5),i=t(16),l=t(158),u=t(11),p=t(1),d=t(173);function h(){var e=Object(a.h)(),n=e.path,t=e.url;console.log(l.a);var c=l.a.init({env:"hello-cloudbase-4go22m4jaa7a36e5"}),h=c.auth({persistence:"local"});function f(){return j.apply(this,arguments)}function j(){return(j=Object(r.a)(o.a.mark((function e(){var n,t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.anonymousAuthProvider().signIn();case 2:return n=e.sent,e.next=5,h.getLoginState();case 5:t=e.sent,console.log(n,t.isAnonymous);case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(s.useEffect)((function(){var e="a16ErpTCBWY",n="0000",t=d.device({productKey:e,deviceName:n,deviceSecret:"cdda15575d6c4cf344e5c12c9e11b823",tls:!1}),s="/".concat(e,"/").concat(n,"/user/data");function a(){return(a=Object(r.a)(o.a.mark((function e(){var n,t,r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return f(),n=c.database(),t=n.collection("devices"),e.next=5,t.where({deviceId:"0000"}).get();case 5:r=e.sent,console.log("tencent cloudbase",r),u.e.post("https://service-ripfq8y3-1251786267.sh.apigw.tencentcs.com/release/register",{deviceName:"test"+Date.now()}).then((function(e){console.log(e)}));case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return t.subscribe(s,null,(function(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];console.log("inside subscribe",n)})),t.on("connect",(function(){for(var c=arguments.length,o=new Array(c),r=0;r<c;r++)o[r]=arguments[r];console.log("connect successfully!",o);var s=setInterval((function(){t.publish("/".concat(e,"/").concat(n,"/user/data"),"hello world!"+new Date,(function(e){e&&clearInterval(s)}))}),3e3)})),t.on("message",(function(e,n){console.log(e,n.toString())})),t.on("error",(function(e){console.log("error:",e)})),function(){a.apply(this,arguments)}(),function(){t.unsubscribe(s,(function(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];return console.log("inside unsubscribe",n)})),t.end({force:!0},(function(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];return console.log("inside end",n)}))}}),[]),Object(p.jsxs)("div",{children:[Object(p.jsx)("h2",{children:"Topics UnFinished\u672a\u5b8c\u6210 Topics/Remote"}),Object(p.jsxs)("ul",{children:[Object(p.jsx)("li",{children:Object(p.jsx)(i.b,{to:"".concat(t,"/components"),children:"Components"})}),Object(p.jsx)("li",{children:Object(p.jsx)(i.b,{to:"".concat(t,"/props-v-state"),children:"Props v. State"})})]}),Object(p.jsxs)(a.c,{children:[Object(p.jsx)(a.a,{exact:!0,path:n,children:Object(p.jsx)("h3",{children:"Please select a topic."})}),Object(p.jsx)(a.a,{path:"".concat(n,"/:topicId"),children:Object(p.jsx)(b,{})})]})]})}function b(){var e=Object(a.g)().topicId;return Object(p.jsxs)("h3",{children:["Requested topic ID: ",e]})}}}]);
//# sourceMappingURL=4.1a9fef76.chunk.js.map
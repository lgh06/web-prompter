(this["webpackJsonpprompter-web"]=this["webpackJsonpprompter-web"]||[]).push([[2],{176:function(e,t){},178:function(e,t){},247:function(e,t){},249:function(e,t){},272:function(e,t){},273:function(e,t){},275:function(e,t){},277:function(e,t){},285:function(e,t){},287:function(e,t){},43:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return d}));var c=n(25),o=n.n(c),r=n(33),s=n(0),a=n(4),i=n(16),u=n(158),p=n(11),l=n(1),h=(n(174),n(290));function d(){var e=Object(a.h)(),t=e.path,n=e.url;console.log(u.a);var c=u.a.init({env:"hello-cloudbase-4go22m4jaa7a36e5"}),d=c.auth({persistence:"local"});function f(){return b.apply(this,arguments)}function b(){return(b=Object(r.a)(o.a.mark((function e(){var t,n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.anonymousAuthProvider().signIn();case 2:return t=e.sent,e.next=5,d.getLoginState();case 5:n=e.sent,console.log(t,n.isAnonymous);case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(s.useEffect)((function(){var e="a16ErpTCBWY",t="ABC"+Date.now(),n=["".concat(t,".").concat(e),Date.now()],s=n[1],a="deviceName".concat(t,"productKey").concat(e,"random").concat(s);h.HmacSHA1(a,"gKFpA0YgWsdVpb5U").toString();function i(){return(i=Object(r.a)(o.a.mark((function e(){var t,n,r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return f(),t=c.database(),n=t.collection("devices"),e.next=5,n.where({deviceId:"0000"}).get();case 5:r=e.sent,console.log("tencent cloudbase",r),p.d.post("https://service-ripfq8y3-1251786267.sh.apigw.tencentcs.com/release/register",{deviceName:"test"+Date.now()}).then((function(e){console.log(e)}));case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return function(){i.apply(this,arguments)}(),function(){}}),[]),Object(l.jsxs)("div",{children:[Object(l.jsx)("h2",{children:"Topics"}),Object(l.jsxs)("ul",{children:[Object(l.jsx)("li",{children:Object(l.jsx)(i.b,{to:"".concat(n,"/components"),children:"Components"})}),Object(l.jsx)("li",{children:Object(l.jsx)(i.b,{to:"".concat(n,"/props-v-state"),children:"Props v. State"})})]}),Object(l.jsxs)(a.c,{children:[Object(l.jsx)(a.a,{exact:!0,path:t,children:Object(l.jsx)("h3",{children:"Please select a topic."})}),Object(l.jsx)(a.a,{path:"".concat(t,"/:topicId"),children:Object(l.jsx)(j,{})})]})]})}function j(){var e=Object(a.g)().topicId;return Object(l.jsxs)("h3",{children:["Requested topic ID: ",e]})}}}]);
//# sourceMappingURL=2.8a181331.chunk.js.map
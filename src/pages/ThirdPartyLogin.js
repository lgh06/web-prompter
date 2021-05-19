import React, { useEffect, useState } from "react";
import {
  Switch,
  Route,
  useRouteMatch,
  useLocation,
} from "react-router-dom";
import { http } from '../helpers'

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ThirdPartyLogin() {
  let {path} = useRouteMatch();
  const [hasError, setHasError] = useState(0);
  let query = useQuery();
  const code = query.get('code');
  console.log(path,code);
  const client_id = `7655eb7db1a4a231eabe015c2f9c1db15439d4da3318d36c0c954d5212f14b47`;
  const redirect_uri = 'http://localhost:3000/3login';
  const redirect_uri_encoded = 'http%3A%2F%2Flocalhost%3A3000%2F3login';
  useEffect(() => {
    if (!code) return;
    // https://gitee.com/api/v5/swagger#/getV5User
    // https://gitee.com/api/v5/oauth_doc#/
    http.post('https://gitee.com/oauth/token?grant_type=authorization_code', {
      // grant_type: 'authorization_code',
      code,
      client_id,
      redirect_uri,
      client_secret: '26f19d826419da9c8250f3e5d885db27e55729b1550f56a1cafec26a0dd5fbe1'
    }).then(res =>{
      console.log(res)
      if (!res.error){
        http.get('https://gitee.com/api/v5/user', {
          access_token: res.access_token
        }).then(res =>{
          // TODO save to store and localStorage
          console.log(res)
        })
      } else {
        setHasError(1);
      }
    })
  }, [code]);
  return (
    <>
    UnFinished未完成 <br/>
    Source Code see https://github.com/lgh06/web-prompter   <br/>
    {/* {
      (code) && (
        <>
          Code is {code}
        </>
        )
    } */}
    {
      (!code || hasError) ? (
          <>
            {hasError ? '请重试' : ''}
            <a href={`https://gitee.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri_encoded}&response_type=code&scope=user_info%20emails`}>Gitee码云登录</a>
          </>
        ) : ('登录成功')
    }
    </>
  );

}
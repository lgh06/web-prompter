import {
  Switch,
  Route,
  useRouteMatch,
  useLocation,
} from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ThirdPartyLogin() {
  let {path} = useRouteMatch();
  let query = useQuery();
  const code = query.get('code');
  console.log(path,code);
  return (
    <>
    Code is {code}
    </>
  );

}
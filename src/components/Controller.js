import react from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as player from '../reducers/playerSlice'

export default function Controller() {
  const dispatch = useDispatch()
  return (<div>
    Controller
    <button onClick={()=>dispatch(player.speedPlus())}>+</button>
    <button onClick={()=>dispatch(player.speedMinus())}>-</button>
  </div>);
}
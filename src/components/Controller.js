import { useDispatch, useSelector } from 'react-redux'
import * as player from '../reducers/playerSlice'

export default function Controller() {
  const dispatch = useDispatch()
  const speed = useSelector((state) => state.player.speed)
  return (<div>
    Speed
    <button onClick={()=>dispatch(player.speedPlus())}>+</button>
    <button onClick={()=>dispatch(player.speedMinus())}>-</button>
    <input type="number" value={speed} onChange={(e)=>dispatch(player.speedSet(e.target.value))}></input>
  </div>);
}
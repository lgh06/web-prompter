import { useDispatch, useSelector } from 'react-redux'
import * as player from '../reducers/playerSlice'
import { genClassName } from '../helpers';
import styles from './Controller.module.scss';

const cn = genClassName(styles);

export default function Controller() {
  const dispatch = useDispatch()
  const speed = useSelector((state) => state.player.speed)
  return (<div {...cn('controller-wrap')}>
    Speed
    <button onClick={()=>dispatch(player.setSpeed('+10'))}>+</button>
    <button onClick={()=>dispatch(player.setSpeed('-10'))}>-</button>
    <input type="number" value={speed} onChange={(e)=>dispatch(player.setSpeed(e.target.value))}></input>
    <br />
    <button onClick={()=>dispatch(player.setInnerHTML(''))}>清空Clear</button>
    <br />
    <button onClick={()=>dispatch(player.setPlay('start'))}>开始Begin</button>
    
  </div>);
}
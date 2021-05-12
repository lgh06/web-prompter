import { useDispatch, useSelector } from 'react-redux'
import * as player from '../reducers/playerSlice'
import { genClassName } from '../helpers';
import styles from './Controller.module.scss';

const cn = genClassName(styles);

export default function Controller() {
  const dispatch = useDispatch()
  const speed = useSelector((state) => state.player.speed)
  const appendMode = useSelector((state) => state.player.appendMode)
  return (<div {...cn('controller-wrap')}>
    Speed
    <button onClick={()=>dispatch(player.speedPlus())}>+</button>
    <button onClick={()=>dispatch(player.speedMinus())}>-</button>
    <button onClick={()=>dispatch(player.deleteInnerHTML())}>全删除</button>
    <input type="number" value={speed} onChange={(e)=>dispatch(player.speedSet(e.target.value))}></input>
    <input type="checkbox" checked={appendMode} onChange={(e)=>dispatch(player.setAppendMode(e.target.checked))} id="appendMode"/>
    <label htmlFor="appendMode"> {appendMode ? '末尾追加' : '整体替换'} </label>
  </div>);
}
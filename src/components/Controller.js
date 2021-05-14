import { useDispatch, useSelector } from 'react-redux'
import * as player from '../reducers/playerSlice'
import { genClassName } from '../helpers';
import styles from './Controller.module.scss';

const cn = genClassName(styles);

export default function Controller() {
  const dispatch = useDispatch()
  const { speed, viewerCSS } = useSelector((state) => state.player)
  const onChange = (e, name) => {
    let tmpValue = e.currentTarget.value;
    // if (name ==='fontSize'){
    //   tmpValue += 'px'
    // }
    dispatch(player.setViewerCSS({
      [name]: tmpValue
    }))
    
  }
  return (<div {...cn('controller-wrap')}>
    Speed
    <button onClick={()=>dispatch(player.setSpeed('+10'))}>+</button>
    <button onClick={()=>dispatch(player.setSpeed('-10'))}>-</button>
    <input type="number" value={speed} onChange={(e)=>dispatch(player.setSpeed(e.target.value))}></input>
    <br />
    <button onClick={()=>dispatch(player.setInnerHTML(''))}>清空Clear</button>
    <button onClick={()=>dispatch(player.setPlay('start'))}>开始Begin</button>
    <br />
    {['backgroundColor', 'fontSize', 'color','lineHeight', 'fontWeight'].map(v => {
      return (
        <>
        <span>{v}</span> &nbsp;
        <input type="text" name="" value={viewerCSS[v]} id="" placeholder={v} onInput={(e) => onChange(e, v)}/>
        <br/>
        </>
      )
    })}

  </div>);
}
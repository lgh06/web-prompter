import { useDispatch, useSelector } from 'react-redux'
import * as player from '../reducers/playerSlice'
import { genClassName } from '../helpers';
import styles from './Setting.module.scss';

const cn = genClassName(styles);

export default function Setting(props) {
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
  const onCheckChange = (e, name) => {
    let checked = e.currentTarget.checked;
    dispatch(player.setMirror({
      key: name,
      value: checked,
    }))
  }
  const cssNameAndHint = [
    {
      key: 'backgroundColor',
      hint: '背景色',
    },
    {
      key: 'color',
      hint: '字体颜色',
    },
    {
      key: 'fontFamily',
      hint: '字体',
    },
    {
      key: 'fontSize',
      hint: '字体大小',
    }, 
    {
      key: 'fontWeight',
      hint: '字体粗细',
    },
    {
      key: 'lineHeight',
      hint: '行间距',
    },
  ]
  return (<div {...cn('setting-wrap')}>
    Speed
    <button onClick={()=>dispatch(player.setSpeed('+20'))}>+20</button>
    <button onClick={()=>dispatch(player.setSpeed('-10'))}>-10</button>
    <input type="number" value={speed} onChange={(e)=>dispatch(player.setSpeed(e.target.value))}></input>
    <br /><br />
    <input type="checkbox" id='mirror-h' onChange={(e)=>onCheckChange(e, 'h')} /><label htmlFor="mirror-h">horizon mirror水平翻转</label>
    <br />
    <input type="checkbox" id='mirror-v' onChange={(e)=>onCheckChange(e, 'v')} /><label htmlFor="mirror-v">vertical mirror垂直翻转</label>
    <br /><br />
    {/* <button onClick={()=>dispatch(player.setInnerHTML(''))}>清空Clear</button>
    <button onClick={()=>dispatch(player.setPlayAndAnimation('start'))}>开始Start</button>
    <br /> */}
    {cssNameAndHint.map(v => {
      return (
        <>
        <span>{v.hint} {v.key}</span> &nbsp;
        <input type="text" name="" value={viewerCSS[v.key]} id="" placeholder={v.key} onInput={(e) => onChange(e, v.key)}/>
        <br/>
        </>
      )
    })}

  </div>);
}
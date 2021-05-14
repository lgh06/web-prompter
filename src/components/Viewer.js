import React, { useEffect } from 'react';
import styles from './Viewer.module.scss';
import { genClassName, ImageHolder, innerHTML as setInnerHTML } from '../helpers';

import { useSelector, useDispatch } from 'react-redux'
import * as player from '../reducers/playerSlice'

// used for scss modules https://create-react-app.dev/docs/adding-a-css-modules-stylesheet
const cn = genClassName(styles);

export default function Viewer() {
  const { speed, innerHTML, play } = useSelector((state) => state.player)
  const dispatch = useDispatch()

  useEffect(() => {
    document.addEventListener('keydown',(e) => {
      if(e.key === 'q' && play === 1){
        dispatch(player.setPlay('quit'))      
      }
    })
  });
  const onChange = (e) => {
    dispatch(player.setInnerHTML( e.target.innerHTML ))
    console.log(e.target.innerHTML)
  }
  return (<div {...cn('viewer-wrap')}>
    <div {...cn('viewer @viewer')}>
      <pre {...cn('text @text')} contentEditable={play ? 'false': 'true'} onInput={onChange}
        suppressContentEditableWarning={true}
      >
      You can paste or input texts here. <br/>
      你可以把文字粘贴在这里。或用输入法输入。
      </pre>
      <div {...cn('quit-full @quit-full')} onClick={() => dispatch(player.setPlay('quit'))}>退出Quit</div>
    </div>
    <div {...cn('status')} {...setInnerHTML('speed is ' + speed)} >
      
    </div>
  </div>);
}
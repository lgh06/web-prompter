import React, { useEffect } from 'react';
import styles from './Viewer.module.scss';
import { genClassName, ImageHolder, innerHTML as setInnerHTML } from '../helpers';

import { useSelector, useDispatch } from 'react-redux'
import * as player from '../reducers/playerSlice'

// used for scss modules https://create-react-app.dev/docs/adding-a-css-modules-stylesheet
const cn = genClassName(styles);

export default function Viewer() {
  const { speed, innerHTML, play, viewerCSS } = useSelector((state) => state.player)
  const dispatch = useDispatch()

  useEffect(() => {
    document.addEventListener('keydown',(e) => {
      if( (e.keyCode === 1 || e.keyCode === 87 ) && play === 1){
        dispatch(player.setPlay('quit'))      
      }
    })
    document.addEventListener('fullscreenchange', () => {
      if (play === 1){
        document.querySelector('pre.text').scrollTo(0, 0);
      }
    })
  });
  const onChange = (e) => {
    dispatch(player.setInnerHTML( e.target.innerHTML ))
    console.log(e.target.innerHTML,e.currentTarget.scrollHeight)
    dispatch(player.setState({key: 'height', value: e.currentTarget.scrollHeight}));
  }
  return (<div {...cn('viewer-wrap')}>
    <div {...cn('viewer @viewer')} style={viewerCSS}>
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
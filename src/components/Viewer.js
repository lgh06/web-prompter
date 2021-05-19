import React, { useEffect } from 'react';
import styles from './Viewer.module.scss';
import { genClassName, genClassString, ImageHolder, innerHTML as setInnerHTML } from '../helpers';

import { useSelector, useDispatch } from 'react-redux'
import * as player from '../reducers/playerSlice'

// used for scss modules https://create-react-app.dev/docs/adding-a-css-modules-stylesheet
const cn = genClassName(styles);
const cstr = genClassString(styles);

export default function Viewer() {
  const { speed, playing, viewerCSS, movedHeight, paused, mirror } = useSelector((state) => state.player)
  let preWrapClass = '';
  if (mirror.v && mirror.h){
    preWrapClass = 'mirror-hv'
  }else if (mirror.v){
    preWrapClass = 'mirror-v'
  }else if (mirror.h){
    preWrapClass = 'mirror-h'
  }else{
    preWrapClass = ''
  }
  const dispatch = useDispatch()

  useEffect(() => {
    document.addEventListener('keydown',(e) => {
      if( (e.keyCode === 1 || e.keyCode === 87 ) && playing === 1){
        dispatch(player.setPlay('exit'))      
      }
    })
  });
  useEffect(() => {
    window.addEventListener('orientationchange',(e) => {
      dispatch(player.setState({key: 'clientHeight', value: document.body.clientHeight}));
    })
  },[]);
  useEffect(() => {
    console.log('inside movedHeight')
    document.querySelector('pre.text').style.transform = `translateY(-${movedHeight}px)`
  }, [movedHeight])

  useEffect(() => {
    console.log('inside playing, speed')
    let intervalId;
    let tmpMovedHeight = movedHeight;
    if (playing){
      intervalId = setInterval(() => {
        tmpMovedHeight += speed/2.5;
        console.log(tmpMovedHeight, 'tmpMovedHeight')
        dispatch(player.setState({key: 'movedHeight', value: tmpMovedHeight}))
      }, 400)
    } else {
      clearInterval(intervalId);
    }

    if (paused) {
      clearInterval(intervalId);
    }

    return () =>{
      clearInterval(intervalId);
    }
  }, [playing, speed, movedHeight, paused])

  const onChange = (e) => {
    dispatch(player.setInnerHTML( e.target.innerHTML ))
    console.log(e.currentTarget.scrollHeight,  document.body.clientHeight)
    dispatch(player.setState({key: 'scrollHeight', value: e.currentTarget.scrollHeight}));
    dispatch(player.setState({key: 'clientHeight', value: document.body.clientHeight}));
  }
  return (<div {...cn('viewer-wrap')}>
    <div {...cn('viewer @viewer')} style={viewerCSS}>
      <div
        className={cstr('pre-wrap @pre-wrap') + ' ' + cstr(preWrapClass)}>
        <pre {...cn('text @text')} contentEditable={playing ? 'false': 'true'} onInput={onChange}
          suppressContentEditableWarning={true}
        >
        You can paste or input texts here. <br/>
        你可以把文字粘贴在这里。或用输入法输入。 <br/>
        Ctrl + Shift + V , or right click, paste text only. <br/>
        Ctrl + Shift + V ， 或 右键， 粘贴为纯文本 。
        </pre>
      </div>
      <div {...cn('btn')} onClick={() =>dispatch(player.setPlayAndAnimation('prev'))}>向前Prev</div>
      <div {...cn('btn')} onClick={()=>dispatch(player.setSpeed('-10'))}>慢点Slower</div>
      <div {...cn('btn')} onClick={() =>dispatch(player.setPlayAndAnimation('pause'))}>
        {paused?'恢复Continue' :'暂停Pause'}
      </div>
      <div {...cn('btn')} onClick={()=>dispatch(player.setSpeed('+20'))}>快点Faster</div>
      <div {...cn('btn')} onClick={() =>dispatch(player.setPlayAndAnimation('next'))}>向后Next</div>
      <div {...cn('exit-full @exit-full btn')} 
        onClick={() => playing ? dispatch(player.setPlayAndAnimation('exit')):
          dispatch(player.setPlayAndAnimation('start'))
      }>
        {playing ? '退出Exit' : '开始Start'}
      </div>
      <div {...cn('btn clear')} onClick={()=>dispatch(player.setInnerHTML(''))}>清空Clear</div>

    </div>
    <div {...cn('status')} {...setInnerHTML('speed is ' + speed)} >
      
    </div>
  </div>);
}
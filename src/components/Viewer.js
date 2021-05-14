import React, {useEffect} from 'react';
import styles from './Viewer.module.scss';
import { genClassName, ImageHolder, innerHTML as setInnerHTML } from '../helpers';

import { useSelector, useDispatch } from 'react-redux'
import * as player from '../reducers/playerSlice'

// used for scss modules https://create-react-app.dev/docs/adding-a-css-modules-stylesheet
const cn = genClassName(styles);

export default function Viewer() {
  const { speed, innerHTML } = useSelector((state) => state.player)
  const dispatch = useDispatch()

  // const click = (event) => {
  //   console.log(event)
  //   event.nativeEvent.target.select();
  // }
  const onChange = (e) => {
    dispatch(player.setInnerHTML( e.target.innerHTML ))
    console.log(e.target.innerHTML)
  }
  return (<div {...cn('viewer-wrap')}>
    <div {...cn('viewer')}>
      <pre {...cn('text')} contentEditable onInput={onChange}
        suppressContentEditableWarning={true}
      >
      You can paste or input texts here. <br/>
      你可以把文字粘贴在这里。或用输入法输入。
      </pre>
    </div>
    <div {...cn('status')} {...setInnerHTML('speed is ' + speed)} >
      
    </div>
  </div>);
}
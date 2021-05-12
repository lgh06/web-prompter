import React, {useEffect} from 'react';
import styles from './Viewer.module.scss';
import { genClassName, ImageHolder, innerHTML as setInnerHTML } from '../helpers';

import { useSelector, useDispatch } from 'react-redux'
import * as player from '../reducers/playerSlice'

// used for scss modules https://create-react-app.dev/docs/adding-a-css-modules-stylesheet
const cn = genClassName(styles);

export default function Viewer() {
  const speed = useSelector((state) => state.player.speed)
  const innerHTML = useSelector((state) => state.player.innerHTML)
  const appendMode = useSelector((state) => state.player.appendMode)
  const dispatch = useDispatch()
  // https://developer.mozilla.org/en-US/docs/Web/API/Element/paste_event
  const paste = (event) => {
    // https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/getData
    let paste = (event.clipboardData || window.clipboardData).getData('text/plain');
    console.log(paste)
    let pastedWithBr = paste.replace(/\r\n/g,'<br/>')

    // event.target.innerHTML += paste.replace(/\r\n/g,'<br/>')
    if (appendMode) {
      dispatch(player.setInnerHTML(innerHTML + pastedWithBr));
    } else {
      dispatch(player.setInnerHTML(pastedWithBr));
    }
    event.preventDefault();
  }

  // const click = (event) => {
  //   console.log(event)
  //   event.nativeEvent.target.select();
  // }
  return (<div {...cn('viewer-wrap')}>
    <div {...cn('viewer')}>
      <p {...cn('text')} contentEditable onPaste={paste} {...setInnerHTML(innerHTML)}>
      </p>
    </div>
    <div {...cn('status')} {...setInnerHTML('speed is ' + speed)} >
      
    </div>
  </div>);
}
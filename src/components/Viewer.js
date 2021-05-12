import React, {useEffect} from 'react';
import styles from './Viewer.module.scss';
import { genClassName, ImageHolder, innerHTML } from '../helpers';

import { useSelector } from 'react-redux'
// used for scss modules https://create-react-app.dev/docs/adding-a-css-modules-stylesheet
const cn = genClassName(styles);

export default function Viewer() {
  useEffect(()=>{
    // document.addEventListener('beforepaste', function(e) {
    //   // const text_only = document.getSelection().toString();
    //   const clipdata = e.clipboardData || window.clipboardData;  
    //   // clipdata.setData('text/plain', text_only);
    //   // clipdata.setData('text/html', text_only);
    //   console.log(e, clipdata.toString());
    //   e.preventDefault();
    // });
  });
  const speed = useSelector((state) => state.player.speed)
  // https://developer.mozilla.org/en-US/docs/Web/API/Element/paste_event
  const paste = (event) => {
    // https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/getData
    let paste = (event.clipboardData || window.clipboardData).getData('text/plain');
    console.log(paste)

    const selection = window.getSelection();
    if (!selection.rangeCount) return false;
    selection.deleteFromDocument();
    selection.getRangeAt(0).insertNode(document.createTextNode(paste));

    event.preventDefault();
  }
  return (<div {...cn('viewer-wrap')}>
    <div {...cn('viewer')}>
      <pre contentEditable onPaste={paste}>
        You can paste texts here. 
        你可以把文字粘贴在这里。
      </pre>
    </div>
    <div {...cn('status')} {...innerHTML('speed is ' + speed)} >
      
    </div>
  </div>);
}
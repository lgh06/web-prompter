import React from 'react';
import styles from './Viewer.module.scss';
import { genClassName, ImageHolder, innerHTML } from '../helpers';

import { useSelector, useDispatch } from 'react-redux'
import * as playerSlice from '../reducers/playerSlice'
// used for scss modules https://create-react-app.dev/docs/adding-a-css-modules-stylesheet
const cn = genClassName(styles);

export default function Viewer() {
  const speed = useSelector((state) => state.player.speed)
  return (<div {...cn('aa bb')}>
    Viewer <br/>
    speed is {speed}
    <ImageHolder width="300" height="300" />
    <div {...innerHTML('test')}></div>
  </div>);
}
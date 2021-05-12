import React from 'react';
import styles from './Viewer.module.scss';
import { genClassName, ImageHolder, innerHTML } from '../helpers';
const cn = genClassName(styles);

export default function Controller() {
  return (<div {...cn('aa bb')}>
    Controller
    <ImageHolder width="300" height="300" />
    <div {...innerHTML('test')}></div>
  </div>);
}
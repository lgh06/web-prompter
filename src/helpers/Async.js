import React from 'react';
import loadable from '@loadable/component'

// see also https://github.com/edgefront/cms-mono/tree/mono/packages/cms-admin/src
// https://loadable-components.com/docs/dynamic-import/
const DefaultLoading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
const AsyncPage = loadable(props => import(`../pages/${props.page}`), {
  fallback: <DefaultLoading></DefaultLoading>,
  cacheKey: props => props.page,
})

const AsyncComp = loadable(props => import(`../components/${props.comp}`), {
  fallback: <DefaultLoading></DefaultLoading>
})

export {DefaultLoading, AsyncPage, AsyncComp}
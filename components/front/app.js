import {render} from 'react-dom';
import {GetRouter} from './index'

render(GetRouter(), document.getElementById('root'));
delete global.__ReactInitState__;

// // decomment for testing perf
// import React from 'react/addons'
// window.React = React

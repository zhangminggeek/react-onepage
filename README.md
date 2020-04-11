# react-onepage

本库可用于快速创建单页滚动（全屏滚动）效果组件，并提供可配置动画效果及相关钩子

## 用法

### 安装

```
npm install @zhangmmm/react-onepage --save
```

### 例子

```jsx
import React from 'react';
import { render } from 'react-dom';
import OnePage from '@zhangmmm/react-onepage';

const App = () => (
  <OnePage>
    <div style={{ height: '100vh', backgroundColor: 'green' }}></div>
    <div style={{ height: '100vh', backgroundColor: 'red' }}></div>
    <div style={{ height: '100vh', backgroundColor: 'blue' }}></div>
    <div style={{ height: '100vh', backgroundColor: 'yellow' }}></div>
  </OnePage>
);

render(<App />, document.getElementById('root'));
```

## API

| 属性            | 说明                 | 类型     | 默认值 |
| --------------- | -------------------- | -------- | ------ |
| speed           | 过渡动画速度(ms)     | Number   | 1500   |
| animation       | 过渡动画类型         | String   | ease   |
| delay           | 过渡动画延迟时间(ms) | Number   | 0      |
| onTransitionEnd | 过渡动画结束回调     | Function | -      |

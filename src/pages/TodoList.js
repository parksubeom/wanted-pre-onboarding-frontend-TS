
import React from 'react';

export default function TodoList({ userInfo,setUserInfo,setIsLogin }) {
  

  return (
    <div className='container'>
      <li>
  <label>
    <input type="checkbox" />
    <span>TODO 1</span>
  </label>
</li>
<li>
  <label>
    <input type="checkbox" />
    <span>TODO 2</span>
  </label>
</li>
    </div>
  );
}

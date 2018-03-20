import React from 'react';
import 'font-awesome/css/font-awesome.min.css';
import { NavigationBar } from './UserBlockNavigationBar.style';

const userBlockNavigationBar = (props) => (
    <NavigationBar>
        <div onClick={props.clickMessage}>
          <i className='fa fa-envelope-o'/>
        </div>

        <div onClick={props.clickGroups}>
            <i className='fa fa-group'/>
        </div>
        <div onClick={props.clickPosts}>
            <i className='fa fa-newspaper-o'/>
        </div>
    </NavigationBar>
);

export default userBlockNavigationBar;
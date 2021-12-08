import React from 'react';
import { Redirect } from "react-router-dom";
import { message } from 'antd';
import './Main.scss';
import { isLogin } from "../../App";


class Main extends React.Component {

    componentDidMount() {
        if(!isLogin()){
            message.info('Please Login!')
        }
    }

    render() {
        // user can only access after logging in
        return !isLogin()?
            <Redirect to={'/login'} />  :(
          <div>main</div>
        )
    }
}

export default Main;
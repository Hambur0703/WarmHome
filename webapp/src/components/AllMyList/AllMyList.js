import React from 'react';
import { Redirect } from "react-router-dom";
import { message } from 'antd';
import { isLogin } from "../../App";

class AllMyList extends React.Component {

    componentDidMount() {
        if(!isLogin()){
            message.info('Please Login!')
        }
    }

    render() {
        return !isLogin()?
            <Redirect to={'/login'} />  :(
                <div>All my list</div>
            )
    }
}

export default AllMyList;
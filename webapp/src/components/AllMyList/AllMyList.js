import React from 'react';
import { Redirect } from "react-router-dom";
import { message } from 'antd';
import { isLogin } from "../../App";
import axios from 'axios';
import Card from "./Card";
import './AllmyList.scss';

class AllMyList extends React.Component {
    state = {
        aptList:[] //all 6 info 不是小卡片的state
    }

    componentDidMount() {
        if(!isLogin()){
            message.info('Please Login!')
        }
        this.getAptListLike()
        console.log("getAptListLike success")
    }
    getAptListLike = async()=>{
        try{
            const res = await axios.get('http://localhost:3002/apt/liked')
            console.log('res',res)

            this.setState({
                aptList: res.data
            })
        }catch(erro){ console.log(erro)}
    }



    render() {
        const {aptList}=this.state
        // user can only access after logging in
        return !isLogin()?
            <Redirect to={'/login'} />  :(
                <div className = 'aptList'>
                    <ul>
                        {
                            aptList.map(apt=> <li key={apt.id}>
                                <Card info={apt}/>
                                </li>
                            )
                        }
                    </ul>
                </div>
            )
    }
}

export default AllMyList;
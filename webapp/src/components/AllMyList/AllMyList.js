import React from 'react';
import { Redirect } from "react-router-dom";
import {Image, message} from 'antd';
import { isLogin } from "../../App";
import axios from "axios";

class AllMyList extends React.Component {
    state ={
        list:[]
    }

    getData = async()=>{
        try{
            const res =await axios.get('http://localhost:3002/apt/liked')
            this.setState({list:res.data})
            console.log('res',res)
        }   catch {}
    }

    componentDidMount() {
        if(!isLogin()){
            message.info('Please Login!')
            return
        }
        this.getData()
    }

    render() {
        const {list} =this.state
        return !isLogin()?
            <Redirect to={'/login'} />  :(
                <div>
                    {
                        list.map(v=><div key={v._id}>
                            <Image
                                width={200}
                                src={v.aptImage}
                            />
                        </div>)
                    }
                </div>
            )
    }
}

export default AllMyList;
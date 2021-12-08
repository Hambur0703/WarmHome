import React from 'react';
import { Redirect } from "react-router-dom";
import { message,Image } from 'antd';
import { isLogin } from "../../App";
import axios from "axios";
import './Main.scss';

class Main extends React.Component {
    state ={
        input:'',
        list:[],
        allList:[],
        startPrice:'',
        endPrice:''
    }

    getData = async()=>{
        try{
            const res =await axios.get('http://localhost:3002/apt')
            this.setState({list:res.data,allList:res.data})
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

    onSearch=()=>{
        console.log('s',this.state.list)
        const {input} =this.state
        const list = this.state.list.filter(v=>v.aptAddress.includes(input))
        this.setState({
           list
       })
    }

    onClear =()=>{
        this.setState({list:this.state.allList,input:'',startPrice:'',endPrice:''})
    }

    onFilter=()=>{
        const {startPrice,endPrice} =this.state
        const list =[]
        this.state.list.forEach(v=>{
            if(v.aptPrice < Number(endPrice) && v.aptPrice> Number(startPrice)){
                list.push(v)
            }
        })
        this.setState({
            list
        })
    }

    render() {
        const {list} =this.state
        return !isLogin()?
            <Redirect to={'/login'} />  :(
          <div>
              <input value={this.state.input} onChange={e=>this.setState({input:e.target.value})}/>
              <button onClick={this.onSearch}>search</button>

              <input onChange={e=>this.setState({startPrice:e.target.value})} placeholder='price'/>
              <input onChange={e=>this.setState({endPrice:e.target.value})} placeholder='end price'/>
              <button onClick={this.onFilter}>filter</button>

              <button onClick={this.onClear}>clear</button>
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

export default Main;
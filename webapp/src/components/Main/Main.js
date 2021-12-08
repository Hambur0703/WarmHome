import React from 'react';
import { Redirect } from "react-router-dom";
import { message,Button } from 'antd';
import './Main.scss';
import { isLogin } from "../../App";
import axios from 'axios';
import Card from "./Card";


class Main extends React.Component {
    state = {
        input:'',
        aptList:[], //all 6 info 不是小卡片的state
        allList:[],
        startPrice:'',
        endPrice:''
    }

    componentDidMount() {
        if(!isLogin()){
            message.info('Please Login!')
        }
        this.getAptList()
        console.log("getAptList success")
    }

    getAptList = async()=>{
        try{
            const res = await axios.get('http://localhost:3002/apt')
            console.log('res',res)

            this.setState({
                aptList: res.data,//需要判空
                allList: res.data
            })
        }catch(erro){ console.log(erro)}
    }

    onSearch = (value) =>{
        // const {aptList} = this.state  //从自己的组件中获取不要调用this.getAptList
        console.log('s',this.state.aptList)
        const {input} = this.state
        const aptList = this.state.aptList.filter(v=>v.aptName.includes(input))
        this.setState({
            aptList
        })
    }

    onClear = ()=> {
        this.setState({aptList:this.state.allList,input:'',startPrice:'',endPrice:''})
    }

    onFilter = () => {
        const {startPrice,endPrice} = this.state
        const aptList =[]
        this.state.aptList.forEach(v=>{
            if(v.aptPrice < Number(endPrice) && v.aptPrice> Number(startPrice)){
                aptList.push(v)
            }
        })
        this.setState({
            aptList
        })
    }

    // getPics(){
    //     fetch(
    //         //待定
    //     )
    //     .then(res => res.json())
    //     .then(link =>{
    //         console.log(link)
    //         this.setState({apt:link})
    //     })
    //     .catch(e=>console.log('wrong:',e))
    // }

    onUpdate = (id) => {
        // const like = await axios.put('http://localhost:3002/apt/' + id, { aptLike:"like" })
        // this.setState(
        //     {likeApt:like}
        // )
        axios.put('http://localhost:3002/apt/' + id, { aptLike:"like" })
        this.getAptList()
    }


    render() {
        const {aptList}=this.state
        // user can only access after logging in
        return !isLogin()?
            <Redirect to={'/login'} />  :(
                <div className = 'aptList'>
                    <div className="slogan"><span>Warmhome help your find a warm home</span></div>
                    <div className ="search">
                    <input value={this.state.input} onChange={e=>this.setState({input:e.target.value})}/>
                    <Button onClick={this.onSearch}  >search</Button>

                    <input onChange={e=>this.setState({startPrice:e.target.value})} placeholder='Begin price'/>
                    <span className='bar'> - </span>
                    <input onChange={e=>this.setState({endPrice:e.target.value})} placeholder='End price'/>
                    <Button onClick={this.onFilter} >filter</Button>

                    <Button onClick={this.onClear}  >clear</Button>
                    </div>
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

export default Main;
import { Layout } from 'antd';
import React from 'react';
import './App.scss';
import Main from './components/Main/Main'
import Login, {hideLogin, hideLogout, showLogout} from './components/Login/Login'
import AllMyList from './components/AllMyList/AllMyList'
import Register from './components/Register/Register'
import { Route, Switch, Link } from "react-router-dom";
import TableList from './components/Admin/TableList/index'

import { Container } from 'react-bootstrap'



const { Header, Content } = Layout;


export const isLogin =()=>localStorage.getItem('username')

class App extends React.Component {
    logout=()=>{
      localStorage.removeItem('username')
      window.location.replace('/login')
    }

    // When the user is not logged in, the nav bar displays the register and login links.
    // When the user logs in, the register and login become logout.
    componentDidMount() {
        if(isLogin()){
         showLogout()
         hideLogin()
        }else{
         hideLogout()
        }

        

    }


    render() {
    return (
      <Layout>
        <Header className="header-color">
          <div className="header-left">
            <Link to="/">Main</Link>
            <Link to="/allMyList">All My List</Link>
            <Link to="/admin">Admin</Link>
          </div>

         <div onClick={this.logout} id='logout' >logout</div>
          <div id='login'>
            <Link to="/login">Login</Link>
            <Link to="/register">register</Link>
         </div>


        </Header>
        <Layout className="content-layout">
          <Content className="site-layout-background">
            <div>
            <Container>
              <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login" exact component={Login}></Route>
                <Route path="/allMyList" exact component={AllMyList}></Route>
                <Route path="/admin" exact component={TableList}></Route>
                <Route path="/register" exact component={Register}></Route>
              </Switch>
              </Container>
            </div>
          </Content>
        </Layout>
      </Layout>

    )
  }
}

export default App;

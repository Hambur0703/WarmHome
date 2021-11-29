import { Layout, Menu, Breadcrumb } from 'antd';
import React from 'react';
import './App.scss';
import Main from './components/Main/Main'
import Login from './components/Login/Login'
import AllMyList from './components/AllMyList/AllMyList'
import Admin from './components/Admin/Admin'
import Register from './components/Register/Register'
import { Route, Switch, Link } from "react-router-dom";
const { Header, Content, Footer } = Layout;
class App extends React.Component {
  render() {
    return (

      <Layout>
        <Header className="header-color">
          <div className="header-left">
            <Link to="/">Main</Link>
            <Link to="/allMyList">All My List</Link>
            <Link to="/admin">Admin</Link>
          </div>

          <div>
            <Link to="/login">Login</Link>
            <Link to="/register">register</Link>
          </div>

        </Header>
        <Layout className="content-layout">

          <Content className="site-layout-background">
            <div>

              <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login" exact component={Login}></Route>
                <Route path="/allMyList" exact component={AllMyList}></Route>
                <Route path="/admin" exact component={Admin}></Route>
                <Route path="/register" exact component={Register}></Route>
              </Switch>
            </div>
          </Content>
        </Layout>
      </Layout>

    )
  }
}

export default App;

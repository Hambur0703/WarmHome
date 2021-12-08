import React from 'react';
import {Redirect} from "react-router-dom";
import {message} from "antd";

const isAdmin =()=>localStorage.getItem('username')==='admin';

class Admin extends React.Component {

    componentDidMount() {
        if(!isAdmin()){
            message.info('Please login as admin!')
        }
    }

    render() {
        // only admin can visit the Admin page
        return  !isAdmin()?<Redirect to='/'/>: (
            <h1>admin</h1>
        )
    }
}

export default Admin;
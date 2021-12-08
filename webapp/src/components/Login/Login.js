import React from 'react';
import { Form, Input, Button } from 'antd';
import { Link } from "react-router-dom";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from "axios";

export const hideLogin=()=>  document.querySelector('#login').style.display='none'
export const showLogout=()=>  document.querySelector('#logout').style.display='block'
export const hideLogout=()=>  document.querySelector('#logout').style.display='none'


class Login extends React.Component {

    render() {
        return (
            // Login form
            <Form
                name="normal_login"
                onFinish={this.onFinish}
                preserve={false}
            >
                <Form.Item
                    name="userName"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Log in
                    </Button>
                    <br/>or<Link to="/register">register now!</Link>
                </Form.Item>
            </Form>

        )
    }

    onFinish = async(values) => {
        // step 1: collect username/password from the form
        // step 2: send data to the server
        console.log('Received values of form: ', values);
        try
        {
        const res = await axios.post('http://localhost:3002/user/login',
            {userName: values.userName, userPassword: values.password})
            localStorage.setItem('username',values.userName)
            if(values.userName==='admin'){
                this.props.history.push('/admin')
            }else{
                this.props.history.push('/')
            }
            hideLogin()
            showLogout()
        }catch {

        }
    }

}

export default Login;
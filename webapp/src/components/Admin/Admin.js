import React from 'react'
import axios from 'axios';
import { message } from 'antd';
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col, Form } from 'react-bootstrap'
import TableList from './TableList/index';
import FormContainer from '../Admin/FormContainer'
import { isLogin } from "../../App";

import { Link, useParams } from 'react-router-dom'
// import Message from '../Admin/Message'
// import Loader from '../Admin/Loader'
// import { Tablelist} from '../Admin/TableList'


class Admin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            price: '',
            address: ''
        }
        this.getData = this.getData.bind(this);
        this.handler = this.handler.bind(this);
        this.uploadFileHandler = this.uploadFileHandler.bind(this);
    }



    submitHandler() {  }

    getData(e) {
        this.setState({ [e.target.name]: e.target.value }, () => { console.log(this.state) });
    }

    handler() {
        console.log(this.state);
        // post function
        axios.post('http://localhost:3002/apt' + {
            aptName: this.state.name,
            aptPrice: this.state.price,
            aptAddress: this.state.address,
            aptDes: this.state.description
        })

    }
    componentDidMount() {
        if (!isLogin()) {
            message.info('Please Login!')
        }

        this.getAptList()
        console.log('get success')
    }

    getAptList = async () => {
        try {
            const res = await axios.get('http://localhost:3002/apt')
            console.log('res', res)

            this.setState({
                aptList: res.data
            })
        } catch (erro) { console.log(erro) }
    }

    uploadFileHandler (e){
        const file = e.target.files[0]
        console.log("uploadfilehandler...")
        console.log(file)
         const formData = new FormData()
         formData.append('aptName',this.state.name);
         formData.append('aptPrice',this.state.price);
         formData.append('aptAddress',this.state.address);
         formData.append('aptDes',this.state.description);
         formData.append('aptImage',file);
        
        // setUploading(true)
        try {
            
            axios.post('http://localhost:3002/apt',formData).then(res=>console.log('post success'))
            

        } catch (error) {
            // console.error(error)
            // setUploading(false)
        }
    }




    render() {
        return (
            <div>
                {/* <Link to='/allMyList' className='btn btn-light my-3'>
                    Go Back
                </Link> */}
                {/* 

                <input type="text" id="name" name="name" required
                    minlength="4" maxlength="8" size="10"> */}



                <FormContainer>
                    <h1>Edit Apartment</h1>
                    <Form onSubmit={this.submitHandler} >
                        <Form.Group controlId='name' >
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='text'
                                name='name'
                                placeholder='Enter name'
                                // value={name}
                                onChange={this.getData}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='price'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                name='price'
                                type='text'
                                placeholder='Enter price'
                                // value={price}
                                onChange={this.getData}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='description'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                name='description'
                                type='text'
                                placeholder='Enter description'
                                // value={description}
                                onChange={this.getData}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='address'>
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                name='address'
                                type='text'
                                placeholder='Enter address'
                                // value={address}
                                onChange={this.getData}
                            ></Form.Control>
                        </Form.Group>


                        <Form.Group controlId='image'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                name='image'
                                id='image-file'
                                label='Choose File'
                                type="file"
                                //multiple
                                custom
                                onChange={this.uploadFileHandler}
                            ></Form.Control>

                            {/* {uploading && <Loader />} */}
                        </Form.Group>

                        {/* <Button className='my-4'>
                            ADD
                        </Button> */}
                    </Form>
                    {/* )} */}
                </FormContainer>

                {/* {<TableList />} */}
            </div>
        )
    }
}


export default Admin;
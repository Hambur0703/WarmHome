import React from 'react'
import axios from 'axios';
import { message } from 'antd';
// import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { isLogin } from '../../../App'
import Admin from '../Admin.js'

class TableList extends React.Component {
    state = {
        aptList: []
    }

    createApartsHandler() { }


    componentDidMount() {
        if (!isLogin()) {
            message.info('Please Login!')
        }


        this.getAptList()
        this.interval = setInterval(() => this.getAptList(), 1000)
        console.log('get success')
    }
    componentWillUnmount() {
        clearInterval(this.interval);
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

    deleteHandler(e) {
        let trr = e.target.parentElement;
        let kk = trr.parentElement;
        let trID = kk.id;
        console.log(trID);
        axios.delete(`http://localhost:3002/apt/${trID}`)

    }



    render() {
        const { aptList } = this.state


        return (
            <>
                {<Admin />}
                <Row className='align-items-center my-5' >
                    <Col>
                        <h1>Apartments</h1>
                    </Col>
                    <Col className='text-right'>
                        {/* <LinkContainer to={`/admin/apart/edit`}> */}
                        {/* <Button className='my-3' onClick={this.createApartsHandler}>
                            <i className='fas fa-plus'></i> Create Apartment
                        </Button> */}
                        {/* <div class="box">
                            <input type="text"></input>
                            <input type="text"></input>
                            <input type="text"></input>
                            <input type="text"></input>
                            <button>ADD</button>
                        </div> */}
                        {/* </LinkContainer> */}
                    </Col>
                </Row>
                <>
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>DESCRIPTION</th>
                                <th>ADDRESS</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {aptList.map((apart) => (
                                <tr key={apart.id} id={apart.id}>
                                    <td>{apart.id}</td>
                                    <td>{apart.aptName}</td>
                                    <td>${apart.aptPrice}</td>
                                    <td>{apart.aptDes}</td>
                                    <td>{apart.aptAddress}</td>
                                    <td>

                                        <Button

                                            variant='danger'
                                            className='btn-sm'
                                            onClick={this.deleteHandler}
                                        >
                                            delete
                                            <i class="far fa-trash-alt"></i>
                                            {/* <i className='fas fa-trash'></i> */}
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    {/* { <TableList/>} */}
                    {/* <TableList /> */}
                </>
            </>

        )
    }
}

export default TableList;
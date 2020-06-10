import React, { Component } from 'react';
import Header from "../elements/header";
import Sidebar from "../elements/sidebar";
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';

export default class Barang extends Component {
    state = {
        barang: [],
        toDashboard: false,
        isLoading: false
    };

    constructor(props) {
        super(props);
        this.url = 'http://localhost/react/apigudang/index.php/barang';
        this.token = localStorage.getItem('token');
    }

    componentDidMount() {
        axios.get(this.url , { 
            headers: { 'Authorization': 'Bearer '+this.token}
                    })
            .then(response => {
                const barang = response.data.data;
                this.setState({ barang });
            })
            .catch(error => {
                this.setState({ toDashboard: true });
                console.log(error);
            });
    }

    handleClickDelete = event => {
        axios.delete(this.url + '/' + event.target.value ,  { 
            headers: { 'Authorization': 'Bearer '+this.token}
                    })
            .then(response => {
                this.componentDidMount();
                this.setState({ isLoading: true})
            })
            .catch( error => {
                console.log(error.toString());
                this.setState({ toDashboard: true });
            });
    };

    render() {
        if (this.state.toDashboard === true) {
            return <Redirect to='/' />
        }
        return (
            <div>
                <Header/>
                <div id="wrapper">
                    <Sidebar/>
                    <div id="content-wrapper">
                        <div className="container-fluid">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to={'/dashboard'} >Dashboard</Link>
                                </li>
                                <li className="breadcrumb-item active">CRUD App</li>
                                <li className="ml-auto"><Link to={'add'}>Add Employee</Link></li>
                            </ol>
                            <div className="card mb-3">
                                <div className="card-header"><i className="fas fa-table"></i>
                                    &nbsp;&nbsp;barang List
                                </div>
                                <div className="card-body">
                                    <table className="table table-bordered">
                                        <thead>
                                        <tr>
                                            <th>id</th>
                                            <th>Nama Barang</th>
                                            <th>Stok</th>
                                            <th>Harga</th>
                                           
                                            <th className="text-center">Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.barang.map((barang , index)=>
                                                <tr key={barang.id_barang}>
                                                    <td>{index + 1}</td>
                                                    <td>{barang.nama_barang}</td>
                                                    <td>{barang.stok}</td>
                                                    <td>{barang.harga}</td>
                                                    <td className="text-center">
                                                        <Link className="btn btn-sm btn-info" to={{ pathname: 'edit', search: '?id=' + barang.id_barang }}>Edit</Link>
                                                        &nbsp; | &nbsp;
                                                        <button value={barang.id_barang} className="btn btn-sm btn-danger" disabled={ index === 0  ? true : false} onClick={this.handleClickDelete} >Delete</button>
                                                    </td>
                                                </tr>)
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <div className="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
                            </div>
                        </div>
                        <footer className="sticky-footer">
                            <div className="container my-auto">
                                <div className="copyright text-center my-auto">
                                    <span>Copyright © Your Website 2019</span>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        );
    }
}

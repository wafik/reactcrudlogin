import React, {Component} from 'react';
import Header from "../elements/header";
import Sidebar from "../elements/sidebar";
import {Link, Redirect} from "react-router-dom";
import axios from 'axios';

export default class AddBarang extends Component {

    state = {
        redirect: false,
        toDashboard: false,
        isLoading: false
    };
  // constructor(props) {
  //       super(props);
  //       this.url = 'http://localhost/react/apigudang/index.php/barang';
  //       this.token = localStorage.getItem('token');
  //   }
    handleSubmit = event => {
        event.preventDefault();
        this.setState({isLoading: true});
        const token = localStorage.getItem('token');
        const url = 'http://localhost/react/apigudang/index.php/barang';
        const nama_barang = document.getElementById('inputNamaBarang').value;
        const stok = document.getElementById('inputStok').value;
        const harga = document.getElementById('inputHarga').value;

        let bodyFormData = new FormData();
        bodyFormData.set('nama_barang', nama_barang);
        bodyFormData.set('stok', stok);
        bodyFormData.set('harga', harga);
     
        axios.post(url,bodyFormData,
            { 
            headers: { 'Authorization': 'Bearer '+token},
                
                    })
            .then(result => {
                if (result.data.status) {
                    this.setState({redirect: true, isLoading: false})
                }
            })
            .catch(error => {
                this.setState({ toDashboard: true });
                console.log(error);
            });
    };

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/dashboard' />
        }
    };

    render() {
        const isLoading = this.state.isLoading;
        if (this.state.toDashboard === true) {
            return <Redirect to='/' />
        }
        return (
            <div>
                <Header/>
                <div id="wrapper">
                    <Sidebar></Sidebar>
                    <div id="content-wrapper">
                        <div className="container-fluid">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to={'/dashboard'} >Dashboard</Link>
                                </li>
                                <li className="breadcrumb-item active">Add</li>
                            </ol>
                        </div>
                        <div className="container-fluid">
                            <div className="card mx-auto">
                                <div className="card-header">Employee Add</div>
                                <div className="card-body">
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="form-group">
                                            <div className="form-row">
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="text" id="inputNamaBarang" className="form-control" placeholder="Enter name" required="required" autoFocus="autofocus" />
                                                        <label htmlFor="inputNamaBarang">Enter Nama Barang</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="number" id="inputStok" className="form-control" placeholder="Enter Phone" required="required" />
                                                        <label htmlFor="inputStok">Enter Stok</label>
                                                    </div>
                                                </div> 
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="number" id="inputHarga" className="form-control" placeholder="Enter Phone" required="required" />
                                                        <label htmlFor="inputHarga">Enter Harga</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                      
                                        <button className="btn btn-primary btn-block" type="submit" disabled={this.state.isLoading ? true : false}>Tambah Barang &nbsp;&nbsp;&nbsp;
                                            {isLoading ? (
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                             ) : (
                                                 <span></span>
                                             )}
                                        </button>
                                    </form>
                                    {this.renderRedirect()}
                                </div>
                            </div>
                        </div>

                        <footer className="sticky-footer">
                            <div className="container my-auto">
                                <div className="copyright text-center my-auto">
                                    <span>Copyright © Your Website <div>{(new Date().getFullYear())}</div></span>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        );
    }
}

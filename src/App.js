import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from "./pages/login";
import Log from "./pages/log";
import Dashboard from "./pages/dashboard";
import Index from "./pages/index";
import Barang from "./pages/barang";
import AddBarang from "./pages/AddBarang";
import AddPage from "./pages/add";
import EditPage from "./pages/edit";
import Register from "./pages/register";
import NotFound from "./pages/notfound";
import Coba from "./pages/coba";
import CEK from "./pages/regis";
import FileUploadPage from "./pages/fileupload";

class App extends Component {

    render() {
        return (
            <div className="App">
                <Router>
                    <Switch>
                        <Route exact path='/' component={Login} />
                        <Route exact path='/barang' component={Barang} />
                        <Route exact path='/addbarang' component={AddBarang} />
                        <Route path='/log' component={Log} />
                        <Route path='/dashboard' component={Dashboard} />
                        <Route path='/index' component={Index}/>
                        <Route path='/register' component={Register} />
                        <Route path='/reg' component={CEK} />
                        <Route path='/add' component={AddPage} />
                        <Route path='/edit/' component={EditPage} />
                        <Route path='/fileupload/' component={FileUploadPage} />
                        <Route path='*' component={NotFound} />
                        <Route path='/coba' component={Coba} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;

import React, { Component } from 'react';
import Import from '../ImportComponent/import';
import Login from '../LoginComponent/Login';
import AdminComponent from '../AdminComponent/Admin';
import { DateTime } from 'luxon';

class HeaderComponent extends Component {
    constructor() {
        super();
        this.state = {
            currentTime: DateTime.local(),
            openImport: false,
            openLogin: false,
            openAdmin: false,
            loggedIn: false,
        };
    }

    componentDidMount() {
        this.intervalID = setInterval(this.updateTime, 1000); // Mettre à jour toutes les secondes
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    updateTime = () => {
        this.setState({
            currentTime: DateTime.local(),
        });
    };

    handleCloseImport = () => {
        this.setState({ openImport: false });
    };

    handleOpenImport = () => {
        this.setState({ openImport: true });
    };

    handleOpenLogin = () => {
        this.setState({ openLogin: true });
    }

    handleCloseLogin = () => {
        this.setState({ openLogin: false });
    }

    handleOpenAdmin = () => {
        this.setState({ openAdmin: true });
    }

    handleCloseAdmin = () => {
        this.setState({ openAdmin: false });
    }

    setLoggedIn = (value) => {
        this.setState({ loggedIn: value });
    }

    render() {
        const { currentTime, openImport, openLogin, openAdmin, loggedIn } = this.state;
        const currentDate = DateTime.now().setLocale('fr').toFormat('cccc dd MMMM yyyy');
        return (
            <div
                className="fixed min-w-full bg-white py-6 px-12 flex border-b-2 border-slate-900 place-content-between font-bison text-4xl tracking-wide uppercase">
                <div>
                    <h1>Citation et anniversaires</h1>
                </div>

                <Import open={openImport} onClose={this.handleCloseImport}/>
                <button
                    color="primary"
                    onClick={this.handleOpenImport}
                >
                    import
                </button>

                <Login open={openLogin} onClose={this.handleCloseLogin} loggedIn={loggedIn}
                       setLoggedIn={this.setLoggedIn}/>
                <button
                    color="primary"
                    onClick={this.handleOpenLogin}
                >
                    Admin
                </button>
                {loggedIn && (
                    <>
                        <button
                            color="primary"
                            onClick={this.handleOpenAdmin}
                        >
                            AdminPannel
                        </button>
                        <AdminComponent open={openAdmin} onClose={this.handleCloseAdmin} />
                    </>
                )}


                <div>
                    <span>
                        {currentDate} |
                        {currentTime.toLocaleString(DateTime.TIME_24_WITH_SECONDS)}
                    </span>
                </div>
            </div>
        );
    }
}

export default HeaderComponent;

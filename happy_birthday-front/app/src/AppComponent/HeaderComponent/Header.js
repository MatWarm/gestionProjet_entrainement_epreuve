import React, { Component } from 'react';
import Import from '../ImportComponent/import';
import { DateTime } from 'luxon';

class HeaderComponent extends Component {
    constructor() {
        super();
        this.state = {
            currentTime: DateTime.local(),
            openImport: false
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

    render() {
        const { currentTime, openImport } = this.state;
        const currentDate = DateTime.now().setLocale('fr').toFormat('cccc dd MMMM yyyy');

        return (
            <div className="fixed min-w-full bg-white py-6 px-12 flex border-b-2 border-slate-900 place-content-between font-bison text-4xl tracking-wide uppercase">
                <div>
                    <h1>Citation et anniversaires</h1>
                </div>
                <Import open={openImport} onClose={this.handleCloseImport} />
                <button
                    color="primary"
                    style={{ marginTop: '16px' }}
                    onClick={this.handleOpenImport}
                >
                    import
                </button>
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

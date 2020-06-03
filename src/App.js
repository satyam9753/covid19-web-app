// import Cards from './components/Cards/Cards';
// import Charts from './components/Charts/Charts';
// import ChooseCountry from './components/ChooseCountry/ChooseCountry';

import React from 'react';
import { Cards, Charts, ChooseCountry } from './components';
import styles from './App.module.css'
import { fetchData } from './API/index'

class App extends React.Component {
    // constructor is being created in backend
    state = {
        data : {},  
        country: '',
    }
    
    handleCountryChange = async (country) => {
        // fetch the data
        // set the state
        console.log(country);
    }

    async componentDidMount(){
        const fetchedData = await fetchData();
        // console.log(data);
        this.setState({ data: fetchedData }); //making the data available to different components
    }

    render() { 
        return ( 
            <div className={ styles.container }>
                <Cards data={ this.state.data } />
                <ChooseCountry handleCountryChange={this.handleCountryChange}/>
                <Charts />
            </div>
         );
    }
}
 
export default App;
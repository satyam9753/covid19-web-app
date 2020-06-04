// import Cards from './components/Cards/Cards';
// import Charts from './components/Charts/Charts';
// import ChooseCountry from './components/ChooseCountry/ChooseCountry';

import React from 'react';
import { Cards, Charts, ChooseCountry } from './components';
import styles from './App.module.css';
import { fetchData } from './API/index';
import headerImg from './images/COVID19.png';

class App extends React.Component {
    // constructor is being created in backend
    state = {
        data : {},  
        country: '',
    }

    handleCountryChange = async (country) => {
        // fetch the data -->DONE
        // set the state -->DONE
        // console.log(country);
        const fetchedData = await fetchData(country);
        // console.log(fetchedData);
        this.setState( { data: fetchedData, country: country } );
    }

    async componentDidMount(){
        const fetchedData = await fetchData();
        // console.log(data);
        this.setState({ data: fetchedData }); //making the data available to different components
    }

    render() {
        const { data, country } = this.state;
        
        return ( 
            <div className={ styles.container }>
                <img className={styles.image} src={headerImg} alt="COVID19-Destruction"/>
                <Cards data={ this.state.data } />
                <ChooseCountry handleCountryChange={this.handleCountryChange}/>
                <Charts data={data} country={country}/>
                
            </div>
         );
    }
}
 
export default App;
import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';
import styles from './ChooseCountry.module.css'
import { countries } from '../../API';

const ChooseCountry = ( { handleCountryChange } ) => {

    const [ fetchedCountries, setFetchedCountries ] = useState([]);

    useEffect( () => {
        const fetchCountries =async () => {
            setFetchedCountries(await countries());
        }
        fetchCountries();
    }, [ setFetchedCountries ]);

    // console.log(fetchedCountries);

    return ( 
        <FormControl className = {styles.formControl}>
            <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
                <option value= "">Global</option>
                { fetchedCountries.map( 
                    (country, i) => <option key={i} value={country}>{ country }</option>
                    )
                }
            </NativeSelect>
        </FormControl>
     );
}
 
export default ChooseCountry;
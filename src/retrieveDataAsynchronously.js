
import React from 'react';
import jsonp from 'jsonp';

/**
 * Updates the state of the autocomplete data with the remote data obtained via AJAX.
 * 
 * @param {String} searchText content of the input that will filter the autocomplete data.
 * @return {Nothing} The state is updated but no value is returned
 */
export default function  retriveDataAsynchronously(term){
    let _this = this;
    let url = `https://xmlp2p.com/xml/getdestinationsv3.asp?LangID=en&searchtype=fromlocation&term=${term}`
    // Configure a basic AJAX request to your server side API
    // that returns the data according to the sent text
    jsonp(url, null, function(err, data) {
        if (err) {
            console.error("Cannot load data from remote source");
        } else {
            //console.log(data);
            // Update the state with the remote data and that's it !
            return data;
        }
    });    

}
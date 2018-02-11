import React from 'react';
import Autocomplete from 'react-autocomplete';
import jsonp from 'jsonp';
//import retrieveDataAsynchronously from '../retrieveDataAsynchronously'


export default class SearchFrom extends React.Component {

    constructor(props, context) {
        super(props, context);

        // Set initial State
        this.state = {
            // Current value of the select field
            value: "",
            codefrom:"",
            locfrom:"",
            // Data that will be rendered in the autocomplete
            // As it is asynchronous, it is initially empty
            autocompleteData: []
        };

        // Bind `this` context to functions of the class
        this.onChange = this.onChange.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.getItemValue = this.getItemValue.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.retrieveDataAsynchronously = this.retrieveDataAsynchronously.bind(this);
    
    }

    
    /**
     * Callback triggered when the user types in the autocomplete field
     * 
     * @param {Event} e JavaScript Event
     * @return {Event} Event of JavaScript can be used as usual.
     */
    onChange(e){
        this.setState({
            value: e.target.value
        });

        /**
         * Handle the remote request with the current text !
         */
        this.retrieveDataAsynchronously(e.target.value);

        //console.log("The Input Text has changed to ", e.target.value);
    }

    /**
     * Updates the state of the autocomplete data with the remote data obtained via AJAX.
     * 
     * @param {String} searchText content of the input that will filter the autocomplete data.
     * @return {Nothing} The state is updated but no value is returned
     */
    retrieveDataAsynchronously(term){
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
                //return data;
                _this.setState({
                    autocompleteData: data
                });                
            }
        });    

    }

    /**
     * Callback triggered when the autocomplete input changes.
     * 
     * @param {Object} val Value returned by the getItemValue function.
     * @return {Nothing} No value is returned
     */
    onSelect(val){
  
        this.setState({
            value: val
        });
        console.log("Option from 'database' selected : ", val);
    }

    /**
     * Define the markup of every rendered item of the autocomplete.
     * 
     * @param {Object} item Single object from the data that can be shown inside the autocomplete
     * @param {Boolean} isHighlighted declares wheter the item has been highlighted or not.
     * @return {Markup} Component
     */
    renderItem(item, isHighlighted){
        //console.log("label: "+item.label)
        return (
            <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                {item.label}
            </div>   
        ); 
    }

    /**
     * Define which property of the autocomplete source will be show to the user.
     * 
     * @param {Object} item Single object from the data that can be shown inside the autocomplete
     * @return {String} val
     */
    getItemValue(item){
        // You can obviously only return the Label or the component you need to show
        // In this case we are going to show the value and the label that shows in the input
        // something like "1 - Microsoft"
        //return `${item}`;
        return `${item.code} - ${item.label}`;
    }    

    render() {
        return (
            <Autocomplete
            getItemValue={this.getItemValue}
            items={this.state.autocompleteData}
            renderItem={this.renderItem}
            value={this.state.value}
            onChange={this.onChange}
            onSelect={this.onSelect}
        />            
        )
    }    
}
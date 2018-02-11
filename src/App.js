import React from 'react';

// Import the Autocomplete Component
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import SearchFrom from './search/searchfrom'


export default class App extends React.Component {

    constructor(props, context) {
        super(props, context);

        // Set initial State
        this.state = {
        };
    }



    render() {
        return (
            <MuiThemeProvider>     
            <AppBar       
                iconElementLeft = {
                <IconMenu iconButtonElement={
                    <IconButton iconClassName="material-icons" > menu </IconButton>
                }>
                <MenuItem primaryText="Refresh" />
                <MenuItem primaryText="Help" />
                <MenuItem primaryText="Sign out" />
                </IconMenu>
                }/>
            <div>

                <SearchFrom/>                
            </div>
            </MuiThemeProvider>
        );
    }
}

import React, { Component } from 'react';
import {Dropdown} from "semantic-ui-react";

export default class UserPicker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    
    static formatUsers(users){
        return users.map((user, index) => {
            return {
                key: index,
                text: user.name,
                value: JSON.stringify(user)
            }
        })
    }

    render() {
        const {users, onChange} = this.props;
        return (
            <div>
                <Dropdown placeholder='Select User' fluid selection options={UserPicker.formatUsers(users)} onChange={onChange} />
            </div>
        );
    }
}

import React, { Component } from 'react';
import UserPicker from "./modules/UserPicker";

export class Calendar extends Component {
    displayName = Calendar.name;

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            ready: false,
        }
    }

    componentDidMount() {
        this.fetchUsers();
    }

    onChange(e, obj) {
        const selectedUser = JSON.parse(obj.value);
        this.setState({selectedUser});
    }

    fetchUsers() {
        fetch(`/api/users`)
            .then((result) => {
                return result.json();
            })
            .then((users) => {
                this.setState({users, ready: true});
            });
    }

    render() {
        const {ready} = this.state;
        return (
            ready ?
                <div>
                    <label>As</label>
                    <UserPicker onChange={this.onChange.bind(this)} users={this.state.users}/>
                </div>
                : "loading..."
        );
    }
}

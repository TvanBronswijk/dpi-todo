import React, { Component } from 'react';
import UserPicker from "./modules/UserPicker";

export class Notes extends Component {
    displayName = Notes.name;

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            ready: false,
            selectedUser: null,
            notes: []
        }
    }

    componentDidMount() {
        this.fetchUsers();
    }

    onChange(e, obj) {
        const selectedUser = JSON.parse(obj.value);
        this.setState({selectedUser});
        this.fetchNotes();
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

    fetchNotes() {
        if (this.state.selectedUser == null) {
            return;
        }
        fetch(`/api/messages/${this.state.selectedUser.name}/notes`)
            .then((result) => {
                return result.json();
            })
            .then((notes) => {
                this.setState({notes, ready: true});
            });
    }

    render() {
        const {ready, notes} = this.state;
        return (
            ready ?
                <div>
                    <label>As</label>
                    <UserPicker onChange={this.onChange.bind(this)} users={this.state.users}/>
                    {
                        notes ? notes.map(note => <div>{note.content}</div>) : false
                    }
                </div>
                : "loading..."
        );
    }
}

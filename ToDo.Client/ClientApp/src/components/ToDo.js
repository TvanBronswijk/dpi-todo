import React, { Component } from 'react';
import UserPicker from "./modules/UserPicker";

export class ToDo extends Component {
    displayName = ToDo.name;

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            ready: false,
            selectedUser: null
        }
    }

    componentDidMount() {
        this.fetchUsers();
    }

    onChange(e, obj) {
        const selectedUser = JSON.parse(obj.value);
        this.setState({selectedUser});
        this.fetchTodo();
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
    
    fetchTodo() {
        if (this.state.selectedUser == null) {
            return;
        }
        fetch(`/api/messages/${this.state.selectedUser.name}/todos`)
            .then((result) => {
                return result.json();
            })
            .then((todos) => {
                this.setState({todos, ready: true});
            });
    }

    render() {
        const {ready, todos} = this.state;
        return (
            ready ?
                <div>
                    <label>As</label>
                    <UserPicker onChange={this.onChange.bind(this)} users={this.state.users}/>
                    {
                        todos ? todos.map(todo => <div>{todo.Content}</div>) : false
                    }
                </div>
                : "loading..."
        );
    }
}

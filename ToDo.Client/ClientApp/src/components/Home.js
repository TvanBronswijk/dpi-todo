import React, { Component } from 'react';
import UserPicker from './modules/UserPicker';
import {Button, Form} from "semantic-ui-react";

export class Home extends Component {
  displayName = Home.name;
    
  constructor(props) {
      super(props);
      this.state = {
          users: [],
          ready: false,
          selectedUser: null,
          selectedType: null,
          forUser: null,
          message: null
      }
  }
  
  componentDidMount() {
      this.fetchUsers();
  }

    onChange(e, obj) {
      const selectedUser = JSON.parse(obj.value);
      this.setState({selectedUser});
    }
    
    selectFor(e, obj) {
        const forUser = JSON.parse(obj.value);
        this.setState({forUser});
    }
    
    selectType(e) {
        const selectedType = e.target.value;
        this.setState({selectedType, forUser: null, message: null});
    }
    
    setMessage(e) {
        const message = e.target.value;
        this.setState({message});
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
    
    async send() {
      const {selectedType, selectedUser, message, forUser} = this.state;
      let payload = {created: new Date(), owner: selectedUser, content: message};
      
      let url = `/api/messages`;
      if (selectedType === 'todo'){
          payload.assignee = forUser;
          url += `/todos`;
      }
      if (selectedType === 'calendar'){
          //not implemented
          url += `/calendars`;
      }
      if (selectedType === 'note'){
          url += `/notes`;
      }
      const body = JSON.stringify(payload);
      console.log(body);
        await fetch(url, {
            body, // must match 'Content-Type' header
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
      //window.location.reload();
    }

  render() {
      const {ready, selectedUser, selectedType} = this.state;
    return ready ? 
        <div>
            <label>As</label>
            <UserPicker onChange={this.onChange.bind(this)} users={this.state.users}/>
            {selectedUser ?
                <div>
                    <Form>
                        <Form.Field label='Type' control='select' onChange={this.selectType.bind(this)}>
                            <option value='todo'>Todo</option>
                            <option value='calendar'>Calendar</option>
                            <option value='note'>Note</option>
                        </Form.Field>
                        <Form.Field>
                        {
                            selectedType === "todo" ? <div>
                                <label>For</label>
                                <UserPicker onChange={this.selectFor.bind(this)} users={this.state.users}/>
                                <label>Message</label>
                                <input placeholder='Todo' onChange={this.setMessage.bind(this)} />
                            </div> : false 
                        }
                        {
                            selectedType === "calendar" ? <div>
                                CALENDAR [NOT IMPLEMENTED]
                            </div> : false
                        }
                        {
                            selectedType === "note" ? <div>
                                <label>Message</label>
                                <input placeholder='Note' onChange={this.setMessage.bind(this)}/>
                            </div> : false
                        }
                        </Form.Field>
                        <Button type='submit' onClick={this.send.bind(this)}>Send</Button>
                    </Form>
                </div>
            : false}
        </div>
            : 'Loading...';
  }
}

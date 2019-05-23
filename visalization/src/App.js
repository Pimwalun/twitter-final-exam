import React, { Component } from 'react'
import socketIOClient from 'socket.io-client'
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Line,
  LineChart,
} from 'recharts'
import firebase from './firebase'

class App extends Component {
  constructor() {
    super()
    this.state = {
      message: [],
      endpoint: "104.154.204.30" // เชื่อมต่อไปยัง url ของ realtime server
    }
  }

  componentDidMount = () => {
    const { endpoint, message } = this.state
    const socket = socketIOClient(endpoint)
    socket.on('new-message', (messageNew) => {
      const date = new Date(messageNew.createdAt)
      const time = `${date.getHours()}:${date.getMinutes()}`
      this.setState({ message: [...this.state.message, { count: messageNew.count, createdAt: time }] })
    })

    firebase.database().ref('/').on('value', (snapshot) => {
      this.setState({
        tweets2: Object.values(snapshot.val() || {}).map(tweet => {
          const date = new Date(tweet.createdAt)
          return {
            count: tweet.count,
            createdAt: `${date.getHours()}:${date.getMinutes()}`
          }
        })
      })
    })
  }

  render() {
    return (
      <div>
        <div>
          <LineChart width={1000} height={500} data={this.state.message}>
            <XAxis dataKey="createdAt" />
            <YAxis />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="count" stroke="#8884d8" />
          </LineChart>
          <LineChart width={1000} height={500} data={this.state.tweets2}>
            <XAxis dataKey="createdAt" />
            <YAxis />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="count" stroke="#8884d8" />
          </LineChart>
        </div>
      </div >
    )
  }
}

export default App
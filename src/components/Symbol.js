import React, { Component } from 'react'
import loading from './Bean Eater.gif'

export default class Symbol extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={loading} alt="loading" style={{width: '100px', height: '100px'}} />
      </div>
    )
  }
}

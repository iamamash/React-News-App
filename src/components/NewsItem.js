import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    let { title, description, imgUrl, newsUrl, author, date, source } = this.props
    return (
      <div className='my-3 mx-4'>
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'flex-end', position: 'absolute', right: '23px' }}>
            <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: '90%'}}>
              {source}
            </span>
          </div>
          <img src={imgUrl} className="card-img-top" alt="/" style={{ height: '166px', width: '307px' }} />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} rel="noreferrer noopener" target='_blank' className="btn btn-sm btn-dark">Read more</a>
          </div>
        </div>
      </div >
    )
  }
}
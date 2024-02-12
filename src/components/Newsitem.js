import React from 'react'

const Newsitem=(props)=> {
    let { title, description, imgurl, newsurl, date, author, sourcename } = props;
    return (
      <div className='container'>
        <div className="card" style={{ backgroundColor: 'tan' }}>
          <span class="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger">
            {sourcename}
            <span class="visually-hidden">unread messages</span>
          </span>
          <img src={imgurl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p class="card-text"><small class="text-muted">By {!author ? "unknown " : author}{new Date(date).toGMTString()}</small></p>
            <a rel="noreferrer" href={newsurl} target="_blank" className="btn btn-dark btn-sm">Read More</a>
          </div>
        </div>
      </div>
    )
}
export default Newsitem


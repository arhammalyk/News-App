import React from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState, useEffect } from 'react';

const News=(props)=>{

  const[articles,setarticles]=useState([])
  const[loading,setloading]=useState(false)
  const[page,setpage]=useState(1)
  const[totalresults,settotalresults]=useState(0)
  
  const updatepage=async()=> {
    props.setprogress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pagesize}`;
    setloading(true)
    props.setprogress(30)
    let data = await fetch(url)
    props.setprogress(60)
    let parseddata = await data.json()
    setarticles(parseddata.articles)
    setloading(false)
    settotalresults(parseddata.totalResults)
    props.setprogress(100)
  }

  // changeonnext = async () => {
  //   this.updatepage()
  //   this.setState({
  //     page: this.state.page+1
  //   })
  // }
  // changeonprev = async () => {
  //   this.updatepage();
  //   this.setState({
  //     page: this.state.page-1
  //   })
  // }
  useEffect(()=>{
     updatepage();
     document.title = `MALYK NEWS - ${props.category.toUpperCase()}`
  },[])

  const fetchMoreData = async () => {
    setpage(page+1)
    setloading(true)
    document.title = `MALYK NEWS - ${props.category.toUpperCase()}`
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pagesize}`;
    let data = await fetch(url)
    let parseddata = await data.json()
    setarticles(articles.concat(parseddata.articles))
    setloading(false)
    settotalresults(parseddata.totalResults)
  }
    // let { category } = props
    document.body.style.backgroundColor = '#c9c9c9ad'
    return (
      <>
        <div className='container my-2'>
          <h2 style={{
            margin: '30px', 
            background: `linear-gradient(to right, black 0%, tan 65%, tan 50%, tan 100%)`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "black",
            marginTop:'75px'
          }} className='text-center'>Top {props.category.charAt(0).toUpperCase() + props.category.substring(1)} Headlines</h2>
          {loading && <Spinner />}

          <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles !== totalresults}
            loader={loading && <Spinner />}
          >
            <div className="container">
            <div className='row'>
              {articles.map((element) => {
                return <div className='col-md-4 my-3' key={Math.floor(Math.random()*1000)+1}>
                  <Newsitem
                    title={element.title}
                    description={element.description}
                    imgurl={element.urlToImage ? element.urlToImage : 'https://artsmidnorthcoast.com/wp-content/uploads/2014/05/no-image-available-icon-6.png'}
                    newsurl={element.url}
                    date={element.publishedAt}
                    author={element.author}
                    sourcename={element.source.name} />
                </div>

              })}
            </div>
            </div>
          </InfiniteScroll>
        </div>
        {/* <div className="container d-flex justify-content-around">
          <button disabled={this.state.page <= 1} onClick={this.changeonprev} type="button" className="btn btn-dark">&larr;Previous</button>
          <button disabled={this.state.page === Math.ceil(this.state.totalresults / props.pagesize)} onClick={this.changeonnext} type="button" className="btn btn-dark">Next&rarr;</button>
        </div> */}
      </>
    )
}
News.propTypes = {
  pagesize: PropTypes.number,
  country: PropTypes.string,
  category: PropTypes.string
}
News.defaultProps = {
  pagesize: 10,
  country: 'it',
  category: 'general'
}
export default News

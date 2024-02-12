import React from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
import { useState } from 'react'

const App = () => {
  const pagesize=20;
  const apikey=process.env.REACT_APP_NEWS_API
  const[progress,setprogress]=useState(0)

    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            color='#f11946'
            progress={progress}
            height={3}
          />
          <Routes>
            <Route exact path='/' element={<News apikey={apikey} setprogress={setprogress} key='general' pagesize={pagesize} country='us' category='general' />} />
            <Route exact path='/general' element={<News apikey={ apikey} setprogress={setprogress} key='general' pagesize={ pagesize} country='us' category='general' />} />
            <Route exact path='/business' element={<News apikey={ apikey} setprogress={setprogress} key='business' pagesize={ pagesize} country='us' category='business' />} />
            <Route exact path='/entertainment' element={<News apikey={ apikey} setprogress={setprogress} key='entertainment' pagesize={ pagesize} country='us' category='entertainment' />} />
            <Route exact path='/health' element={<News apikey={ apikey} setprogress={setprogress} key='health' pagesize={ pagesize} country='us' category='health' />} />
            <Route exact path='/sports' element={<News apikey={ apikey} setprogress={setprogress} key='sports' pagesize={ pagesize} country='us' category='sports' />} />
            <Route exact path='/technology' element={<News apikey={ apikey} setprogress={setprogress} key='technology' pagesize={ pagesize} country='us' category='technology' />} />
          </Routes>
        </Router>
      </div>
    )
  
}
export default App
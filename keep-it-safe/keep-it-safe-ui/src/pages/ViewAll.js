import React from 'react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

function ViewAll() {
  return (
    <div>
        <Navigation />
        <div className="main-content">
          <div className="display-block">
            <div className="display-block-inner">
              <h1>View All</h1>
              </div>
          </div>
        </div>
        <Footer />
    </div>
  )
}

export default ViewAll

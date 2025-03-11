import React from 'react'
const about = () => {
  return (
    <div>

       <section id="about" className="about">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 d-flex flex-column justify-content-center" style={{ marginTop: "190px" }}>
              <div className="content">
                <h1>About Our Platform</h1>
                <h2 className="mb-3">Connecting Book Lovers, One Page at a Time</h2>
                <p className="mb-5">
                  Our platform isn't just about buying and selling books; it's about sharing knowledge, experiences, and building a community of readers who appreciate the power of literature.
                  
                  Here, you can create your own digital library, annotate books with personal notes, and even discover insights left by previous readers. Imagine picking up a book and finding hidden gems of wisdom inside!
                  <br />
                  We also promote book donations, making sure every book finds a new home where it’s needed the most. Whether you want to sell, share, or donate, this is the perfect place to keep books circulating and their stories alive.
                </p>
              </div>
            </div>
            <div className="col-lg-6 d-flex align-items-center">
              <img src={`${process.env.PUBLIC_URL}/images/idea.png`} className="img-fluid" alt="Book Sharing"style={{  width:'1000px',height:'400px' ,marginLeft: "70px" ,marginTop:"90px"}} />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default about

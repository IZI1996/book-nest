import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Ensure JS components work

function Home() {
  return (
    <div>
      <section id="hero" className="hero"  style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/herobg.png)`, backgroundSize: "cover", backgroundPosition: "center", height: "99vh", display: "flex", alignItems: "center", justifyContent: "space-around" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 d-flex flex-column justify-content-center text-lg-start " style={{ marginTop: "50px" }}>
              <h1>Share or Sell Your Old Books</h1>
              <h2>Your Old Library, A New Opportunity for Others</h2>
              <p className="mb-5">
                Do you have old books you no longer need? Join us and share your books with others or sell them easily.
                Keep knowledge alive and contribute to reusing books instead of leaving them forgotten.
                <br />
                Don't miss the chance, start now and help spread knowledge!
              </p>
              <div className="text-lg-start">
  <a 
    href="/add" 
    className="btn-get-started"
  >
    <i className="fas fa-book"></i>
    <span> Get Started</span>
  </a>
</div>

            </div>
            <div className="col-lg-6 hero-img">
              <img src="/images/BAg.png" className="img-fluid" alt="Old Books" style={{height: "470PX", width:'540PX', marginTop: "190px" }} />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home;
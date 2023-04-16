import React from "react";

import mainImage from "./assets/img/quote-bg.jpg";

function Register() {
  return (
    <React.Fragment>
      <main id="main">
        <section id="get-a-quote" class="get-a-quote">
          <div class="container" data-aos="fade-up">
            <div class="row g-0">
              <div class="col-lg-5 quote-bg" style={{ backgroundImage: mainImage }}>
                <img src={mainImage} />
              </div>

              <div class="col-lg-7">
                <form action="forms/quote.php" method="post" class="php-email-form">
                  <h3>Register Today</h3>
                  <p>
                    Discover a diverse range of entertainment channels at TV2NITE. Register now to
                    access our selection and start enjoying your favorite shows and events!
                  </p>
                  <div class="row gy-4">
                    <div class="col-md-6">
                      <input
                        type="text"
                        name="departure"
                        class="form-control"
                        placeholder="First Name"
                        required
                      />
                    </div>

                    <div class="col-md-6">
                      <input
                        type="text"
                        name="delivery"
                        class="form-control"
                        placeholder="Last Name"
                        required
                      />
                    </div>

                    <div class="col-md-12">
                      <input
                        type="email"
                        name="weight"
                        class="form-control"
                        placeholder="Email"
                        required
                      />
                    </div>

                    <div class="col-md-12">
                      <input
                        type="password"
                        name="dimensions"
                        class="form-control"
                        placeholder="Password"
                        required
                      />
                    </div>

                    <div class="col-md-12">
                      <input
                        type="text"
                        class="form-control"
                        name="phone"
                        placeholder="Phone"
                        required
                      />
                    </div>

                    <div class="col-md-12">
                      <textarea
                        class="form-control"
                        name="message"
                        rows="6"
                        placeholder="Message"
                        required
                      ></textarea>
                    </div>

                    <div class="col-md-12 text-center">
                      <div class="loading">Loading</div>
                      <div class="error-message"></div>
                      <div class="sent-message">
                        Your quote request has been sent successfully. Thank you!
                      </div>

                      <button type="submit">Register Today</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </React.Fragment>
  );
}

export default Register;

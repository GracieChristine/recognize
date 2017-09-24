import React, {Component} from 'react';
import {Navbar} from 'react-bootstrap';

import Statement from './../components/Statement';
import Feature from './../components/Feature';
import PageBreaker from './../components/PageBreaker';

import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        {/* NAVBAR */}
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#"><h1>Recognize Inc.</h1></a>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Text pullRight>
          <h3>A simple speech translational plateform</h3>
        </Navbar.Text>
      </Navbar>
      {/* CONTENT */}
      <div className="wrapper">

        <Statement />
        <Feature />
        <PageBreaker />


      </div>
      {/* FOOTER */}
      {/* <div className="footer">
        <p>
          &copy; 2017
          <script type="text/javascript">
            new Date().getFullYear()>2017&&document.write("-"+new Date().getFullYear());
          </script>
          , Recognize Inc.
        </p>
      </div> */}
    </div>

    );
  }
}

export default App;

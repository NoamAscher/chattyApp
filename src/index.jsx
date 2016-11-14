// Application entrypoint.

// Load up the application styles
require("../styles/application.scss");

// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

ReactDOM.render(<App />, document.getElementById('react-root'));

// ReactDOM.render(<App />, $("#react-root"));    // <-- do we need this?

/* the HTML:

<div class="wrapper">
  <nav>
    <h1>Chatty</h1>
  </nav>
  <div id="message-list">
    <div class="message">
      <span class="username">Anonymous1</span>
      <span class="content">I won't be impressed with technology until I can download food.</span>
    </div>
    <div class="message system">
      Anonymous1 changed their name to nomnom.
    </div>
  </div>
  <footer>
    <input id="username" type="text" placeholder="Your Name (Optional)" />
    <input id="new-message" type="text" placeholder="Type a message and hit ENTER" />
  </footer>
</div>

*/
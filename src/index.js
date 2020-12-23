import React from 'react';
import ReactDOM from 'react-dom' ;
import './index.css' ;
import {Provider} from './context/context'

// speechly
import {SpeechProvider} from '@speechly/react-client'


import App from './App'

ReactDOM.render(
  <SpeechProvider appId={`${process.env.REACT_APP_SPEECHLY}`} language="en-US">
     <Provider>
       <App/>
   </Provider>
  </SpeechProvider>,
 document.getElementById("root")
)
import './polyfills'
import {render} from 'react-dom'

import App from './App'

const rootElement = document.createElement('div')
document.body.appendChild(rootElement)

render(<App />, rootElement)

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./App', () => render(<App />, rootElement))
}

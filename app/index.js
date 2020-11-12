import React from 'react'
import ReactDOM from 'react-dom'
import './index.sass'
import Nav from './components/Nav'
import Loading from './components/Loading'
import {Switch, BrowserRouter as Router, Route} from 'react-router-dom'
import {ThemeProvider} from './context/theme'

const Top = React.lazy( () => import('./components/Top') )
const New = React.lazy( () => import('./components/New') )
const User = React.lazy( () => import('./components/User') )
const CommentList = React.lazy( () => import('./components/CommentList') )

class App extends React.Component {
  state = {
    theme: 'light',
    toggleTheme: () => {
      this.setState( ({theme}) => ({
        theme: theme === 'light' ? 'dark' : 'light'
      }))
    }
  }
  render() {
    return (
      <ThemeProvider value={this.state}>
        <Router>
          <div className={this.state.theme}>
            <div className='container'>
              <Nav />
              <React.Suspense fallback={<Loading />}>
              <Switch>
                <Route exact path='/' component={Top}/>
                <Route path='/new' component={New}/>
                <Route path='/user' component={User}/>
                <Route path='/comments' component={CommentList}/>
                <Route render={() => <h1>404</h1>}/>
              </Switch>
            </React.Suspense>
            </div>
          </div>
        </Router>
      </ThemeProvider>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)

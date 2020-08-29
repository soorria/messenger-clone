import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core'
import { Global, css } from '@emotion/core'

import Home from './pages/home'
import Login from './pages/login'
import SignUp from './pages/signup'
import NotFound from './pages/notFound'
import customTheme from './theme'
import DarkModeToggle from './components/darkModeToggle'
import AuthProvider from './context/authContext'
import Chat from './pages/chat'

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <ColorModeProvider>
        <CSSReset />
        <Global
          styles={css`
            body,
            html,
            #root {
              height: 100%;
            }
          `}
        />
        <AuthProvider>
          <Router>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/signup' component={SignUp} />
              <Route exact path='/login' component={Login} />
              <Route path={['/chat/:username', '/chat']} component={Chat} />
              <Route path='*' component={NotFound} />
            </Switch>
          </Router>
        </AuthProvider>
        <DarkModeToggle />
      </ColorModeProvider>
    </ThemeProvider>
  )
}

export default App

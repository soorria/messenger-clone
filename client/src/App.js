import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core'
import { Global, css } from '@emotion/core'

import customTheme from './theme'

import Chat from './pages/chat'
import Home from './pages/home'
import Login from './pages/login'
import NotFound from './pages/notFound'
import SignUp from './pages/signup'

import AuthProvider from './context/authContext'
import ChatContextProvider from './context/chatContext'

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
              <Route path={['/chat/:chatId', '/chat']}>
                <ChatContextProvider>
                  <Chat />
                </ChatContextProvider>
              </Route>
              <Route path='*' component={NotFound} />
            </Switch>
          </Router>
        </AuthProvider>
      </ColorModeProvider>
    </ThemeProvider>
  )
}

export default App

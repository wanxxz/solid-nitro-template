import { MetaProvider } from '@solidjs/meta'
import { Router, type RouteSectionProps } from '@solidjs/router'
import { FileRoutes } from '@solidjs/start/router'
import { Suspense, type Component } from 'solid-js'
import './app.module.css'
import { I18nProvider, ThemeProvider } from './context'

const root: Component<RouteSectionProps> = props => {
  return (
    <MetaProvider>
      <Suspense>
        <I18nProvider code="zh-CN">
          <ThemeProvider color="light" scale="medium">
            {props.children}
          </ThemeProvider>
        </I18nProvider>
      </Suspense>
    </MetaProvider>
  )
}

const App: Component = () => {
  return (
    <Router root={root}>
      <FileRoutes />
    </Router>
  )
}

export default App

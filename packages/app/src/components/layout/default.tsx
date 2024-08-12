import { clientOnly } from '@solidjs/start'
import { type ParentComponent, useContext } from 'solid-js'
import { ThemeContext } from '../../context'

clientOnly(() => import('@spectrum-web-components/theme/sp-theme.js' as never))
clientOnly(() => import('@spectrum-web-components/theme/src/themes.js' as never))

const Default: ParentComponent = props => {
  const [theme] = useContext(ThemeContext)
  return (
    <sp-theme color={theme.color as never} scale={theme.scale as never}>
      {props.children}
    </sp-theme>
  )
}

export { Default }

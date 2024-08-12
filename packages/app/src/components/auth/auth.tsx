import { type Component } from 'solid-js'
import { useI18nContext } from '../../context'
import classNames from './auth.module.css'
import { Password } from './password'

const Auth: Component = () => {
  const [_, { t }] = useI18nContext()

  return (
    <div class={classNames.root}>
      <Password />
    </div>
  )
}

export { Auth }

import { type Component } from 'solid-js'
import { useI18nContext } from '../../context'
import classNames from './password.module.css'
import { clientOnly } from '@solidjs/start'

clientOnly(() => import('@spectrum-web-components/field-label/sp-field-label.js') as never)
clientOnly(() => import('@spectrum-web-components/textfield/sp-textfield.js') as never)
clientOnly(() => import('@spectrum-web-components/button/sp-button.js') as never)

const Password: Component = () => {
  const [_, { t }] = useI18nContext()

  return (
    <div class={classNames.root}>
      <sp-field-label for="name">{t('Name')}</sp-field-label>
      <sp-textfield id="name" type="text"></sp-textfield>
      <sp-field-label for="password">{t('Password')}</sp-field-label>
      <sp-textfield id="password" type="password"></sp-textfield>
      <br />
      <sp-button class={classNames.submit} size="m">
        {t('Sign in')}
      </sp-button>
    </div>
  )
}

export { Password }

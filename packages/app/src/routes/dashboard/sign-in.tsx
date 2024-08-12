import { Title } from '@solidjs/meta'
import { type Component } from 'solid-js'
import { Auth } from '../../components/auth'
import { useI18nContext } from '../../context'
import classNames from './sign-in.module.css'
import { DefaultLayout } from '../../components/layout'

const SignIn: Component = () => {
  const [_, { t }] = useI18nContext()

  return (
    <DefaultLayout>
      <Title>{t('Sign in')}</Title>
      <main class={classNames.main}>
        <div class={classNames.left}></div>
        <div class={classNames.right}>
          <Auth />
        </div>
      </main>
    </DefaultLayout>
  )
}

export default SignIn

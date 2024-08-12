import { flatten, translator, type Flatten, type Translator } from '@solid-primitives/i18n'
import {
  createContext,
  createResource,
  createSignal,
  useContext,
  type Accessor,
  type ParentProps,
  type Setter
} from 'solid-js'
import { type LocaleCode, type LocaleDict } from '../locales'

async function fetchLocaleDict(locale: LocaleCode): Promise<Flatten<LocaleDict>> {
  const dict: LocaleDict = (await import(`../locales/${locale.toLowerCase()}.ts`)).default
  return flatten(dict)
}

const I18nContext = createContext<[Accessor<LocaleCode>, { t: Translator<LocaleDict>; change: Setter<LocaleCode> }]>([
  undefined as never,
  {} as never
])

function useI18nContext() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18nContext: cannot find a I18nContext')
  }
  return context
}

function I18nProvider(props: ParentProps<{ code: LocaleCode }>) {
  const [code, setCode] = createSignal(props.code)
  const [dict] = createResource(code, fetchLocaleDict)
  const t = translator(dict)

  return <I18nContext.Provider value={[code, { t, change: setCode }]}>{props.children}</I18nContext.Provider>
}

export { I18nContext, I18nProvider, useI18nContext }

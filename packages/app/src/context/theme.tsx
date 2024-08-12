import { createContext, useContext, type ParentProps, type Setter } from 'solid-js'
import { createStore, type Store } from 'solid-js/store'

type ThemeProps = { color: string; scale: string }

const ThemeContext = createContext<[Store<ThemeProps>, { change: Setter<ThemeProps> }]>([
  undefined as never,
  {} as never
])

function useThemeContext() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useThemeContext: cannot find a ThemeContext')
  }
  return context
}

function ThemeProvider(props: ParentProps<ThemeProps>) {
  const [themeProps, setThemeProps] = createStore({ color: props.color, scale: props.scale })

  return <ThemeContext.Provider value={[themeProps, { change: setThemeProps }]}>{props.children}</ThemeContext.Provider>
}

export { ThemeContext, ThemeProvider, useThemeContext }

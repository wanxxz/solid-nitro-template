/// <reference path="solid-js" />
/// <reference types="../../../node_modules/@spectrum-web-components/bundle/elements.d.ts" />

declare module '*.css' {
  const styles: { [k: string]: string }
  export default styles
}

declare module '*.svg' {
  const content: any
  export default content
}

declare global {
  declare module 'solid-js' {
    namespace JSX {
      type ElementProps<T> = {
        [K in keyof T]: Props<T[K]> & HTMLAttributes<T[k]>
      }

      type Props<T> = {
        [K in keyof Omit<T, 'children'>]?: T[K]
      }

      interface IntrinsicElements extends ElementProps<HTMLElementTagNameMap> {}
    }
  }
}

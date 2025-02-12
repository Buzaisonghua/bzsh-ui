declare module 'vue' {
  export interface GlobalComponents {
    BzIcon: typeof import('bzsh-ui')['BzIcon']
  }
}

export {}

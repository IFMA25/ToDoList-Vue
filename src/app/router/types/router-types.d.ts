import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    role?: 'admin' | 'user' | string
    permission?: string
    showHeader?: boolean
    titleHeader?: string
    parent?: {
      textKey: string
      to: string
    }
    menu?: {
      icon: string;
      textKey: string;
      order?: number;
    }
  }
}

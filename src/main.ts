import { createApp } from 'vue'
import App from './App.vue'
// 导入路由
import router from './router'
// 导入element plus
import ElementPlus from 'element-plus'
// 导入element plus icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
// 导入element plus国际化
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// 导入pinia
import { createPinia } from 'pinia'

async function bootstrap() {
  try {
    const { worker } = await import('./mocks/browser')
    await worker.start({
      serviceWorker: {
        url: import.meta.env.BASE_URL + 'mockServiceWorker.js'
      },
      onUnhandledRequest: 'bypass'
    } as any)
  } catch (err) {
    console.warn('MSW 启动失败，但应用继续运行:', err)
  }
  const app = createApp(App)
  const pinia = createPinia()
  app.use(router)
  app.use(ElementPlus)
  app.use(pinia)
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  app.use(ElementPlus, {
    locale: zhCn,
  })
  app.mount('#app')
}

bootstrap()
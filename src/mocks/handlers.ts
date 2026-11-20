import { http, HttpResponse, passthrough } from 'msw'

interface MockUser {
  id: string
  account: string
  password: string
  name: string
  sex: string
  role: string
  department: string
  email: string
  avatar: string
  token: string
}

const STORAGE_KEY = 'mock_users_v1'

// 初始数据：只在 localStorage 里没有数据时使用
const defaultUsers: MockUser[] = [
  {
    id: '1',
    account: 'admin',
    password: '123456',
    name: '张三',
    sex: '男',
    role: '管理员',
    department: '技术部',
    email: 'zhangsan@xx.com',
    avatar: 'data:image/jpeg;base64,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',
    token: 'token-1-abc123'
  },
  {
    id: '2',
    account: '111111',
    password: 'admin2',
    name: '李四',
    sex: '男',
    role: '普通用户',
    department: '市场部',
    email: 'lisi@xx.com',
    avatar: '',
    token: 'token-2-def456'
  }
]

// ★ 启动时优先读 localStorage，没有才用初始数据
let users: MockUser[] =
  JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') ?? defaultUsers

// ★ 任何写操作后调用，把内存数据落盘
function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
}

export const handlers = [
  http.get('/admin_panel/', () => passthrough()),

  // 登录 / 用 token 查用户
  http.get('/users', ({ request }) => {
    const url = new URL(request.url)
    const account = url.searchParams.get('account')
    const password = url.searchParams.get('password')
    const token = url.searchParams.get('token')

    const result = users.filter(u => {
      if (account && String(u.account) !== account) return false
      if (password && u.password !== password) return false
      if (token && u.token !== token) return false
      return true
    })

    return HttpResponse.json(result)
  }),

  // 注册
  http.post('/users', async ({ request }) => {
    const body = (await request.json()) as Partial<MockUser>

    const newUser: MockUser = {
      id: String(users.length + 1),
      account: String(body.account ?? ''),
      password: String(body.password ?? ''),
      name: body.name ?? '',
      sex: body.sex ?? '',
      role: body.role ?? '普通用户',
      department: body.department ?? '',
      email: body.email ?? '',
      avatar: body.avatar ?? '',
      token: 'token-' + (users.length + 1) + '-' + Date.now()
    }

    users.push(newUser)
    save()                              // ★ 新增这行

    return HttpResponse.json(newUser, { status: 201 })
  }),

  // 更新（改资料 / 改密码 / 改头像）
  http.patch('/users/:id', async ({ params, request }) => {
    const { id } = params
    const body = (await request.json()) as Partial<MockUser>

    const idx = users.findIndex(u => u.id === id)
    if (idx === -1) {
      return new HttpResponse(null, { status: 404 })
    }

    users[idx] = { ...users[idx], ...body }as MockUser
    save()                              // ★ 新增这行

    return HttpResponse.json(users[idx])
  })
]
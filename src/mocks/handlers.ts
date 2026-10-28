import { http, HttpResponse,passthrough } from 'msw'

let users = [
  {
    id: '1',
    account: 'admin',
    password: '123456',
    name: '张三',
    sex: '男',
    role: '管理员',
    department: '技术部',
    email: 'zhangsan@xx.com',
    avatar: '这是头像',
    token: 'token-1-abc123'//模拟后端产生的token
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
    avatar: '头像',
    token: 'token-2-def456'
  }
]


export const handlers = [

  http. get ( '/admin_panel/' , () => { return passthrough ()
  }),

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


  http.post('/users', async ({ request }) => {
    const body = (await request.json()) as Record<string, any>

    const newUser = {
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

    return HttpResponse.json(newUser, { status: 201 })
  }),


  http.patch('/users/:id', async ({ params, request }) => {
    const { id } = params
    const body = (await request.json()) as Record<string, any>

    const idx = users.findIndex(u => u.id === id)
    if (idx === -1) {
      return new HttpResponse(null, { status: 404 })
    }

    users[idx] = { ...users[idx], ...body } as typeof users[number]
    return HttpResponse.json(users[idx])
  })
]

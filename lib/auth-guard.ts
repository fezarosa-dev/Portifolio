export function shouldRedirectToLogin(pathname: string, hasUser: boolean): boolean {
  const isAdminRoute = pathname.startsWith('/admin')
  const isLoginRoute = pathname === '/admin/login'
  return isAdminRoute && !isLoginRoute && !hasUser
}

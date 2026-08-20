'use client'

import { useEffect, useState } from 'react'

export function CollapsibleOnScroll({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    function onScroll() {
      setCollapsed(window.scrollY > 24)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`grid transition-[grid-template-rows] duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${className}`}
      style={{ gridTemplateRows: collapsed ? '0fr' : '1fr' }}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  )
}

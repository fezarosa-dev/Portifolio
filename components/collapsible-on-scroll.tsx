'use client'

import { useEffect, useRef, useState } from 'react'

const COLLAPSE_AT = 64
const EXPAND_AT = 16

export function CollapsibleOnScroll({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  const [collapsed, setCollapsed] = useState(false)
  const collapsedRef = useRef(false)

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY
      if (!collapsedRef.current && y > COLLAPSE_AT) {
        collapsedRef.current = true
        setCollapsed(true)
      } else if (collapsedRef.current && y < EXPAND_AT) {
        collapsedRef.current = false
        setCollapsed(false)
      }
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

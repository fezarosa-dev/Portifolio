'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import type { Project } from '@/lib/supabase/queries'

export function ProjectsTeaser({ projects }: { projects: Project[] }) {
  return (
    <section className="px-6 py-24">
      <h2 className="mb-10 text-center text-3xl font-semibold">Projetos</h2>
      <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
        {projects.slice(0, 4).map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href={project.click_mode === 'link' ? project.click_url ?? '#' : `/projetos/${project.id}`}
              className="block rounded-lg border p-6 hover:border-foreground"
            >
              <h3 className="text-lg font-medium">{project.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{project.summary}</p>
            </Link>
          </motion.div>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link href="/projetos" className="underline">Ver todos os projetos</Link>
      </div>
    </section>
  )
}

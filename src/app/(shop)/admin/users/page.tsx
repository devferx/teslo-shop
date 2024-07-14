// https://tailwindcomponents.com/component/hoverable-table
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { Title } from '@/components'
import { getPaginatedUsers } from '@/actions'
import { UsersTable } from './ui/UsersTable'

export const revalidate = 0

export default async function UsersPage() {
  const { ok, users = [] } = await getPaginatedUsers()

  if (!ok) {
    redirect('/auth/login')
  }

  return (
    <>
      <Title title="Gestión de usuarios" />

      <div className="mb-10">
        <UsersTable users={users} />
      </div>
    </>
  )
}

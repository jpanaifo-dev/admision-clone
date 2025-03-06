import { NextResponse } from 'next/server'
import { deleteSession } from '@/lib/session'

export async function DELETE() {
  await deleteSession()
  return NextResponse.json({ success: true, redirect: '/login' })
}

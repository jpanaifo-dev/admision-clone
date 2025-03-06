import { NextResponse } from 'next/server'
import { getUserAuth } from '@/lib/session'

export async function GET() {
  try {
    const sessionData = await getUserAuth()
    return NextResponse.json(sessionData)
  } catch {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }
}

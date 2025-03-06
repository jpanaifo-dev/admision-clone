'use client'

import { useState } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { AlertCircle, Lock } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export const FrmSessionExpiry = () => {
  const [password, setPassword] = useState('')
  const [extendSession, setExtendSession] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically validate the password and handle the session extension
    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.')
    } else {
      setError('')
      // Handle authentication and session extension here
    }
  }

  return (
    <div className="min-h-screen bg-[#EEF5FF] flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <Lock className="w-6 h-6" />
            Sesión expirada
          </CardTitle>
          <CardDescription>
            Tu sesión ha expirado. Por favor, ingresa tu contraseña para
            continuar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="extend"
                  checked={extendSession}
                  onCheckedChange={(checked) =>
                    setExtendSession(checked as boolean)
                  }
                />
                <Label htmlFor="extend">Extender sesión por 30 minutos</Label>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={handleSubmit}
          >
            Continuar sesión
          </Button>
        </CardFooter>
        {error && (
          <div className="px-6 pb-4">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        )}
      </Card>
    </div>
  )
}

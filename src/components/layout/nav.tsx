import { Github } from 'lucide-react'
import { Button } from '../ui/button'
import Link from 'next/link'
import Image from 'next/image'

export default function Nav() {
  return (
    <div className="sticky top-0 flex items-center justify-center gap-4 border-b bg-white/90 p-2 backdrop-blur-lg">
      <Button variant={'secondary'}>
        <Link href="https://www.appmasters.io/pt" target="_blank">
          <Image
            src={'/app-masters-logo.png'}
            width={24}
            height={24}
            alt="Logo da App Masters"
          />
        </Link>
      </Button>
      <Button variant={'secondary'}>
        <Link
          href={'https://github.com/Santannafe12/desafio-appmasters-2024'}
          target="_blank"
        >
          <Github className="h-6 w-6" />
        </Link>
      </Button>
    </div>
  )
}

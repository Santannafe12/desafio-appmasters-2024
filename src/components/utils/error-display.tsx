import Link from 'next/link'
import { Label } from '../_ui/label'

export default function ErrorDisplay() {
  return (
    <div className="mx-auto my-6 flex w-11/12 flex-col items-center space-y-2 sm:w-7/12">
      <Label className="cursor-text rounded-md bg-red-300/50 px-4 py-2 text-base font-semibold text-red-500 lg:text-xl">
        Ocorreu um erro inesperado. Tente novamente mais tarde!
      </Label>
      <Label className="block cursor-text text-muted-foreground">
        Se o erro persistir, entre em contato com o{' '}
        <Link
          href={'https://github.com/Santannafe12'}
          target="_blank"
          className="cursor-pointer text-blue-500 hover:underline"
        >
          desenvolvedor.
        </Link>
      </Label>
    </div>
  )
}

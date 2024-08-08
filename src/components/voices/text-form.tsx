'use client'

import { Textarea } from '../ui/textarea'

export default function TextForm({
  setText,
}: {
  setText: (text: string) => void
}) {
  return (
    <form className="space-y-8">
      <div>
        <label className="text-base lg:text-xl">
          Texto que será convertido em áudio:
        </label>
        <div>
          <Textarea
            placeholder="She got eyes of the bluest skies..."
            autoComplete="off"
            rows={2}
            className="resize-none"
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div>
          Após digitar o texto, clique em &quot;Gerar&quot; para ouvir a voz
          gerada.
        </div>
      </div>
    </form>
  )
}

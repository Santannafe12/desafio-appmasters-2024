'use client'

import { Textarea } from '../_ui/textarea'

export default function Form({ setText }: { setText: (text: string) => void }) {
  return (
    <form className="space-y-8">
      <div className="space-y-2">
        <label className="text-base lg:text-xl">
          Texto que será convertido em áudio:
        </label>
        <div>
          <Textarea
            placeholder="She got eyes of the bluest skies..."
            autoComplete="off"
            rows={2}
            maxLength={200}
            className="resize-none"
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="text-muted-foreground">
          Após digitar o texto, um botão &quot;Gerar&quot; irá aparecer. Clique
          nele para escutar o áudio. Máximo de 200 caracteres.
        </div>
      </div>
    </form>
  )
}

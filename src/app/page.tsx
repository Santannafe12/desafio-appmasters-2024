import Header from '@/components/layout/header'
import TextForm from '@/components/voices/text-form'
import VoicesList from '@/components/voices/voices-list'

export default function Home() {
  return (
    <div className="mx-auto my-6 w-11/12 space-y-8 sm:w-7/12">
      {/* Implementar Suspense */}
      <Header />
      <TextForm />
      <VoicesList />
    </div>
  )
}

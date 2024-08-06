// import Header from '@/components/layout/header'
import TextForm from '@/components/voices/text-form'
import VoicesList from '@/components/voices/voices-list'

export default function Home() {
  return (
    <div className="my-12 space-y-8">
      {/* <Header /> */}
      <div className="mx-auto w-7/12 space-y-8">
        <TextForm />
        <VoicesList />
      </div>
    </div>
  )
}

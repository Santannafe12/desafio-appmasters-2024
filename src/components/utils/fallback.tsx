import Loader from './loader'

export default function Fallback() {
  return (
    <div className="flex items-center justify-center">
      <Loader />
    </div>
  )
}

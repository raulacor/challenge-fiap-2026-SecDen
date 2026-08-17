import Feed from '../components/Feed'
import RightPanel from '../components/RightPanel'

export default function HubHome({ bruteforceComplete }) {
  return (
    <>
      <div className="hub-center page-enter">
        <Feed bruteforceComplete={bruteforceComplete} />
      </div>
      <RightPanel />
    </>
  )
}

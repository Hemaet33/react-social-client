import Posts from '../../components/posts/Posts'
import Stories from '../../components/stories/Stories'
import Share from '../../components/share/Share'
import './home.scss'

function Home() {
  return (
    <div className='home'>
      <div className="container">
      <Stories />
      <Share />
      <Posts />
      </div>
    </div>
  )
}

export default Home

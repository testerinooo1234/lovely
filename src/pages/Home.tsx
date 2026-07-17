import { Link } from 'react-router-dom'
import { HeartLogo } from '../components/HeartLogo'
import { StoryCard } from '../components/StoryCard'
import { getFeaturedStories, getTopTags, stories } from '../data/stories'

export function Home() {
  const featured = getFeaturedStories()
  const tags = getTopTags(10)

  return (
    <div className="page home">
      <section className="hero">
        <div className="hero__glow" aria-hidden="true" />
        <div className="hero__content">
          <div className="hero__brand">
            <HeartLogo size={36} className="hero__heart" />
            <h1 className="hero__title">lovely</h1>
          </div>
          <p className="hero__tagline">
            dark little stories for people who like the lights low.
          </p>
          <div className="hero__actions">
            <Link to="/browse" className="btn btn--primary">
              read something wicked
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2 className="section__title">
            featured <span className="text-accent">stories</span>
          </h2>
          <p className="section__lede">hand-picked heat from across the shelves.</p>
        </div>
        <div className="story-grid">
          {featured.map((story, i) => (
            <StoryCard key={story.id} story={story} index={i} />
          ))}
        </div>
      </section>

      <section className="section section--tags">
        <div className="section__header">
          <h2 className="section__title">browse by mood</h2>
          <p className="section__lede">find the edge you came looking for.</p>
        </div>
        <div className="tag-cloud">
          {tags.map((tag) => (
            <Link
              key={tag}
              to={`/browse?tag=${encodeURIComponent(tag)}`}
              className="tag-chip tag-chip--large"
            >
              {tag}
            </Link>
          ))}
        </div>
      </section>

      <section className="section section--cta">
        <div className="cta-panel">
          <HeartLogo size={28} className="brand__heart" />
          <h2>
            {stories.length} stories. no accounts. just{' '}
            <span className="text-accent">want</span>.
          </h2>
          <p>search by title, author, or tag — everything lives right here.</p>
          <Link to="/browse" className="btn btn--primary">
            open the archive
          </Link>
        </div>
      </section>
    </div>
  )
}

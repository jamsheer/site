import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import authorData from './generated-authors.json'
import defaultThumbnail from '../../assets/images/platform_4.gif'
import styles from './BlogPreview.css'

const propTypes = {
  page: PropTypes.object
}

const BlogPreview = ({ page }) => {
  let author = 'Serverless'
  const defaultAvatar = 'https://avatars3.githubusercontent.com/u/13742415?v=3&s=60'
  let avatarURL = defaultAvatar
  let thumbnail = defaultThumbnail
  // console.log(authorData)
  if (page.authors) {
    // console.log('page.authors', page.authors)
    const authorInfo = page.authors.map((a) => {
      return authorData[a]
    })
    const authorNames = authorInfo.map((auth) => {
      return auth.name
    })
    // console.log('authorInfo', authorInfo)
    if (authorNames.length < 2) {
      // single author
      author = authorNames[0]
      // console.log('authorInfo[0].avatar', authorInfo[0].avatar)
      avatarURL = (authorInfo[0].avatar) ? authorInfo[0].avatar : defaultAvatar
    }
  }
  if (page.draft) {
    return null
  }
  if (page.thumbnail) {
    thumbnail = page.thumbnail
  }

  return (
    <div className={styles.post}>
      <div className={styles.thumbnail}>
        <Link to={page.__url}>
          <img role='presentation' width={130} height={130} src={thumbnail} />
        </Link>
      </div>
      <div className={styles.content}>
        <Link className={styles.title} to={page.__url}>
          <h3>{page.title}</h3>
        </Link>
        <div className={styles.description}>
          {page.description}
        </div>
        <div className={styles.postMeta}>
          <span>written by</span>
          <img role='presentation' width={22} height={22} className={styles.avatarImg} src={avatarURL} />
          <span>{author}</span>
        </div>
      </div>
    </div>
  )
}

BlogPreview.propTypes = propTypes
export default BlogPreview

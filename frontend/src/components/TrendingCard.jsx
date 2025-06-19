import React from 'react'
import '../../src/custom.css'

const TrendingCard = ({ id, image, title, tag, description, price }) => {
  return (
    <div>
      <div class="card">
        <div class="badge">Trending</div>
        <div class="tilt">
          <div class="img"><img src={image} />

          </div>
        </div>
        <div class="info">
          <div class="cat">{tag}</div>
          <h2 class="title">{title[0].toUpperCase() + title.slice(1)}</h2>
          <p className="desc overflow-hidden whitespace-nowrap text-ellipsis">{description}</p>

          <div class="bottom">
            <div class="price">
              {/* <span class="old">$2,499</span> */}
              <span class="new">₹ {price}</span>
            </div>
            <button class="btn">
              <span>Add to Cart</span>
              <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

  )
}

export default TrendingCard
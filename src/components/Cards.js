import React from 'react'
import { connect } from 'react-redux'

import styles from '../css/Cards'

const Cards = ({ cards }) => (
  <div className={styles.cardList}>
    {cards.map(card => <Card {...card} key={card.id} />)}
  </div>
)

const Card = ({
  name, maxLevel, rarity, iconUrls
}) => (
  <div
    className={styles.card}
    style={{ backgroundImage: `url(${iconUrls.medium})` }}
  >
    <span className={styles.title}>{name}</span>

    <div className={styles.gradient} />
    <span className={styles.by}>
      Rarity: {rarity}, MaxLevel: {maxLevel}
    </span>
  </div>
)

const mapState = ({ cards }) => {
  const cardList = cards || []
  return { cards: cardList }
}
export default connect(mapState)(Cards)

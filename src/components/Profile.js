import React from 'react'
import { connect } from 'react-redux'
import getProfile from '../selectors/profile'

const Profile = ({
  name, tag, trophies, clanName
}) => (
  <div>
    <p>Player Name: {name}</p>
    <p>Tag: {tag}</p>
    <p>Trophies: {trophies}</p>
    <p>Clan Name: {clanName}</p>
  </div>
)

const mapState = state => getProfile(state)

export default connect(mapState)(Profile)

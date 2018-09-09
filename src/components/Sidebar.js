import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'redux-first-router-link'
import { goToPage } from '../actions'
import styles from '../css/Sidebar'

const Sidebar = ({ onClick, path }) => (
  <div className={styles.sidebar}>
    <h2>SEO-FRIENDLY LINKS</h2>

    <NavLink activeClassName={styles.active} exact to='/'>
      HOME
    </NavLink>

    <NavLink activeClassName={styles.active} to='/cards'>
      CARDS
    </NavLink>

    <NavLink activeClassName={styles.active} to='/list/db-graphql'>
      DB & GRAPHQL
    </NavLink>

    <NavLink activeClassName={styles.active} to={['list', 'react-redux']}>
      REACT & REDUX
    </NavLink>

    <NavLink
      activeClassName={styles.active}
      to={{ type: 'LIST', payload: { category: 'fp' } }}
    >
      FP
    </NavLink>

    <NavLink
      activeClassName={styles.active}
      to={{ type: 'PROFILE', payload: { playerName: 'kashyap' } }}
    >
      Kashyap Profile
    </NavLink>

    <div style={{ height: 20 }} />
    <h2>EVENT HANDLERS</h2>

    <span
      role='link'
      tabIndex='0'
      className={active(path, '/')}
      onClick={() => onClick('HOME')}
      onKeyPress={() => onClick('HOME')}
    >
      HOME
    </span>

    <span
      role='link'
      tabIndex='0'
      className={active(path, '/cards')}
      onClick={() => onClick('CARDS')}
      onKeyPress={() => onClick('CARDS')}
    >
      CARDS
    </span>

    <span
      role='link'
      tabIndex='0'
      className={active(path, '/list/db-graphql')}
      onClick={() => onClick('LIST', 'db-graphql')}
      onKeyPress={() => onClick('LIST', 'db-graphql')}
    >
      DB & GRAPHQL
    </span>

    <span
      role='link'
      tabIndex='0'
      className={active(path, '/list/react-redux')}
      onClick={() => onClick('LIST', 'react-redux')}
      onKeyPress={() => onClick('LIST', 'react-redux')}
    >
      REACT & REDUX
    </span>

    <span
      role='link'
      tabIndex='0'
      className={active(path, '/list/fp')}
      onClick={() => onClick('LIST', 'fp')}
      onKeyPress={() => onClick('LIST', 'fp')}
    >
      FP
    </span>

    <span
      role='link'
      tabIndex='0'
      className={active(path, '/profile/kashyap')}
      onClick={() => onClick('PROFILE', 'kashyap')}
      onKeyPress={() => onClick('PROFILE', 'kashyap')}
    >
      Kashyap Profile
    </span>

    <div style={{ height: 14 }} />

    <NavLink to={{ type: 'ADMIN' }} activeClassName={styles.active}>
      ADMIN
    </NavLink>
  </div>
)

const active = (currentPath, path) =>
  currentPath === path ? styles.active : ''

const mapDispatch = { onClick: goToPage }
const mapState = ({ location }) => ({ path: location.pathname })

export default connect(mapState, mapDispatch)(Sidebar)

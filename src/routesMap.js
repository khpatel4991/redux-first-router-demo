import { redirect, NOT_FOUND } from 'redux-first-router'
import { fetchData } from './utils'

export default {
  HOME: '/',
  LIST: {
    path: '/list/:category',
    thunk: async (dispatch, getState) => {
      const {
        jwToken,
        location: { payload: { category } },
        videosByCategory
      } = getState()
      if (videosByCategory[category]) return
      const { videos } = await fetchData(`/api/videos/${category}`, jwToken)

      if (videos.length === 0) {
        return dispatch({ type: NOT_FOUND })
      }

      dispatch({ type: 'VIDEOS_FETCHED', payload: { videos, category } })
    }
  },
  VIDEO: {
    path: '/video/:slug',
    thunk: async (dispatch, getState) => {
      const {
        jwToken,
        location: { payload: { slug } },
        videosHash
      } = getState()
      if (videosHash[slug]) return
      const { video } = await fetchData(`/api/video/${slug}`, jwToken)
      if (video === null) {
        return dispatch({ type: NOT_FOUND })
      }

      dispatch({ type: 'VIDEO_FOUND', payload: { slug, video } })
    }
  },
  PLAY: {
    path: '/video/:slug/play',
    thunk: (dispatch, getState) => {
      if (typeof window === 'undefined') {
        const { slug } = getState().location.payload
        const action = redirect({ type: 'VIDEO', payload: { slug } })

        dispatch(action)
      }
    }
  },
  LOGIN: '/login',
  ADMIN: {
    path: '/admin', // TRY: visit this path or dispatch ADMIN
    role: 'admin' // + change jwToken to 'real' in server/index.js
  }
}

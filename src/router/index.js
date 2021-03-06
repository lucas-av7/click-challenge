import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AlbumView from '../views/AlbumView'
import PhotoView from '../views/PhotoView'
import PhotosRelatedView from '../views/PhotosRelatedView'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/album/:id',
    name: 'AlbumView',
    component: AlbumView,
    props: true
  },
  {
    path: '/photo/:albumId/:photoId',
    name: 'PhotoView',
    component: PhotoView,
    props: true
  },
  {
    path: '/search/:keyword',
    name: 'SearchView',
    component: PhotosRelatedView,
    props: true
  },
  {
    path: '/favorites',
    name: 'FavoritesView',
    component: PhotosRelatedView,
    props: true
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router

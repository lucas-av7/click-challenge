<template>
  <div class="searchView">

    <template v-if="keyword">
      <h1>Tag search</h1>
      <h3 v-if="keyword">#{{ keyword }}</h3>
    </template>

    <template v-else>
      <h1>Favorite photos</h1>
      <i class="fas fa-heart favoriteIcon"></i>
    </template>


    <div class="photos">
      <Photo v-for="photo in photos" :key="photo.id" :photo="photo" />
    </div>

    <div v-if="photos.length == 0" class="noResults">
      <i class="far fa-times-circle errorIcon"></i>
      <p></p>
      <p>No results found</p>
    </div>

  </div>
</template>

<script>
import Photo from '../components/Photo'

export default {
  name: 'SearchView',
  components: { Photo },
  props: ['keyword'],
  data() {
    return {
      photos: []
    }
  },
  created() {
    if(this.keyword) {
      this.$store.getters.getAlbums.map(album => {
        album.photos.map(photo => {
          if(photo.keywords.includes(this.keyword)) {
            this.photos.push(photo)
          }
        })
      })
    } else {
      this.$store.getters.getAlbums.map(album => {
        album.photos.map(photo => {
          if(photo.favorited == true) {
            this.photos.push(photo)
          }
        })
      })
    }
  }
}
</script>

<style>
  .searchView {
    width: 100%;
    min-height: calc(100vh - 55px);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 10px 0;
  }

  .searchView h1 {
    text-align: center;
    margin-bottom: 10px;
  }

  .searchView h3 {
    color: var(--link-keywords);
  }

  .noResults {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 80px;
  }

  .noResults .errorIcon {
    font-size: 3.5rem;
  }

  .noResults p {
    margin-top: 10px;
  }

  .searchView .photos {
    width: 100%;
    max-width: 1200px;
    display: flex;
    flex-wrap: wrap;
    margin: 20px 0 55px;
    justify-content: center;
  }

  .searchView .favoriteIcon {
    font-size: 2.5rem;
  }
</style>
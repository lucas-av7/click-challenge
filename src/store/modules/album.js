export default {
  state: {
    edit: {
      status: false,
      selectedPhotos: [],
      selectedAlbums: []
    } 
  },
  actions: {
    createAlbum({ commit, rootState }, payload) {
      payload.albumId = rootState.albumId++
      commit('createAlbum', payload)
    },
    deleteAlbum({ commit, getters  }, payload ) {
      const albumIndex = getters.getAlbumIndex(payload)
      commit('deleteAlbum', albumIndex)
    },
    renameAlbum({ commit, getters  }, payload ) {
      const albumIndex = getters.getAlbumIndex(payload.albumId)
      const editInfo = {
        albumIndex,
        newTitle: payload.newTitle,
        newDescription: payload.newDescription
      }
      commit('renameAlbum', editInfo)
    },
    editStatusToggle({ state }, status) {
      state.edit.selectedPhotos = []
      state.edit.selectedAlbums = []
      state.edit.status = status
    },
    selectPhotoToggle({ state }, payload) {
      const index = state.edit.selectedPhotos.indexOf(payload)
      if(index == -1) {
        state.edit.selectedPhotos.push(payload)
      } else {
        state.edit.selectedPhotos.splice(index, 1)
      }
    },
    deleteSelectedPhotos({ dispatch, state }, albumId) {
      state.edit.selectedPhotos.forEach(photoId => {
        dispatch('deletePhoto', { albumId, photoId })
      })
      state.edit.status = false
      state.edit.selectedPhotos = []
    },
    moveSelectedPhotos({ dispatch, state }, payload) {
      state.edit.selectedPhotos.forEach(photoId => {
        dispatch('movePhoto', { 
          albumId: payload.albumId, 
          destinationAlbumId: payload.destinationAlbumId,
          photoId 
        })
      })
      state.edit.status = false
      state.edit.selectedPhotos = []
    },
    selectAlbumToggle({ state }, albumId) {
      const index = state.edit.selectedAlbums.indexOf(albumId)
      if(index == -1) {
        state.edit.selectedAlbums.push(albumId)
      } else {
        state.edit.selectedAlbums.splice(index, 1)
      }
    },
    deleteSelectedAlbums({ dispatch, state }) {
      state.edit.selectedAlbums.forEach(albumId => {
        dispatch('deleteAlbum', albumId)
      })
      state.edit.status = false
      state.edit.selectedAlbums = []
    }
  },
  getters: {
    getAlbums(state, getters, rootState) {
      return rootState.albums
    },
    getAlbumIndex: (state, getters, rootState) => id => {
      return rootState.albums.indexOf(
        rootState.albums.filter(album => {
        return album.albumId == id
      })[0])
    },
    getEditInfo(state) {
      return state.edit
    }
  }
}
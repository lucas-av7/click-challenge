<template>
  <Modal @clicked="$emit('close')">
    <h1>Upload photo</h1>
    <Forms>
      <div class="imagePreview" @click="$refs.uploadPhotoButton.click()">
        <i v-if="imgPreview.length == 0" class="far fa-file-image"></i>
        <img v-else :src="imgPreview" alt="Image preview">
      </div>
      <input type="file" name="photo"
        ref="uploadPhotoButton" accept="image/*"
        @change="onFileSelected">

      <label for="title">Title</label>
      <input type="text" name="title"
        placeholder="Photo title"
        v-model="photoTitle"
        maxlength="25">

      <label for="description">Description</label>
      <input type="text" name="description"
        placeholder="Photo description (optional)"
        v-model="photoDescription"
        maxlength="50">

      <label for="keywords">Keywords</label>
      <div class="keywordsContainer">
        <div class="keywordsForm">
          <input type="text" name="keywords"
            placeholder="At least 3 characters. Max: 5 keywords."
            v-model="photoKeywordsText"
            maxlength="15" @keypress.enter="addKeyword()">
          <SendButton type="plus" @clicked="addKeyword()" />
        </div>
        <div class="keywordsList">
          <p v-for="(keyword, index) in photoKeywords"
            :key="index">
            {{ keyword }}
            <i class="fas fa-times-circle remove"
              @click="photoKeywords.splice(index, 1)"></i>
          </p>
        </div>
      </div>
    </Forms>

    <div v-show="error" class="errosInput">
      <p>{{ error }}</p>
    </div>

    <template slot="buttonsArea">
      <ActionButton
        @clicked="$emit('close')"
        text="Cancel"
        type="secondary" />
      <ActionButton
        @clicked="upload()"
        text="Upload"
        type="primary" />
    </template>
  </Modal>
</template>

<script>
import ActionButton from './UI/ActionButton'
import Modal from './UI/Modal'
import Forms from './UI/Forms'
import SendButton from './UI/SendButton'
import regexMixin from '../mixin/regexMixin'

export default {
  name: 'NewPhoto',
  mixins: [regexMixin],
  props: ['albumId'],
  components: { ActionButton, Modal, Forms, SendButton },
  data() {
    return {
      selectedFile: null,
      photoTitle: '',
      photoDescription: '',
      photoKeywordsText: '',
      photoKeywords: [],
      error: '',
      imgPreview: ''
    }
  },
  watch: {
    photoTitle() {
      this.photoTitle = this.removeDoubleSpaces(this.photoTitle)
    },
    photoDescription() {
      this.photoDescription = this.removeDoubleSpaces(this.photoDescription)
    },
    photoKeywordsText() {
      this.photoKeywordsText = this.removeSpecialCharactersKeywords(this.photoKeywordsText).toLowerCase()
    }
  },
  methods: {
    addKeyword() {
      if(this.photoKeywords.includes(this.photoKeywordsText)) return
      if(this.photoKeywordsText.length > 2
        && this.photoKeywords.length < 5) {
        this.photoKeywords.push(this.photoKeywordsText)
        this.photoKeywordsText = ''
      }
    },
    upload() {
      const allowCreate = this.checkErros()
      if(allowCreate) {
        const newPhoto = {
          title: this.photoTitle.trim(),
          description: this.photoDescription.trim(),
          keywords: this.photoKeywords,
          albumId: parseInt(this.albumId),
          comments: [],
          favorited: false,
          imageToUpload: this.selectedFile
        }
        this.$store.dispatch('newPhoto', newPhoto)
        this.$emit('close')
      }
    },
    checkErros() {
      if(this.selectedFile == null) {
        this.error = 'Error: No photo selected'
        return false
      } else if(this.photoTitle == '') {
        this.error = 'Error: Title is blank'
        return false
      } else {
        this.error = ''
        return true
      }
    },
    onFileSelected(event) {
      const isImage = event.target.files[0].type.indexOf('image')
      if(isImage != -1) {
        const file = event.target.files[0]
        this.selectedFile = file
        this.imgPreview = URL.createObjectURL(file)
      }
    }
  }
}
</script>

<style>
  .imagePreview {
    align-self: center;
    width: 120px;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 6.0rem;
    border: 2px solid var(--border-color);
    border-radius: 10%;
    color: var(--primary-color);
    cursor: pointer;
    overflow: hidden;
  }

  .imagePreview img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  input[name=photo] {
    display: none;
  }

  .keywordsContainer {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .keywordsForm {
    display: flex;
    width: 100%;
  }

  .keywordsList {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
    align-items: center;
  }

  .keywordsList p {
    padding: 8px 20px;
    margin: 5px;
    border: 1px solid var(--link-keywords);
    border-radius: 5px;
    color: var(--link-keywords);
    background-color: var(--border-color) ;
    position: relative;
  }

  .keywordsList .remove {
    position: absolute;
    top: -1px;
    right: -1px;
    font-size: 1rem;
    padding: 2px;
    cursor: pointer;
  }
</style>
<template>
  <div class="globalError">
    <i class="fas fa-exclamation-circle errorIcon"></i>
    <h3>{{ error }}</h3>
    <i class="fas fa-exclamation-circle errorIcon"></i>
  </div>
</template>

<script>
export default {
  name: 'GlobalError',
  props: ['error'],
  created() {
    setTimeout(() => {
      this.$store.dispatch('addTextError', '')
    }, 4000);
  }
}
</script>

<style>
  .globalError {
    width: 80%;
    max-width: 350px;
    border-radius: 10px;
    position: fixed;
    bottom: 100px;
    left: 50%;
    transform: translate(-50%);
    padding: 20px;
    background-color: var(--danger);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .globalError .errorIcon {
    font-size: 1.5rem;
  }
</style>
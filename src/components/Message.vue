<script>
export default {
  props: {
    active: Boolean,
  },
}
</script>

<template>
  <article
    class="message"
    :class="{ 'message--hidden': !active }"
  >
    <div class="message-header">
      <p>Error</p>
      <button class="delete"></button>
    </div>

    <div class="message-body">
      <slot>Massage</slot>
    </div>
  </article>
</template>
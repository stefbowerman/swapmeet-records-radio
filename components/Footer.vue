<template>
  <footer>
    Swapmeet Records <br />&copy; <span class="tt-none">Est.</span> 1999
  </footer>
</template>

<style lang="scss">
footer {
  position: fixed;
  bottom: 20px;
  left: 22px;
  font-size: $font-size-small;
  text-align: left;

  @include bp-up($screen-sm-min) {
    left: 50px;
    bottom: 40px;
    font-size: $font-size-base;

    br {
      display: none;
    }
  }  
}
</style>

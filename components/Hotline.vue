<template>
  <div class="hotline">
    Hotline open now!<br />
    <div class="buttons">
      <a href="tel:+14085991076‬" class="btn btn-blue">
        Leave a message
      </a>
      <br />
      <a href="sms:+14085991076‬" class="btn btn-red">
        Text In
      </a>
    </div>
  </div>
</template>

<style lang="scss">
.hotline {
  position: fixed;
  top: 20px;
  left: 22px;
  font-size: $font-size-small;
  text-align: left;

  @include bp-up($screen-sm-min) {
    left: 50px;
    top: 40px;
    font-size: $font-size-base;
  }

  a {
    color: $color-text;
    text-decoration: none;
    // border-bottom: 1px solid $color-text;
  }
}

.pointer {
  font-size: 40px;
}

.buttons {
  margin-top: 5px;
  margin-left: -4px;

  .btn {
    color: $color-bg;
    font-size: small;
    font-weight: bold;
    padding: 4px 20px;
    border-radius: 50px;
    display: inline-block;
    // line-height: 1.7;
    margin: 5px 0;
    margin-right: 5px;
  }

  .btn-blue {
    background-color: #1096c1;
  }  

  .btn-red {
    background-color: #dd5963;
  }

  br {
    display: block;

    @include bp-up($screen-sm-min) {
      display: none;
    }
  }
}
</style>

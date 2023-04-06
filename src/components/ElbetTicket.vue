<script>
export default {
  props: {
    betDetails: {
      type: object,
    },
  },
}
</script>

<template>
  <div class="elbet-ticket__container">
    <div class="elbet-ticket__wrapper">
      <p class="elbet-ticket__title">
        Lucky Balls
      </p>
      <div class=" elbet-ticket__subtitle elbet-ticket__1">
        <span> Shop: </span>
        <span> 2633 - </span>
        <span> easylife </span>
      </div>
      <div class="elbet-ticket__subtitle elbet-ticket__2">
        <span> Date and Time: </span>
        <span> 31-03-2023</span>
        <span> 15:40:14 </span>
      </div>
      <div class="elbet-ticket__subtitle elbet-ticket__3">
        <span> Ticket Number: </span>
        <span> 789802127812 - </span>
        <span> 1201 </span>
      </div>

      <div class="dashed-divider" />

      <div>
        <ul class="elbet-ticket__selection">
          <li>11 12 15 20 23 44</li>
          <li>11 12 15 20 23 44</li>
          <li>11 12 15 20 23 44</li>
          <li>11 12 15 20 23 44</li>
        </ul>
        <div class="elbet-ticket__combination">
          <span> 1201 </span>
          <span> Number of Combination: 4 </span>
        </div>
      </div>

      <div class="dashed-divider" />

      <div class="elbet-ticket__stake">
        <span> Total Stake </span>
        <span> 200.00 </span>
      </div>
      <div class="elbet-ticket__stake">
        <span> Total Won </span>
        <span> 95.00 </span>
      </div>

      <div class="dashed-divider" />

      <div class="elbet-ticket__max">
        <span> Potential Maximum Win </span>
        <span> 200,000.00 </span>
      </div>

      <div class="elbet-ticket__min">
        <span> Potential Minimum Win </span>
        <span> 50.00 </span>
      </div>

      <div class="elbet-ticket__jackpot">
        <span> Jackpot Code: </span>
        <span> RMHK </span>
      </div>
      <div class="elbet-ticket__qr-code">
        <img src="https://res.cloudinary.com/dvuogdjyq/image/upload/v1680279838/Starbet/frame_exmbln.png"
          alt="starbet_qr_code">

        <span> www.starbet.ng</span>
      </div>
    </div>

    <div class="elbet-ticket__watermark">
      <div class="elbet-ticket__watermark-body">
        PAID
      </div>
    </div>

    <div class="elbet-ticket__close">
      <span class=" i-carbon:close w8 h-8 text-white" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.elbet-ticket {
  &__container {
    max-width: 350px;
    background-color: #fff;
    border: 1px solid black;
    @apply font-RedHatMono;
    position: relative;
  }

  &__wrapper {
    padding: .75rem .5rem;

    &::after {
      content: '';
      position: absolute;
      right: 0;
      top: 0;
    }
  }

  &__title {
    font-weight: 600;
    font-size: 28px;
    display: flex;
    justify-content: center;
    margin-bottom: .5rem;
  }

  &__subtitle {
    font-size: 13px;
  }

  &__3 {
    margin-top: .75rem;
    margin-bottom: .3rem;
  }

  &__selection {
    margin: .3rem 0;
    font-size: 24px;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;

    &>li {
      display: inline-flex;
    }
  }

  &__combination {
    font-size: 13px;
  }

  &__combination,
  &__stake,
  &__min,
  &__max {
    font-size: 13px;
    display: flex;
    justify-content: space-between
  }

  &__stake {
    font-size: 14px;
    font-weight: 500;
  }

  &__jackpot {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-weight: 500;
    margin: .3rem 0;
    gap: .5rem;
    font-weight: 300;

    &>span:last-child {
      background-color: #000;
      color: #fff;
      padding: 0 .25rem;
    }
  }

  &__qr-code {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    font-size: 12px;

    &>img {
      max-width: 100px;
      height: 100px;
    }
  }

  &__watermark {
    position: absolute;
    left: 0px;
    top: 0px;
    align-items: center;
    display: flex;
    justify-content: center;
    height: 100%;
    width: 100%;

    &-body {
      color: rgba(0, 0, 0, 0.05);

      /* Text styles */
      font-size: 9rem;
      font-weight: bold;
      text-transform: uppercase;

      /* Rotate the text */
      transform: rotate(-45deg);

      /* Disable the selection */
      user-select: none;
    }
  }

  &__close {
    border-radius: 999px;
    background-color: #000;
    color: #fff;
    display: inline-flex;
    position: absolute;
    right: 0px;
    top: 0px;
    transform: translate(50%, -50%);
  }

}

.dashed-divider {
  border: 1px dashed black;
  margin: .3rem 0;
}
</style>

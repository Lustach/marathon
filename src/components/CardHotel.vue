<template>
  <div class="card__inner">
    <img class="card__image" :src="imgSrc" alt=""/>
    <div class="card__content">
      <p class="card__content_place">{{ data.address }}</p>
      <p class="card__content_title">{{ data.name }} </p>
      <p class="card__content_rating">
        <span v-for="i in data.stars" :key="i">
          <svg class="card__content_rating_img">
            <use xlink:href="../assets/images/card/sprites.svg#star" xmlns="http://www.w3.org/2000/svg"></use>
          </svg>
        </span>
        <span class="card__content_rating_count-text">{{ data.stars }} звезды</span>
        <span class="card__content_rating_type">{{ data.type }}</span>
      </p>
      <p class="card__content_about">{{ data.description }}</p>
    </div>
    <div class="card__about">
      <div class="card__about_no-review" v-if="!data.reviews_amount">
        <img src="@/assets/images/card/no_rating.svg" alt="">
        Нет оценок
      </div>
      <div v-else class="card__about_review">
        <p class="card__about_review-info">
          <svg>
            <use xlink:href="../assets/images/card/sprites.svg#star" xmlns="http://www.w3.org/2000/svg"></use>
          </svg>
          {{ data.rating }} <img src="@/assets/images/card/ellipse.svg" alt=""> Хорошо <img src="@/assets/images/card/ellipse.svg" alt=""> {{ data.reviews_amount }} отзывов
        </p>
        <p class="card__about_review-text">"{{ data.last_review }}"</p>
      </div>
      <div class="card__about_action">
        <span>от {{ data.min_price }} &#8381;</span>
        <button class="card__about_button">
          Забронировать
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardHotel",
  props: {
    data: {
      required: true,
    }
  },
  computed: {
    imgSrc: (vm) => require(`../assets/images/card/${vm.data.img}`)
  }
}
</script>

<style scoped lang="scss">
.card {
  &__inner {
    font-family: 'KievitPro', sans-serif;
    max-width: 938px;
    height: 290px;
    display: flex;
    padding: 28px 0;

    &:first-child {
      padding: 0;
    }

    border-bottom: 1px solid #F3EFEA;
    //color: $gray;
  }

  &__image {
    width: 29.85%;
    max-width: 280px;
    height: 290px;
  }

  &__content {
    margin-right: 13px;
    margin-left: 23px;
    max-width: 385px;

    &_rating {
      text-align: left;
      margin-bottom: 15px;

      &_type {
        border: 1px solid #D4D4D4;
        padding: 7px;
        border-radius: 2px;
        font-size: 13px;
        color: #515151;
        height: 20px;
      }

      &_count-text {
        line-height: 17px;
        font-weight: 600;
        font-size: 14px;
        margin: 0 10px 0 8px;
      }

      &_img {
        margin: 0 4px;
        width: 12.8px;
        height: 12px;
        fill: #FFD037;
      }
    }

    &_about {
      text-align: left;
      font-size: 14px;
      line-height: 20px;
      color: black;
    }

    &_place {
      font-weight: 500;
      color: #515151;
      font-size: 14px;
      line-height: 17px;
      text-align: left;
      margin-bottom: 6px;
    }

    &_title {
      font-weight: 600;
      font-size: 20px;
      line-height: 24px;
      text-align: left;
      margin-bottom: 17px;
    }
  }

  &__about {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 25.26%;

    &_action {
      span {
        color: black;
        font-weight: 600;
      }

      button {
        background-color: #FF4641;
        outline: none;
        border: none;
        color: white;
        width: 140px;
        height: 50px;
        margin-left: 11px;

        &:hover {
          cursor: pointer;
        }
      }
    }

    &_no-review {
      display: flex;
      align-items: center;
      height: 67px;
      background-color: #F9F7F2;
      color: #959595;
      max-width: 237px;

      img {
        margin: 0 8px 0 16px;
      }
    }

    &_review {
      background-color: #F9F7F2;
      width: 100%;
      height: 220px;

      &-text {
        font-size: 13px;
        line-height: 17px;
        padding: 18px 22px 25px 20px;
        color: #515151;
        text-align: start;
      }

      &-info {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #212121;
        font-size: 14px;
        font-weight: 600;
        margin: 25px auto 0 0;

        img {
          margin: 0 7px;
        }

        svg {
          fill: #FF4641;
          width: 12.8px;
          height: 12px;
          margin-right: 3.2px;
        }
      }
    }
  }
}
</style>

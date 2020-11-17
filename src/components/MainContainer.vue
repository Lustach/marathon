<template>
  <div class="container">
    <div class="container__inner">
      <div class="filters__container">
        <div class="accordion__container">
          <button class="accordion" @click="accordion">Поиск по странам и городам</button>
          <div class="panel" style="display: block">
            <v-select class="country__select" v-model="countryName" :options="countries" placeholder="Введите страну, например, Россия"></v-select>
          </div>
        </div>
        <div class="accordion__container">
          <button class="accordion" @click="accordion">Звёзды</button>
          <div class="panel" style="display: block">
            <div class="stars__container">
              <label class=" check option" v-for="(i,key) in stars" :key="key">
                <input type="checkbox" class="check__input" v-model="i.value" value="i.stars">
                <span class="check__box"></span>
                <span class="check__box_text">{{ i.name }}</span>
              </label>
            </div>
          </div>
        </div>
        <div class="accordion__container">
          <button class="accordion" @click="accordion">Тип</button>
          <div class="panel" style="display: block">
            <div class="chip__container">
              <div class="chip__box" :class="{chip__active: i.value}" @click="setChip($event,key)" v-for="(i,key) in type" :key="key">
                {{ i.name }}
              </div>
            </div>
          </div>
        </div>
        <div class="accordion__container">
          <button class="accordion" @click="accordion">Цена</button>
          <div class="panel panel__slider" style="display: block">
            <vue-slider v-model="sliderValue" v-bind="options">
              <template v-slot:dot>
                <div class="custom__dot">
                  <div class="custom__dot_circle"></div>
                </div>
              </template>
              <template v-slot:tooltip="{ value }">
                <div class="custom__tooltip">
                  <div>{{ value }}&#8381;</div>
                </div>
              </template>
            </vue-slider>
          </div>
        </div>
        <div class="reset_filters" @click="resetFilters()">
          <svg>
            <use xlink:href="../assets/images/card/sprites.svg#reset" xmlns="http://www.w3.org/2000/svg"></use>
          </svg>
          Сбросить все фильтры
        </div>
      </div>
      <div class="card__list">
        <template v-if="cardList.length>0">
          <CardHotel v-for="(i,key) in cardList.slice(0,cardListAmount)" :key="key" :data="i"></CardHotel>
          <template v-if="cardList.length>cardListAmount">
            <button class="btn__get-more-hotels" @click="getMoreHotels">Показать ещё отели</button>
          </template>
        </template>
        <template v-else>
          Записей не найдено
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

export default {
  components: {
    CardHotel: () => import('@/components/CardHotel'),
    VueSlider,
  },
  mounted() {
  },
  name: 'MainComponent',
  props: {
    msg: String
  },
  data: () => ({
    sliderValue: [1000, 5000],
    countryName: '',
    hotels: [
      {
        "name": "Marina Inn",
        "country": "Греция",
        "address": "Фалираки, Родос, Греция",
        "stars": 4,
        "type": "Отель",
        "description": "Этот 4-звездочный отель расположен в центре города. На его территории есть бассейн с террасой и сауна. Из номеров открывается вид на море или на средневековый город.",
        "services": ["Пляж", "Кондиционер", "Открытый бассейн", "Бесплатная парковка", "Бесплатный WiFi", "Вид на море", "Бесплатный завтрак"],
        "min_price": 2789.00,
        "currency": "RUR",
        "rating": 4.5,
        "reviews_amount": 18,
        "last_review": "Отличное расположение. Вкусный завтрак. Отдыхали с детьми - все понравилось.",
        "img": 'card_1.png'
      },
      {
        "name": "Mondrian Suites",
        "country": "Греция",
        "address": "Фалираки, Родос, Греция",
        "stars": 5,
        "type": "Апартаменты",
        "description": "Из окон открывается вид на город.К услугам гостей номера-студио с балконом и чайником в 2,7 км от пляжа.",
        "services": ["Пляж", "Кондиционер", "Открытый бассейн", "Платная парковка", "Бесплатный WiFi", "Вид на море"],
        "min_price": 3245.20,
        "currency": "RUR",
        "rating": 5,
        "reviews_amount": 4,
        "last_review": "Потрясающее место, в номере есть все необходимое. Красивый вид на море.",
        "img": 'card_2.png'
      },
      {
        "name": "Sunny Appartments",
        "country": "Греция",
        "address": "Родос, Родос, Греция",
        "stars": 2,
        "type": "Апартаменты",
        "description": "Все номера и апартаменты оборудованы кондиционером и телевизором с плоским экраном. Также в распоряжении гостей тостер и чайник.",
        "services": ["Пляж", "Кондиционер", "Бесплатная парковка", "Бесплатный WiFi"],
        "min_price": 1153.00,
        "currency": "RUR",
        "rating": 2.4,
        "reviews_amount": 36,
        "last_review": "Бассейн очень маленький. Кормят невкусно. Больше не поедем.",
        "img": 'card_3.png'
      },
      {
        "name": "Super All Inclusive Hotel",
        "country": "Греция",
        "address": "Родос, Родос, Греция",
        "stars": 4,
        "type": "Отель",
        "description": "Все номера оснащены телевизором с плоским экраном. Из некоторых номеров открывается вид на море или город.",
        "services": ["Пляж", "Кондиционер", "Открытый бассейн", "Бесплатный WiFi", "Вид на море", "Бесплатный завтрак"],
        "min_price": 3689.00,
        "currency": "RUR",
        "rating": 4.1,
        "reviews_amount": 14,
        "last_review": "Недалёко от пляжа и старого города, вокруг много разных магазинчиков",
        "img": 'card_4.png'
      },
      {
        "name": "Adams Hotel",
        "country": "Греция",
        "address": "Родос, Родос, Греция",
        "stars": 3,
        "type": "Отель",
        "description": "Отель расположен всего в 100 метрах от пляжа и в 5-ти минутах ходьбы от исторической части города, недалеко от всех основных достопримечательностей. Из отеля открывается вид на море. К услугам гостей спокойный открытый бассейн.",
        "services": ["Пляж", "Кондиционер", "Открытый бассейн", "Бесплатная парковка", "Бесплатный WiFi", "Бесплатный завтрак"],
        "min_price": 1896.00,
        "currency": "RUR",
        "rating": 0,
        "reviews_amount": 0,
        "last_review": "",
        "img": 'card_5.png'
      },
      {
        "name": "Marina Inn",
        "country": "Греция",
        "address": "Фалираки, Родос, Греция",
        "stars": 4,
        "type": "Отель",
        "description": "Этот 4-звездочный отель расположен в центре города. На его территории есть бассейн с террасой и сауна. Из номеров открывается вид на море или на средневековый город.",
        "services": ["Пляж", "Кондиционер", "Открытый бассейн", "Бесплатная парковка", "Бесплатный WiFi", "Вид на море", "Бесплатный завтрак"],
        "min_price": 2789.00,
        "currency": "RUR",
        "rating": 4.5,
        "reviews_amount": 18,
        "last_review": "Отличное расположение. Вкусный завтрак. Отдыхали с детьми - все понравилось.",
        "img": 'card_1.png'
      },
      {
        "name": "Mondrian Suites",
        "country": "Греция",
        "address": "Фалираки, Родос, Греция",
        "stars": 5,
        "type": "Апартаменты",
        "description": "Из окон открывается вид на город.К услугам гостей номера-студио с балконом и чайником в 2,7 км от пляжа.",
        "services": ["Пляж", "Кондиционер", "Открытый бассейн", "Платная парковка", "Бесплатный WiFi", "Вид на море"],
        "min_price": 3245.20,
        "currency": "RUR",
        "rating": 5,
        "reviews_amount": 4,
        "last_review": "Потрясающее место, в номере есть все необходимое. Красивый вид на море.",
        "img": 'card_2.png'
      },
      {
        "name": "Sunny Appartments",
        "country": "Греция",
        "address": "Родос, Родос, Греция",
        "stars": 2,
        "type": "Апартаменты",
        "description": "Все номера и апартаменты оборудованы кондиционером и телевизором с плоским экраном. Также в распоряжении гостей тостер и чайник.",
        "services": ["Пляж", "Кондиционер", "Бесплатная парковка", "Бесплатный WiFi"],
        "min_price": 1153.00,
        "currency": "RUR",
        "rating": 2.4,
        "reviews_amount": 36,
        "last_review": "Бассейн очень маленький. Кормят невкусно. Больше не поедем.",
        "img": 'card_3.png'
      },
      {
        "name": "Super All Inclusive Hotel",
        "country": "Греция",
        "address": "Родос, Родос, Греция",
        "stars": 4,
        "type": "Отель",
        "description": "Все номера оснащены телевизором с плоским экраном. Из некоторых номеров открывается вид на море или город.",
        "services": ["Пляж", "Кондиционер", "Открытый бассейн", "Бесплатный WiFi", "Вид на море", "Бесплатный завтрак"],
        "min_price": 3689.00,
        "currency": "RUR",
        "rating": 4.1,
        "reviews_amount": 14,
        "last_review": "Недалёко от пляжа и старого города, вокруг много разных магазинчиков",
        "img": 'card_4.png'
      },
      {
        "name": "Adams Hotel",
        "country": "Греция",
        "address": "Родос, Родос, Греция",
        "stars": 3,
        "type": "Отель",
        "description": "Отель расположен всего в 100 метрах от пляжа и в 5-ти минутах ходьбы от исторической части города, недалеко от всех основных достопримечательностей. Из отеля открывается вид на море. К услугам гостей спокойный открытый бассейн.",
        "services": ["Пляж", "Кондиционер", "Открытый бассейн", "Бесплатная парковка", "Бесплатный WiFi", "Бесплатный завтрак"],
        "min_price": 1896.00,
        "currency": "RUR",
        "rating": 0,
        "reviews_amount": 0,
        "last_review": "",
        "img": 'card_5.png'
      }
    ],
    stars: [
      { name: 'Без звёзд', stars: 0, value: false },
      { name: '1 звезда', stars: 1, value: false },
      { name: '2 звезды', stars: 2, value: false },
      { name: '3 звезды', stars: 3, value: false },
      { name: '4 звезды', stars: 4, value: false },
      { name: '5 звёзд', stars: 5, value: false }],
    type: [
      { name: 'Отели', id: 'Отель', value: true },
      { name: 'Апартаменты', id: 'Апартаменты', value: false }
    ],
    countries: ['Нидерланды', 'Россия', 'Греция', 'Польша'],
    options: {
      min: 0,
      max: 10000
    },
    cardListAmount: 6,
    MAX_CARDS_AT_SCREEN: 6,//Максимальное выводимое количество записей на странице - 6 штук.
  }),
  methods: {
    resetFilters() {
      this.countryName = ''
      this.stars.forEach(e => e.value = false)
      this.type[0].value = true
      this.type[1].value = false
      this.sliderValue = [1000, 5000]
    },
    accordion(event) {
      event.target.classList.toggle("active")
      let panel = event.target.nextElementSibling
      panel.style.display === 'block' ? panel.style.display = 'none' : panel.style.display = 'block'
    },
    setChip(event, key) {
      this.type[key].value = !this.type[key].value
    },
    getMoreHotels(){
      this.cardList.length-this.MAX_CARDS_AT_SCREEN >this.MAX_CARDS_AT_SCREEN-1 ?
      this.cardListAmount += this.MAX_CARDS_AT_SCREEN  :
      this.cardListAmount+= this.cardList.length - this.MAX_CARDS_AT_SCREEN
    }
  },
  computed: {
    cardList() {
      return this.hotels.filter(e => !this.countryName ? e : this.countryName === e.country).
      filter(el => this.stars.some(e => e.value) ? this.stars.find(e => el.stars === e.stars && e.value) : el).
      filter(el => el.min_price >= this.sliderValue[0] && el.min_price <= this.sliderValue[1]).
      filter(el => this.type.some(e => e.value) ? this.type.find(e => el.type === e.id && e.value) : el)
    },
  }
}
</script>
<style lang="scss">


.filters__container {
  height: 954px;
  padding: 0 21px 0 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container {
  &__inner {
    padding: 56px 0 0 9px;
    display: flex;
  }
}

.card {
  &__list {
    flex-direction: column;
    display: flex;
  }

  &__inner {
    &:last-child {
      padding-top: 0;
    }
  }
}


.stars__container {
  display: flex;
  flex-direction: column;
  align-items: baseline;
}

.vue-slider {
  width: 258px !important;

  &-process {
    background-color: #FF4641 !important;
  }

  &-dot {
    &-tooltip {
      left: -19px;

      &-top {
        top: -11px;
      }
    }
  }

  &-rail {
    height: 3px;
    background-color: #DFDACE;
  }
}

.custom {
  &__dot {
    width: 12px;
    height: 12px;
    background-color: white;
    border-radius: 50px;
    border: 6px solid #FF4641;
    position: absolute;
    top: -4px;

    &:hover {
      cursor: pointer;
    }
  }

  &__tooltip {
    padding: 0 20px;
    text-align: center;
    font-family: KievitPro, sans-serif;
    font-size: 13px;
    background-color: black;
    height: 22px;
    color: white;
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:after {
      content: '';
      position: absolute;
      width: 9px;
      height: 6px;
      bottom: -2px;
      right: 3px;
      background: linear-gradient(to left bottom, transparent 50%, black 50%);
      transform: rotate(-45deg);
    }
  }
}

.reset_filters {
  display: flex;
  align-items: center;
  color: #0E0E0E;
  font-family: KievitPro, sans-serif;
  font-size: 15px;

  svg {
    margin-right: 7.25px;
    width: 22px;
    height: 22px;
  }
}

.btn__get-more-hotels{
  width: 189px;
  height: 50px;
  box-sizing: border-box;
  font-family: 'KievitPro', sans-serif;
  font-size: 15px;
  font-weight: 600;
  line-height: 17px;
  color: #000;
  border: 2px solid #F0EADE;
  border-radius: 2px;
  background-color: #fff;
  margin: 32px auto 85px auto;

  &:hover{
    cursor: pointer;
  }
}
</style>

<template>
  <swiper class="detail-swiper">
    <swiper-item class="swiper-item" v-for="(item, index) in images"
                 :key="index" >
      <img :src="item" alt="">
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

	export default {
		name: "DetailSwiper",
    components: {
			Swiper,
      SwiperItem
    },
    props: {
			images: Array
    }
	}
</script>

<style scoped>
  .detail-swiper {
    height: 260px;
  }
  /* .swiper-item {
    height: 300px;
  } */
</style>
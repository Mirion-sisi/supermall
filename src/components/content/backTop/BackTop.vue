<template>
    <div class="back-top">
        <img src="~assets/img/common/top.png" alt="">
    </div>
</template>
<script>
export default {
    name:'BackTop',
    data() {
        return {
            
        }
    },
}
</script>
<style scoped>
    .back-top{
        position: fixed;
        bottom: 60px;
        right: 10px;
    }
    .back-top img{
        width: 48px;
    }
</style>
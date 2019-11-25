<template>
    <div  v-show='isShow' class="toast">
        <div class="content">{{message}}</div>
    </div>
</template>
<script>
export default {
    name:'Toast',
    // props:{
    //     message:{
    //         type:String,
    //         default:''
    //     },
    //     isShow:{
    //         type:Boolean,
    //         default:false
    //     }
    // },
    data() {
        return {
            message:'',
            isShow:false
        }
    },
    methods: {
        show(message,time){
            this.message=message
            this.isShow=true
            setTimeout(()=>{
                this.isShow=false
                this.message=''
            },time)

        }
    },
}
</script>
<style scoped>
.toast{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: rgba(0, 0, 0,.8);
    padding: 8px 10px;
    font-size: 18px;
    color: #fff;
    z-index: 999;
}

</style>
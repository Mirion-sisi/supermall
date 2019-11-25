<template>
  <div  class="detail-params"  v-if="Object.keys(paramsInfo).length !== 0">
    <div v-for="(table,index1) in paramsInfo.rule.tables" :key="index1">
      <table class="params-size">
        <tr v-for="(tds,index2) in table" :key="index2">
          <td v-for="(td,index3) in tds" :key="index3">{{td}}</td>
        </tr>
      </table>
    </div>
    <div class="params-param">
      <table>
        <tr v-for="(item,index) in paramsInfo.info.set" :key="index">
          <td class="param-key">{{item.key}}</td>
          <td class="param-value">{{item.value}}</td>
        </tr>
      </table>
    </div>
    <div class="params-img" v-show="paramsInfo.info.images">
      <img :src="paramsInfo.info.images" alt />
    </div>
  </div>
</template>
<script>
export default {
  name: "DetailParamsInfo",
  props: {
    paramsInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  mounted() {
    
  },
  updated() {

    
  },
};
</script>
<style scoped>
.detail-params {
  padding: 20px 15px;
  font-size: 14px;
  border-bottom: 5px solid #f2f5f8;
}
.detail-params table {
  width: 100%;
  border-collapse: collapse;
}
.detail-params table tr {
  height: 42px;
}
.detail-params table tr td {
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
}

.params-param {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.params-param .param-key {
  /*当value的数据量比较大的时候, 会挤到key,所以给一个固定的宽度*/
  width: 95px;
}
.param-value {
  color: #eb4868;
}
.params-img img {
  width: 100%;
}
</style>
<template>
  <div class="category">
    <nav-bar class="nav-bar">
      <template v-slot:center>
        <div>商品分类</div>
      </template>
    </nav-bar>
    <div class="content">
      <tab-menu @selectItem="selectItem" :categories="categories"></tab-menu>

      <scroll class="sub-category" ref="scroll">
        <div>
          <tab-content-category :subcategories="showSubcategory" />
          <tab-control
            class="cate-tab-control"
            ref="tabControl2"
            :titles="['综合', '新品', '销量']"
            @tabClick="tabClick"
          />
          <goods-list :goodsList="showCategoryDetail" />
        </div>
      </scroll>
    </div>
  </div>
</template>
<script>
import NavBar from "../../components/common/navbar/NavBar";
import Scroll from "../../components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
import TabControl from "components/content/tabControl/TabControl";

import TabMenu from "./childComps/TabMenu";
import TabContentCategory from "./childComps/TabContentCategory";

import {
  getCategory,
  getSubCategory,
  getCategoryDetail
} from "network/category.js";
import { POP, SELL, NEW } from "common/const";
import { tabControlMixin } from "common/mixin";

export default {
  name: "Category",
  mixins: [tabControlMixin],
  data() {
    return {
      categories: [],
      categoryData: {},
      currentIndex: -1,
      tabConOffsetTop: 0
    };
  },
  created() {
    // 1.请求分类数据
    this._getCategory();
    // 2.监听图片加载完成
    this.$bus.$on("itemImageLoad", () => {
      this.$refs.scroll.refresh();
    });
  },
  mounted() {},
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) return {};
      return this.categoryData[this.currentIndex].subcategories;
    },
    showCategoryDetail() {
      if (this.currentIndex === -1) return [];
      return this.categoryData[this.currentIndex].categoryDetail[
        this.currentType
      ];
    }
  },
  methods: {
    _getCategory() {
      getCategory().then(res => {
        // 1.获取分类数据
        const data = res.data.category;

        this.categories = data.list;
        // console.log(this.categories);
        // 2.初始化每个类别的子数据
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              pop: [],
              new: [],
              sell: []
            }
          };
        }
        // 3.请求第一个分类的数据
        this._getSubcategories(0);
      });
    },
    _getSubcategories(index) {
      this.currentIndex = index;
      const mailKey = this.categories[index].maitKey;
      getSubCategory(mailKey).then(res => {
        console.log(res);
        this.categoryData[index].subcategories = res.data;
        this.categoryData = { ...this.categoryData };
        this._getCategoryDetail(POP);
        this._getCategoryDetail(SELL);
        this._getCategoryDetail(NEW);
      });
    },
    _getCategoryDetail(type) {
      // 1.获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      // 2.发送请求,传入miniWallkey和type
      getCategoryDetail(miniWallkey, type).then(res => {
        // 3.将获取的数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type] = res;
        this.categoryData = { ...this.categoryData };
      });
    },
    /**
     * 事件响应相关的方法
     */
    selectItem(index) {
      this._getSubcategories(index);
    }
  },
  components: {
    NavBar,
    Scroll,
    GoodsList,
    TabControl,
    TabMenu,
    TabContentCategory
  }
};
</script>
<style scoped>
.nav-bar {
  color: #fff;
  background-color: var(--color-tint);
}
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  display: flex;
}

.sub-category {
  flex: 1;
  height: 100%;
  overflow: hidden;
  /* background-color: red; */
}
</style>
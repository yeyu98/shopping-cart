<!--
 * @Author: your name
 * @Date: 2020-04-16 10:05:06
 * @LastEditTime: 2020-04-21 16:46:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \源码e:\工作\shopping-cart\src\components\Main.vue
 -->
<template>
  <div>
    <!-- 表格 -->
    <div class="main">
      <a-table
        :rowSelection="{ selectedRowKeys:selectedKeys , onChange: onSelectedChange}"
        :columns="columns"
        :dataSource="data"
        :bordered="false"
      >
        <template slot="name" slot-scope="text,record">
          <a-row type="flex" justify="center" :gutter="10">
            <a-col :span="8">
              <img class="imgStyle" :src="record.name.imgUrl" alt="商品名称" />
            </a-col>
            <a-col :span="10">
              <div class="name">
                <span>{{record.name.title}}</span>
                <br />
                <span>{{`供应商：${record.name.provider}`}}</span>
                <br />
                <span>{{`发货地：${record.name.point}`}}</span>
                <br />
              </div>
            </a-col>
          </a-row>
        </template>
        <template slot="number" slot-scope="text,record">
          <a-row type="flex" justify="center">
            <a-col :span="2">
              <a-button
                @click="sub(record.key)"
                :disabled="record.number==0?disabled:!disabled"
              >-</a-button>
            </a-col>
            <a-col :span="6">
              <a-input v-model="record.number" style="text-align:center" />
            </a-col>
            <a-col :span="2">
              <a-button @click="add(record.key)">+</a-button>
            </a-col>
          </a-row>
        </template>
        <template slot="total" slot-scope="text,record">
          <span class="bold">{{'￥' + totalCal(record.key)}}</span>
        </template>
        <template slot="action" slot-scope="text,record">
          <div class="action">
            <a href="javascript:;" @click="delConfirm(record.key)">删除</a>
            <br />
            <a href="javascript:;" @click="moveToConfirm(record.key)">移到我的收藏</a>
            <br />
            <a
              href="javascript:;"
              @click="moveConfirm(record.key)"
              :class="{move:record.action.isMove}"
            >{{record.action.collect}}</a>
            <br />
          </div>
        </template>
      </a-table>
    </div>
    <!-- 表尾 -->
    <div class="footer">
      <a-row type="flex" justify="end">
        <a-col :span="2" :pull="9">
          <a-checkbox @click="checkAll()" :checked="checked">全选</a-checkbox>
        </a-col>
        <a-col :span="3" :pull="9">
          <span @click="deleteManys" style="cursor:pointer">删除选中的商品或服务</span>
        </a-col>
        <a-col :span="2" :pull="9">
          <span @click="moveManys" style="cursor:pointer">移到我的收藏</span>
        </a-col>
        <a-col :span="3" :pull="2">
          <span>
            已选择
            <label class="notice">{{totalItem}}</label>件商品
            <label class="notice">{{totalServe}}</label>项服务
          </span>
        </a-col>
        <a-col :pull="1" :span="4">
          总价：
          <label class="total">{{`￥${totalMoney}元`}}</label>
        </a-col>
        <a-col>
          <a-button type="primary" size="large">去结算</a-button>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
const columns = [
  {
    title: "商品或服务名称",
    dataIndex: "name",
    align: "center",
    scopedSlots: { customRender: "name" }
  },
  {
    title: "单价",
    dataIndex: "price",
    align: "center"
  },
  {
    title: "数量",
    dataIndex: "number",
    align: "center",
    scopedSlots: { customRender: "number" }
  },
  {
    title: "小计",
    dataIndex: "total",
    align: "center",
    scopedSlots: { customRender: "total" }
  },
  {
    title: "操作",
    dataIndex: "action",
    align: "center",
    scopedSlots: { customRender: "action" }
  }
];
const data = [
  {
    key:0,
    name: {
      imgUrl:
        "https://dss0.baidu.com/73t1bjeh1BF3odCf/it/u=3631518683,1591875712&fm=85&s=340227F3548A04FA0234753A03006051",
      title: "查克拉",
      provider: "印度",
      point: "意大利"
    },
    number: 10,
    price: "￥200.00",
    isServe: true,
    total: 0,
    action: {
      isMove: false,
      collect: "加入收藏"
    }
  },
  {
    key:1,
    name: {
      imgUrl:
        "http://5b0988e595225.cdn.sohucs.com/images/20170724/ad28da0d658b43aba84ce91df9cacdad.jpeg",
      title: "查克拉",
      provider: "印度",
      point: "意大利"
    },
    number: 100,
    price: "￥200.00",
    isServe: true,
    total: 0,
    action: {
      isMove: false,
      collect: "加入收藏"
    }
  },
  {
    key:2,
    name: {
      imgUrl:
        "http://gss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/b999a9014c086e06b273602204087bf40bd1cb84.jpg", //每一行的图片
      title: "小月半",
      provider: "巴西",
      point: "中国"
    },
    number: 0,
    price: "￥100.00",
    isServe: false,
    total: 0,
    action: {
      isMove: false,
      collect: "加入收藏"
    }
  },
  {
    key:3,
    name: {
      imgUrl:
        "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1587373447&di=ae7ccd821faf225a2ef43800c6187770&src=http://a0.att.hudong.com/64/76/20300001349415131407760417677.jpg",
      title: "查克拉",
      provider: "印度",
      point: "意大利"
    },
    number: 100,
    price: "￥200.00",
    isServe: false,
    total: 0,
    action: {
      isMove: false,
      collect: "加入收藏"
    }
  },
  {
    key:4,
    name: {
      imgUrl:
        "http://5b0988e595225.cdn.sohucs.com/images/20170724/ad28da0d658b43aba84ce91df9cacdad.jpeg",
      title: "查克拉",
      provider: "印度",
      point: "意大利"
    },
    number: 100,
    price: "￥200.00",
    isServe: true,
    total: 0,
    action: {
      isMove: false,
      collect: "加入收藏"
    }
  }
];
export default {
  name: "Main",
  components: {},
  data() {
    return {
      disabled: true, //当数量为0时减号就会禁用
      serve: 0, //服务数量
      columns,
      data,
      selectedKeys: [], //选中的数组
      checked: false
    };
  },
  computed: {
    totalServe() {
      let that = this; //使用that保存的原因在于直接使用this会有警告；
      if (that.selectedKeys.length === 0) {
        that.serve = 0;
      } else {
        this.selectedKeys
          .map(item => {
            return data[item].isServe; //取出数据isServe
          })
          .forEach(item => {
            //判断isServe的多少
            if (item) {
              that.serve++;
            } else {
              that.serve = this.serve;
            }
          });
      }
      return that.serve;
    },
    totalItem() {
      return this.selectedKeys.length === 0
        ? 0
        : this.selectedKeys.length - this.serve;
    },
    totalMoney() {
      return this.selectedKeys
        .map(item => {
          return data[item].total;
        })
        .reduce((pre, cur) => {
          return pre + cur;
        }, 0);
    }
  },
  methods: {
    onSelectedChange(selectedRowKeys) {
      this.selectedKeys = selectedRowKeys.sort();
      this.serve = 0; //每选择一次就把服务置0重新计算它的值
      console.log(selectedRowKeys);
      this.checked =
        this.selectedKeys.length === this.data.length ? true : false;
    },
    sub(index) {
      return data[index].number--;
    },
    add(index) {
      return data[index].number++;
    },
    single(index, that, str1, str2, str3) {
      this.$confirm({
        title: "提示",
        content: str1,
        onOk() {
          return new Promise(resolve => {
            setTimeout(resolve, 1000);
          })
            .then(() => {
              data.splice(index, 1);
              data.forEach((item, key) => {
                //对data的key重新赋值
                data[key].key = key;
              });
              that.selectedKeys = [];
              that.checked = false;
              that.$message.success(str2);
            })
            .catch(() => console.log("Oops errors!"));
        },
        onCancel() {
          that.$message.warn(str3);
        }
      });
    },
    manys(that, str1, str2, str3) {
      this.$confirm({
        title: "提示",
        content: str1,
        onOk() {
          return new Promise((resolve, reject) => {
            let num = 0.8;
            setTimeout(num > 0.5 ? resolve : reject, 1000);
          })
            .then(() => {
              for (let i = that.selectedKeys.length - 1; i >= 0; i--) {
                //selectedkey里面所保留的值才是data的索引号
                data.splice(that.selectedKeys[i], 1);
              }
              that.selectedKeys = []; //清空选中的项
              that.checked = false;
              if (data != []) {
                data.forEach((item, key) => {
                  data[key].key = key;
                });
              } //重新对data中的key赋值
              that.$message.success(str2);
            })
            .catch(() => console.log("Oops errors!"));
        },
        onCancel() {
          that.$message.warn(str3);
        }
      });
    },
    delConfirm(index) {
      this.single(
        index,
        this,
        "此操作将永久删除该商品, 是否继续?",
        "删除成功",
        "已取消删除！"
      );
    },
    moveToConfirm(index) {
      //移动到我的收藏
      this.single(
        index,
        this,
        "此操作将已选择商品或服务移到我的收藏, 是否继续?",
        "收藏成功！",
        "已取消收藏！"
      );
    },
    moveConfirm(index) {
      //加入取消收藏
      data[index].action.isMove = !data[index].action.isMove;
      data[index].action.collect = data[index].action.isMove
        ? "取消收藏"
        : "加入收藏";
    },
    deleteManys() {
      this.manys(
        this,
        "此操作将永久删除选中商品或服务, 是否继续?",
        "删除成功",
        "已取消删除！"
      );
    },
    moveManys() {
      this.manys(
        this,
        "此操作将选中的所欲商品或服务移到我的收藏中, 是否继续?",
        "收藏成功",
        "已取消收藏！"
      );
    },
    totalCal(index) {
      //计算小计
      data[index].total =
        this.data[index].number *
        this.data[index].price.substr(1, this.data[index].price.length - 1);
      return data[index].total;
    },
    checkAll() {
      //全选
      if (this.selectedKeys.length === this.data.length) {
        this.checked = false;
        this.selectedKeys = [];
      } else {
        this.checked = true;
        this.selectedKeys = this.data.map(item => {
          return item.key;
        });
      }
    }
  }
};
</script>
<style scoped>
.imgStyle {
  border: 1px solid #dedede;
  padding: 5px;
  width: 120px;
  height: 120px;
}
.move {
  color: red;
}
.name {
  text-align: left;
}
.name > span:first-child {
  color: rgb(65, 51, 51);
  font-weight: 700;
}
.notice {
  color: red;
}
.bold {
  font-weight: bolder;
  color: #000;
}
.total {
  color: red;
  font-size: 18px;
}

.footer {
  margin-top: 30px;
  height: 50px;
  line-height: 50px;
  border: 1px solid #ededed;
  background-color: #f5f5f5;
}
</style>



<script setup lang="ts">
import { getUserInfoAPI } from "@/services/user";
import type { UserInfo } from "@/types/user";
import { onMounted, ref } from "vue";

// 快捷工具列表
const tools = [
  { label: "我的问诊", path: "/user/consult", icon: "user-tool-01" },
  { label: "我的处方", path: "/user/prescription", icon: "user-tool-02" },
  { label: "家庭档案", path: "/user/patient", icon: "user-tool-03" },
  { label: "地址管理", path: "/user/address", icon: "user-tool-04" },
  { label: "我的评价", path: "/user/comment", icon: "user-tool-05" },
  { label: "官方客服", path: "/", icon: "user-tool-06" },
  { label: "设置", path: "/user/setting", icon: "user-tool-07" },
];

const user = ref<UserInfo>();

const getUserInfo = async () => {
  const res = await getUserInfoAPI();
  user.value = res.data;
};

onMounted(() => getUserInfo());
</script>

<template>
  <div class="user-page" v-if="user">
    <div class="user-info">
      <div class="top">
        <div class="avatar">
          <van-image round fit="cover" lazy-load :src="user.avatar" />
        </div>
        <div class="name">
          <p>{{ user.account }}</p>
          <span><van-icon name="edit" /></span>
        </div>
      </div>
      <div class="bottom">
        <van-row>
          <van-col span="6">
            <p>{{ user.collectionNumber }}</p>
            <p>收藏</p>
          </van-col>
          <van-col span="6">
            <p>{{ user.likeNumber }}</p>
            <p>关注</p>
          </van-col>
          <van-col span="6">
            <p>{{ user.score }}</p>
            <p>积分</p>
          </van-col>
          <van-col span="6">
            <p>{{ user.couponNumber }}</p>
            <p>优惠券</p>
          </van-col>
        </van-row>
      </div>
    </div>
    <div class="user-order">
      <div class="head">
        <h3 class="title">药品订单</h3>
        <router-link to="/order">
          <span class="more">全部订单</span>
          <van-icon name="arrow" />
        </router-link>
      </div>
      <div class="content">
        <van-row>
          <van-col span="6">
            <van-badge :content="user.orderInfo.paidNumber || ''"
              ><SvgIcon name="user-paid"
            /></van-badge>
            <p>待付款</p>
          </van-col>
          <van-col span="6">
            <van-badge :content="user.orderInfo.shippedNumber || ''"
              ><SvgIcon name="user-shipped"
            /></van-badge>
            <p>待发货</p>
          </van-col>
          <van-col span="6">
            <van-badge :content="user.orderInfo.receivedNumber || ''"
              ><SvgIcon name="user-received"
            /></van-badge>
            <p>待收货</p>
          </van-col>
          <van-col span="6">
            <van-badge :content="user.orderInfo.finishedNumber || ''"
              ><SvgIcon name="user-finished"
            /></van-badge>
            <p>已完成</p>
          </van-col>
        </van-row>
      </div>
    </div>
    <div class="user-tools">
      <h3>快捷工具</h3>
      <van-cell
        v-for="item in tools"
        :key="item.label"
        :title="item.label"
        :to="item.path"
        is-link
        :border="false"
      >
        <template #icon>
          <SvgIcon :name="item.icon" />
        </template>
      </van-cell>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-page {
  background-color: var(--cp-bg);
  min-height: calc(100vh - 50px);
  padding: 0 15px 65px;
  .user-info {
    height: 220px;
    background: linear-gradient(
      180deg,
      rgba(44, 181, 165, 0.46),
      rgba(44, 181, 165, 0)
    );
    margin: 0 -15px;
    padding: 0 12px;
    .top {
      display: flex;
      padding-top: 50px;
      align-items: center;
      .avatar {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        overflow: hidden;
      }
      .name {
        padding-left: 12px;
        p {
          font-size: 18px;
          font-weight: 500;
        }
        span {
          display: block;
          margin-top: 10px;
          font-size: 16px;
          color: var(--cp-primary);
        }
      }
    }
    .bottom {
      margin: 0 -15px;
      padding-top: 15px;
      p {
        text-align: center;
        &:first-child {
          font-size: 18px;
          font-weight: 600;
        }
        &:last-child {
          color: var(--cp-dark);
          font-size: 12px;
          padding-top: 4px;
        }
      }
    }
  }
  .user-order {
    background-color: #fff;
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-radius: 8px;
    .head {
      display: flex;
      justify-content: space-between;
      line-height: 50px;
      padding: 0 15px;
      a {
        color: var(--cp-tip);
      }
    }
    .content {
      .van-col {
        text-align: center;
        .cp-icon {
          font-size: 28px;
        }
        p {
          padding-top: 4px;
          font-size: 12px;
        }
      }
    }
  }
  .user-tools {
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    h3 {
      padding-left: 16px;
      line-height: 44px;
    }
    .van-cell {
      align-items: center;
    }
    .cp-icon {
      font-size: 18px;
      margin-right: 10px;
    }
  }
}
</style>

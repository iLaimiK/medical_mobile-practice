<script setup lang="ts"></script>

<template>
  <div class="patient-page">
    <BeginNavBar title="家庭档案"></BeginNavBar>
    <div class="patient-list">
      <div class="patient-item">
        <div class="info">
          <div class="top">
            <span class="name">小明</span>
            <span class="id">123456</span>
          </div>
          <div class="bottom">
            <span class="gender">男</span>
            <span class="age">18</span>
          </div>
        </div>
        <div class="icon"><SvgIcon name="user-edit" /></div>
        <div class="tag">默认</div>
      </div>
      <div class="patient-item">
        <div class="info">
          <div class="top">
            <span class="name">小明</span>
            <span class="id">123456</span>
          </div>
          <div class="bottom">
            <span class="gender">男</span>
            <span class="age">18</span>
          </div>
        </div>
        <div class="icon"><SvgIcon name="user-edit" /></div>
      </div>
      <div class="patient-add">
        <SvgIcon name="user-add" />
        <p>添加患者</p>
      </div>
      <div class="patient-tip">最多可添加 6 人</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.patient-page {
  padding-top: 46px;
}
.patient-list {
  padding: 15px;
}
.patient-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--cp-bg);
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  position: relative;
  border: 1px solid var(--cp-bg);
  transition: all 0.3s;
  overflow: hidden;
  .info {
    display: flex;
    flex-direction: column;
    flex: 1;
    span {
      margin-right: 20px;
      line-height: 28px;
      color: var(--cp-tip);
      &.name {
        font-size: 16px;
        color: var(--cp-text1);
      }
      &.id {
        color: var(--cp-text2);
      }
    }
  }
  .icon {
    width: 20px;
    text-align: center;
    color: var(--cp-tag);
  }
  .tag {
    position: absolute;
    right: 60px;
    top: 21px;
    width: 32px;
    height: 16px;
    font-size: 12px;
    color: #fff;
    background: var(--cp-primary);
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &.active {
    border-color: var(--cp-primary);
    background-color: var(--cp-plain);
    .icon {
      color: var(--cp-primary);
    }
  }
}
.patient-add {
  background-color: var(--cp-bg);
  color: var(--cp-primary);
  text-align: center;
  padding: 15px 0;
  border-radius: 8px;
  .cp-icon {
    font-size: 24px;
  }
}
.patient-tip {
  color: var(--cp-tag);
  padding: 12px 0;
}
.pb4 {
  padding-bottom: 4px;
}
</style>

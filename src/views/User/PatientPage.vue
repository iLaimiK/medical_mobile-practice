<script setup lang="ts">
import {
    addPatientAPI,
    deletePatientAPI,
    editPatientAPI,
    getPatientListAPI,
} from "@/services/user";
import type { PatientInfo, PatientList } from "@/types/user";
import { idCardRules, nameRules } from "@/utils/rules";
import { showConfirmDialog, showSuccessToast, type FormInstance } from "vant";
import { computed, onMounted, ref } from "vue";

const list = ref<PatientList>([]);
const getList = async () => {
  const res = await getPatientListAPI();
  list.value = res.data;
};

// Popup
const show = ref(false);
const showPopup = (item?: PatientInfo) => {
  if (item) {
    const { id, name, idCard, gender, defaultFlag } = item;
    patient.value = {
      id,
      name,
      idCard,
      gender,
      defaultFlag,
    };
  } else {
    patient.value = { ...initPatient };
  }

  show.value = true;
};

// 性别
const options = [
  { label: "男", value: 1 },
  { label: "女", value: 0 },
];

// 患者表单数据
const initPatient: PatientInfo = {
  name: "",
  idCard: "",
  gender: 1,
  defaultFlag: 0,
};

const patient = ref<PatientInfo>({ ...initPatient });

// 默认值数字转换 boolean
const defaultFlag = computed({
  get() {
    return patient.value.defaultFlag === 1;
  },
  set(val) {
    patient.value.defaultFlag = val ? 1 : 0;
  },
});

// 保存
const form = ref<FormInstance>();
const save = async () => {
  await form.value?.validate();
  // 校检身份证性别
  const gender = Number(patient.value.idCard.slice(-2, -1)) % 2;
  if (gender !== patient.value.gender) {
    await showConfirmDialog({
      title: "提示",
      message: "身份证性别与选择性别不匹配,是否继续保存?",
    });
  }
  // 添加 or 修改
  if (patient.value.id) {
    await editPatientAPI(patient.value);
  } else {
    await addPatientAPI(patient.value);
  }
  show.value = false;
  getList();
  showSuccessToast(patient.value.id ? "修改成功" : "添加成功");
};

// 删除
const del = async () => {
  if (!patient.value.id) return;
  await showConfirmDialog({
    title: "提示",
    message: `确定删除${patient.value.name}患者信息?`,
  });
  await deletePatientAPI(patient.value.id);
  show.value = false;
  getList();
  showSuccessToast("删除成功");
};

onMounted(() => {
  getList();
});
</script>

<template>
  <div class="patient-page">
    <BeginNavBar title="家庭档案"></BeginNavBar>
    <div class="patient-list">
      <div class="patient-item" v-for="item in list" :key="item.id">
        <div class="info">
          <div class="top">
            <span class="name">{{ item.name }}</span>
            <span class="id">{{
              item.idCard.replace(/^(.{6}).+(.{4})$/, "$1****$2")
            }}</span>
          </div>
          <div class="bottom">
            <span class="gender">{{ item.genderValue }}</span>
            <span class="age">{{ item.age }}岁</span>
          </div>
        </div>
        <div @click="showPopup(item)" class="icon">
          <SvgIcon name="user-edit" />
        </div>
        <div class="tag" v-if="item.defaultFlag === 1">默认</div>
      </div>
      <div class="patient-add" @click="showPopup()" v-if="list.length < 6">
        <SvgIcon name="user-add" />
        <p>添加患者</p>
      </div>
      <div class="patient-tip">最多可添加 6 人</div>
    </div>
    <!-- popup -->
    <van-popup v-model:show="show" position="right">
      <BeginNavBar
        :back="() => (show = false)"
        :title="patient.id ? '编辑患者' : '添加患者'"
        right-text="保存"
        @right-click="save"
      ></BeginNavBar>
      <van-form ref="form">
        <van-field
          v-model="patient.name"
          name="name"
          label="真实姓名"
          placeholder="请输入真实姓名"
          :rules="nameRules"
        />
        <van-field
          v-model="patient.idCard"
          name="idCard"
          label="身份证号"
          placeholder="请输入身份证号"
          :rules="idCardRules"
        />
        <van-field name="gender" label="性别" class="pb4">
          <template #input>
            <RadioBtn v-model="patient.gender" :options="options"></RadioBtn>
          </template>
        </van-field>
        <van-field name="defaultFlag" label="默认就诊人">
          <template #input>
            <van-checkbox v-model="defaultFlag" :icon-size="18" round />
          </template>
        </van-field>
      </van-form>
      <van-action-bar v-if="patient.id">
        <van-action-bar-button @click="del" text="删除" />
      </van-action-bar>
    </van-popup>
  </div>
</template>

<style scoped lang="scss">
.patient-page {
  padding-top: 46px;
  :deep(.van-popup) {
    width: 100%;
    height: 100%;
    padding-top: 46px;
    box-sizing: border-box;
  }
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

// 底部删除按钮样式
.van-action-bar {
  padding: 0 10px;
  margin-bottom: 10px;
  .van-action-bar-button {
    color: var(--cp-price);
    background-color: var(--cp-bg);
    border: 1px solid var(--cp-price);
  }
}
</style>

import BeginNavBar from "@/components/BeginNavBar.vue";
import BeginTabContainer from "@/components/BeginTabContainer.vue";
import LoginOther from "@/components/LoginOther.vue";
import SvgIcon from "@/components/SvgIcon.vue";

declare module "vue" {
  interface GlobalComponents {
    // typeof 作用：从 js 变量中取出对应的类型
    BeginNavBar: typeof BeginNavBar;
    BeginTabContainer: typeof BeginTabContainer;
    LoginOther: typeof LoginOther;
    SvgIcon: typeof SvgIcon;
  }
}

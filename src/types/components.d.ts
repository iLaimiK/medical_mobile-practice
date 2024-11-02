import BeginNavBar from "@/components/BeginNavBar.vue";

declare module "vue" {
  interface GlobalComponents {
    // typeof 作用：从 js 变量中取出对应的类型
    BeginNavBar: typeof BeginNavBar;
  }
}

<!--基础折线图-->
<template>
  <div ref="myEcharts" :style="{ height, width }"></div>
</template>
<script>
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
export default {
  name: "baseBar",
  props: {
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "100%",
    },
    mapData: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    console.log(props);
    const myEcharts = ref(null);
    const chart = new InitChart(props, myEcharts);
    onMounted(() => {
      chart.init();
    });
    return {
      myEcharts,
    };
  },
};
class InitChart {
  constructor(props, myEcharts) {
    this.props = props;
    this.myEcharts = myEcharts;
    this.state = {
      chart: null,
    };
  }

  init() {
    this.state.chart && this.destory();
    this.state.chart = echarts.init(this.myEcharts.value);

    this.state.chart.setOption({
      legend: {
        top: "90%",
        itemWidth: 10,
        itemHeight: 10,
        textStyle: {
          color: "rgba(255,255,255,.5)",
          fontSize: "12",
        },
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      // 注意颜色写的位置
      color: [
        "#006cff",
        "#60cda0",
        "#ed8884",
        "#ff9f7f",
        "#0096ff",
        "#9fe6b8",
        "#32c5e9",
        "#1d9dff",
      ],
      series: [
        {
          name: "点位统计",
          type: "pie",
          // 如果radius是百分比则必须加引号
          radius: ["10%", "70%"],
          center: ["50%", "42%"],
          roseType: "radius",
          data: [
            { value: 20, name: "云南" },
            { value: 26, name: "北京" },
            { value: 24, name: "山东" },
            { value: 25, name: "河北" },
            { value: 20, name: "江苏" },
            { value: 25, name: "浙江" },
            { value: 30, name: "深圳" },
            { value: 42, name: "广东" },
          ],
          // 修饰饼形图文字相关的样式 label对象
          label: {
            fontSize: 10,
          },
          // 修饰引导线样式
          labelLine: {
            // 连接到图形的线长度
            length: 10,
            // 连接到文字的线长度
            length2: 10,
          },
        },
      ],
    });
    window.addEventListener("resize", () => {
      this.state.chart.resize();
    });
  }

  destory() {
    this.state.chart.dispose();
    window.removeEventListener("resize", () => {
      console.log("事件移除");
    });
  }
}
</script>
<style lang="less"></style>

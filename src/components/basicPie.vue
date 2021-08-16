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
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)",
        position: function (p) {
          //其中p为当前鼠标的位置
          return [p[0] + 10, p[1] - 10];
        },
      },
      legend: {
        top: "90%",
        itemWidth: 10,
        itemHeight: 10,
        data: ["0岁以下", "20-29岁", "30-39岁", "40-49岁", "50岁以上"],
        textStyle: {
          color: "rgba(255,255,255,.5)",
          fontSize: "12",
        },
      },
      series: [
        {
          name: "年龄分布",
          type: "pie",
          center: ["50%", "42%"],
          radius: ["40%", "60%"],
          color: [
            "#065aab",
            "#066eab",
            "#0682ab",
            "#0696ab",
            "#06a0ab",
            "#06b4ab",
            "#06c8ab",
            "#06dcab",
            "#06f0ab",
          ],
          label: { show: false },
          labelLine: { show: false },
          data: [
            { value: 1, name: "0岁以下" },
            { value: 4, name: "20-29岁" },
            { value: 2, name: "30-39岁" },
            { value: 2, name: "40-49岁" },
            { value: 1, name: "50岁以上" },
          ],
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

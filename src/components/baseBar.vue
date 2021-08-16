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
      color: ["#2f89cf"],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      grid: {
        left: "0%",
        top: "10px",
        right: "0%",
        bottom: "4%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: [
            "旅游行业",
            "教育培训",
            "游戏行业",
            "医疗行业",
            "电商行业",
            "社交行业",
            "金融行业",
          ],
          axisTick: {
            alignWithLabel: true,
          },
          axisLabel: {
            textStyle: {
              color: "rgba(255,255,255,.6)",
              fontSize: "12",
            },
          },
          axisLine: {
            show: false,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          axisLabel: {
            textStyle: {
              color: "rgba(255,255,255,.6)",
              fontSize: "12",
            },
          },
          axisLine: {
            lineStyle: {
              color: "rgba(255,255,255,.1)",
              // width: 1,
              // type: "solid"
            },
          },
          splitLine: {
            lineStyle: {
              color: "rgba(255,255,255,.1)",
            },
          },
        },
      ],
      series: [
        {
          type: "bar",
          barWidth: "35%",
          data: [200, 300, 300, 900, 1500, 1200, 600],
          itemStyle: {
            barBorderRadius: 5,
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

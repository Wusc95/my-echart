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

    var data = {
      year: [
        [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
        [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79],
      ],
    };

    this.state.chart.setOption({
      color: ["#00f2f1", "#ed3f35"],
      tooltip: {
        // 通过坐标轴来触发
        trigger: "axis",
      },
      legend: {
        // 距离容器10%
        right: "10%",
        // 修饰图例文字的颜色
        textStyle: {
          color: "#4c9bfd",
        },
        // 如果series 里面设置了name，此时图例组件的data可以省略
        // data: ["邮件营销", "联盟广告"]
      },
      grid: {
        top: "20%",
        left: "3%",
        right: "4%",
        bottom: "3%",
        show: true,
        borderColor: "#012f4a",
        containLabel: true,
      },

      xAxis: {
        type: "category",
        boundaryGap: false,
        data: [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月",
        ],
        // 去除刻度
        axisTick: {
          show: false,
        },
        // 修饰刻度标签的颜色
        axisLabel: {
          color: "rgba(255,255,255,.7)",
        },
        // 去除x坐标轴的颜色
        axisLine: {
          show: false,
        },
      },
      yAxis: {
        type: "value",
        // 去除刻度
        axisTick: {
          show: false,
        },
        // 修饰刻度标签的颜色
        axisLabel: {
          color: "rgba(255,255,255,.7)",
        },
        // 修改y轴分割线的颜色
        splitLine: {
          lineStyle: {
            color: "#012f4a",
          },
        },
      },
      series: [
        {
          name: "新增人员",
          type: "line",
          stack: "总量",
          // 是否让线条圆滑显示
          smooth: true,
          data: data.year[0],
        },
        {
          name: "流失人员",
          type: "line",
          stack: "总量",
          smooth: true,
          data: data.year[1],
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

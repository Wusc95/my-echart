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

    const data = [70, 34, 60, 78, 69];
    const titlename = [
      "旅游行业",
      "教育培训",
      "游戏行业",
      "医疗行业",
      "金融行业",
    ];
    const valdata = [702, 350, 610, 793, 664];
    const myColor = ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"];

    this.state.chart.setOption({
      //图标位置
      grid: {
        top: "10%",
        left: "22%",
        bottom: "10%",
      },
      xAxis: {
        show: false,
      },
      yAxis: [
        {
          show: true,
          data: titlename,
          inverse: true,
          axisLine: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: "#fff",

            rich: {
              lg: {
                backgroundColor: "#339911",
                color: "#fff",
                borderRadius: 15,
                // padding: 5,
                align: "center",
                width: 15,
                height: 15,
              },
            },
          },
        },
        {
          show: true,
          inverse: true,
          data: valdata,
          axisLabel: {
            textStyle: {
              fontSize: 12,
              color: "#fff",
            },
          },
        },
      ],
      series: [
        {
          name: "条",
          type: "bar",
          yAxisIndex: 0,
          data: data,
          barCategoryGap: 50,
          barWidth: 10,
          itemStyle: {
            normal: {
              barBorderRadius: 20,
              color: function (params) {
                var num = myColor.length;
                return myColor[params.dataIndex % num];
              },
            },
          },
          label: {
            normal: {
              show: true,
              position: "inside",
              formatter: "{c}%",
            },
          },
        },
        {
          name: "框",
          type: "bar",
          yAxisIndex: 1,
          barCategoryGap: 50,
          data: [100, 100, 100, 100, 100],
          barWidth: 15,
          itemStyle: {
            normal: {
              color: "none",
              borderColor: "#00c1de",
              borderWidth: 3,
              barBorderRadius: 15,
            },
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

export default {
  // 获取当前时间
  getCurrentTime: () => {
    const dt = new Date();
    const y = dt.getFullYear();
    const mt = dt.getMonth() + 1;
    const day = dt.getDate();
    const h = dt.getHours();
    const m = dt.getMinutes();
    const s = dt.getSeconds();
    return `${y}年${mt}月${day}-${h}时${m}分${s}秒`;
  },
};

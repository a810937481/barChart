import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { State, EventHandler } from 'zvm-code-context';

/**
 * 柱状图数据接口
 */
export interface BarChartPropData {
  /** 图表数据数组，需从string转换成array */
  data?: string;
  /** 图表标题 */
  title?: string;
  /** X轴标签 */
  xAxisLabel?: string;
  /** Y轴标签 */
  yAxisLabel?: string;
}

/**
 * 柱状图状态接口
 */
export interface BarChartStateData {
  /** 图表高度状态 */
  chartHeight: State<number>;
}

/**
 * 柱状图事件接口
 */
export interface BarChartEvent {
  /** 柱状图点击事件 */
  onBarClick: EventHandler;
}

/**
 * 柱状图属性接口
 */
export interface BarChartProp {
  /** 数据属性 */
  propData: BarChartPropData;
  /** 状态属性 */
  propState: BarChartStateData;
  /** 事件属性 */
  event: BarChartEvent;
}

/**
 * 柱状图组件
 */
function BarChart({ propData, propState, event }: BarChartProp) {
  // 图表容器引用
  const chartRef = useRef<HTMLDivElement>(null);
  // 图表实例引用
  const chartInstance = useRef<echarts.ECharts | null>(null);
  // propData.data 从string转换成Array<{name: string;// 类别名称 value: number;// 数值}>
  const inputString = propData.data || `[]`;
  const result: Array<{ name: string; value: number }> = JSON.parse(inputString); 

  useEffect(() => {
    if (!chartRef.current) return;

    // 获取图表容器
    const container = chartRef.current;
    // 检查容器尺寸
    if (!container.offsetWidth || !container.offsetHeight) {
      console.warn('Chart container has no dimensions');
      return;
    }

    // 初始化图表实例
    if (!chartInstance.current) {
      chartInstance.current = echarts.init(container, undefined, {
        renderer: 'canvas',
        width: container.offsetWidth,
        height: container.offsetHeight
      });
    }

    // 图表配置项
    const option = {
      // 背景色
      backgroundColor: '#ffffff',
      // 标题配置
      title: {
        text: propData.title || '柱状图',
        left: 'center',
        top: 20,
        textStyle: {
          fontSize: 20,
          fontWeight: 'normal',
          color: '#333333'
        }
      },
      // 提示框配置
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderColor: '#ccc',
        borderWidth: 1,
        textStyle: {
          color: '#333333'
        },
        formatter: '{b}: {c}'
      },
      // 网格配置
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
        top: 80
      },
      // X轴配置
      xAxis: {
        type: 'category',
        data: result.map(item => item.name),
        name: propData.xAxisLabel || '类别',
        nameLocation: 'middle',
        nameGap: 30,
        nameTextStyle: {
          color: '#666666',
          fontSize: 14,
          padding: [10, 0, 0, 0]
        },
        axisLabel: {
          interval: 0,
          rotate: 30,
          color: '#666666',
          fontSize: 12
        },
        axisLine: {
          lineStyle: {
            color: '#e8e8e8'
          }
        },
        axisTick: {
          show: false
        }
      },
      // Y轴配置
      yAxis: {
        type: 'value',
        name: propData.yAxisLabel || '数值',
        nameLocation: 'middle',
        nameGap: 40,
        nameTextStyle: {
          color: '#666666',
          fontSize: 14,
          padding: [0, 10, 0, 0]
        },
        axisLabel: {
          color: '#666666',
          fontSize: 12
        },
        axisLine: {
          lineStyle: {
            color: '#e8e8e8'
          }
        },
        splitLine: {
          lineStyle: {
            color: '#f0f0f0'
          }
        }
      },
      // 数据系列配置
      series: [
        {
          data: result.map(item => item.value),
          type: 'bar',
          barWidth: '60%',
          // 柱状图样式
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#83bff6'
              },
              {
                offset: 0.5,
                color: '#188df0'
              },
              {
                offset: 1,
                color: '#188df0'
              }
            ])
          },
          // 数据标签配置
          label: {
            show: true,
            position: 'top',
            color: '#666666',
            fontSize: 12,
            formatter: '{c}'
          },
          // 鼠标悬停样式
          emphasis: {
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#66a9e9'
                },
                {
                  offset: 0.7,
                  color: '#0f7cd9'
                },
                {
                  offset: 1,
                  color: '#0f7cd9'
                }
              ])
            }
          }
        }
      ]
    };

    try {
      chartInstance.current.setOption(option);
    } catch (error) {
      console.error('Failed to set chart option:', error);
    }

    // 窗口大小变化处理
    const handleResize = () => {
      if (chartInstance.current) {
        chartInstance.current.resize({
          width: container.offsetWidth,
          height: container.offsetHeight
        });
      }
    };

    window.addEventListener('resize', handleResize);

    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartInstance.current) {
        chartInstance.current.dispose();
        chartInstance.current = null;
      }
    };
  }, [result,propData, propState.chartHeight]);

  return (
    <div 
      ref={chartRef} 
      style={{ 
        width: '100%', 
        height: '100%',
        minHeight: '400px',
        position: 'relative',
        padding: '20px',
        boxSizing: 'border-box'
      }}
      onClick={(e) => {
        if (event.onBarClick) {
          event.onBarClick(e);
        }
      }}
    />
  );
}

BarChart.displayName = "BarChart";

export default BarChart; 
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import components from './components';
import { State } from 'zvm-code-context';
import { useState } from 'react';

const { BarChart } = components;

/**
 * 应用主组件
 * @returns React组件
 */
function App() {
  // 图表高度状态
  const [height, setHeight] = useState(400);
  // 图表高度状态对象
  const chartHeight: State<number> = {
    get: () => height,
    set: (value: number) => {
      setHeight(value);
    }
  };

  return (
    <BrowserRouter>
      {/* 主容器 */}
      <div style={{ 
        height: '100vh', 
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px',
        boxSizing: 'border-box',
        backgroundColor: '#f0f2f5'
      }}>
        {/* 图表容器 */}
        <div style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '24px',
          backgroundColor: '#fff',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          padding: '24px',
          minHeight: '600px',
          transition: 'all 0.3s ease'
        }}>
          {/* 图表内部容器 */}
          <div style={{
            width: '100%',
            height: '100%',
            minHeight: '500px',
            position: 'relative'
          }}>
            {/* 柱状图组件 */}
            <BarChart
              propData={{
                data:`[
                { "name": "类别1", "value": 120 },
                { "name": "类别2", "value": 200 },
                { "name": "类别3", "value": 150 },
                { "name": "类别4", "value": 80 },
                { "name": "类别5", "value": 70 }
                ]`,
                title: '示例柱状图',
                xAxisLabel: '类别',
                yAxisLabel: '数值'
              }}
              propState={{
                chartHeight
              }}
              event={{
                onBarClick: (e: React.MouseEvent) => {
                  console.log('柱状图点击事件', e);
                }
              }}
            />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

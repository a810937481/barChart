import { importShared } from './__federation_fn_import-Bo73VXpq.js';
import components, { j as jsxRuntimeExports } from './__federation_expose_Main-nJzWiZO9.js';
import { r as reactDomExports } from './index-BDy7Zqw8.js';

var client = {};

var m = reactDomExports;
{
  client.createRoot = m.createRoot;
  client.hydrateRoot = m.hydrateRoot;
}

const {BrowserRouter} = await importShared('react-router-dom');
const {useState} = await importShared('react');

const { BarChart } = components;
function App() {
  const [height, setHeight] = useState(400);
  const chartHeight = {
    get: () => height,
    set: (value) => {
      setHeight(value);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(BrowserRouter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
    height: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    padding: "24px",
    boxSizing: "border-box",
    backgroundColor: "#f0f2f5"
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "24px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    padding: "24px",
    minHeight: "600px",
    transition: "all 0.3s ease"
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
    width: "100%",
    height: "100%",
    minHeight: "500px",
    position: "relative"
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    BarChart,
    {
      propData: {
        data: `[
                { "name": "类别1", "value": 120 },
                { "name": "类别2", "value": 200 },
                { "name": "类别3", "value": 150 },
                { "name": "类别4", "value": 80 },
                { "name": "类别5", "value": 70 }
                ]`,
        title: "示例柱状图",
        xAxisLabel: "类别",
        yAxisLabel: "数值"
      },
      propState: {
        chartHeight
      },
      event: {
        onBarClick: (e) => {
          console.log("柱状图点击事件", e);
        }
      }
    }
  ) }) }) }) });
}

const React = await importShared('react');
client.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) })
);

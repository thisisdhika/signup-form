import * as React from "react";
import { render } from "react-dom";
import Index from "./pages/Index";

import "./styles/main.scss";

const rootEl = document.getElementById("root");

render(<Index />, rootEl);

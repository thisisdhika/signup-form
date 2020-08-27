import * as React from "react";
import { hot } from "react-hot-loader";

import Form from "../components/Form";

class Index extends React.Component<Record<string, unknown>, undefined> {
  public render() {
    return (
      <main className="tid-main tid-home">
        <div className="tid-main__wrapper">
          <div className="tid-main__content">
            <div className="container">
              <div className="tid-home__wrapper tid-min-h-full">
                <Form />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

declare let module: Record<string, unknown>;

export default hot(module)(Index);

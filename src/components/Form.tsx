import * as React from "react";
import { hot } from "react-hot-loader";
import axios from "axios";
import Form, { Field } from "rc-field-form";
import anime from "animejs";

// Helpers
import cn from "classnames";
import { isUndefined, isNull, isEmpty } from "lodash";

// Types
import { RuleObject, FormInstance } from "rc-field-form/es/interface";

class TIDForm extends React.Component {
  public state = {
    ready: false,
    loading: false,
    pwVisible: false,
    success: false,
    failure: false,
  };

  private form!: FormInstance;
  private formRef = (form: FormInstance) => (this.form = form);

  public checkEmailAvailability(
    rule: RuleObject,
    email: string,
  ): Promise<never> | void {
    return new Promise((resolve, reject) => {
      if (isUndefined(email) || isNull(email) || isEmpty(email)) {
        reject("Please fill your Email Address");
        return;
      }

      if (
        !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/gim.test(
          email,
        )
      ) {
        reject("Please enter a valid Email Address");
        return;
      }

      axios
        .post("https://api.raisely.com/v3/check-user", {
          campaignUuid: "46aa3270-d2ee-11ea-a9f0-e9a68ccff42a",
          data: {
            email,
          },
        })
        .then(
          ({
            data: {
              data: { status },
            },
          }) => {
            if (status !== "OK") {
              reject("Your Email is already taken.");
              return;
            } else {
              resolve();
            }
          },
        );
    });
  }

  public componentDidMount() {
    if (typeof this.form !== "undefined") {
      this.setState({ ready: true });
    }
  }

  public componentDidUpdate(prevProps, prevState) {
    if (prevState.loading !== this.state.loading) {
      if (!prevState.loading) {
        anime
          .timeline({
            easing: "easeInOutExpo",
          })
          .add({
            targets: ".tid-form .loader",
            width: "105%",
          })
          .add({
            targets: ".tid-form .loader span",
            opacity: 1,
          });
      } else {
        anime
          .timeline({
            easing: "easeInOutExpo",
          })
          .add({
            targets: ".tid-form .loader span",
            opacity: 0,
          })
          .add({
            targets: ".tid-form .loader",
            width: "0.8%",
          });
      }

      if (prevState.success !== this.state.success) {
        if (this.state.success) {
          anime
            .timeline({
              easing: "easeInOutExpo",
              duration: 500,
            })
            .add({
              targets: ".tid-form__wrapper",
              translateY: "-110%",
            })
            .add({
              targets: ".tid-form__success",
              top: "0%",
            });
        }
      }
    }
  }

  public handleSubmit() {
    this.form
      .validateFields()
      .then(({ firstName, lastName, email, password }) => {
        this.setState({ loading: true }, () =>
          axios
            .post("https://api.raisely.com/v3/signup", {
              campaignUuid: "46aa3270-d2ee-11ea-a9f0-e9a68ccff42a",
              data: {
                firstName,
                lastName,
                email,
                password,
              },
            })
            .then(() => {
              this.setState({ loading: false, success: true });
            })
            .catch(() => {
              this.setState({ loading: false, failure: true });
            }),
        );
      })
      .catch(() => this.forceUpdate());
  }

  public render() {
    return (
      <Form
        className={cn(["tid-form", this.state.success ? "success" : ""])}
        ref={this.formRef}
      >
        <span className="loader">
          <span>Registering Your Account...</span>
        </span>

        <div className="tid-form__success">
          <div className="container">
            <h1 className="font-bold text-2xl leading-tight text-green-500 mb-6">
              Success!
              <small className="block text-gray-600">
                Your account has been registered!
              </small>
            </h1>
          </div>
        </div>

        <div className="tid-form__wrapper">
          <h1 className="font-bold text-2xl leading-tight text-gray-700 mb-6">
            SignUp!
            <small className="block text-sm text-gray-600">
              Fill your credentials below to continue.
            </small>
          </h1>

          {this.state.ready ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="tid-form__group col-span-2 tablet:col-span-1">
                <label htmlFor="firstName">First Name</label>
                <Field
                  name="firstName"
                  rules={[
                    {
                      required: true,
                      message: "Please fill your First Name",
                    },
                  ]}
                >
                  <div className="tid-input">
                    <input
                      disabled={this.state.loading}
                      className="tid-input__el"
                      type="text"
                      name="firstName"
                      id="firstName"
                      placeholder="Eg: John"
                    />
                  </div>
                </Field>
                <span className="text-red-500 text-sm">
                  {this.form.getFieldError("firstName")}
                </span>
              </div>

              <div className="tid-form__group col-span-2 tablet:col-span-1">
                <label htmlFor="lastName">Last Name</label>
                <Field
                  name="lastName"
                  rules={[
                    { required: true, message: "Please fill your Last Name" },
                  ]}
                >
                  <div className="tid-input">
                    <input
                      disabled={this.state.loading}
                      className="tid-input__el"
                      type="text"
                      name="lastName"
                      id="lastName"
                      placeholder="Eg: Doe"
                    />
                  </div>
                </Field>
                <span className="text-red-500 text-sm">
                  {this.form.getFieldError("lastName")}
                </span>
              </div>

              <div className="tid-form__group col-span-2">
                <label htmlFor="email">Email Address</label>
                <Field
                  name="email"
                  rules={[
                    {
                      validator: (rule, value) =>
                        this.checkEmailAvailability(rule, value),
                    },
                  ]}
                >
                  <div className="tid-input">
                    <input
                      disabled={this.state.loading}
                      className="tid-input__el"
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Eg: john@doe.com"
                    />
                  </div>
                </Field>
                <span className="text-red-500 text-sm">
                  {this.form.getFieldError("email")}
                </span>
              </div>

              <div className="tid-form__group col-span-2">
                <label htmlFor="password">Password</label>
                <Field
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Make a password please",
                    },
                    {
                      min: 8,
                      message: "Your password must be more than 8 characters",
                    },
                  ]}
                >
                  <div className="tid-input">
                    <input
                      disabled={this.state.loading}
                      className="tid-input__el"
                      type={this.state.pwVisible ? "text" : "password"}
                      name="password"
                      id="password"
                      placeholder="Password"
                    />
                    <button
                      type="button"
                      className="tid-input__prepend"
                      onClick={(
                        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
                      ) => {
                        e.persist();
                        this.setState((state: Record<string, boolean>) => {
                          return {
                            pwVisible: !state.pwVisible,
                          };
                        });
                      }}
                    >
                      <i
                        className={cn([
                          "fa",
                          this.state.pwVisible ? "fa-eye-slash" : "fa-eye",
                        ])}
                      ></i>
                    </button>
                  </div>
                </Field>
                <span className="text-red-500 text-sm">
                  {this.form.getFieldError("password")}
                </span>
              </div>
            </div>
          ) : null}

          <button
            type="button"
            onClick={this.handleSubmit.bind(this)}
            className="tid-btn tid-btn-primary mt-6"
            disabled={this.state.loading}
          >
            Submit
          </button>
        </div>
      </Form>
    );
  }
}

declare let module: Record<string, unknown>;

export default hot(module)(TIDForm);

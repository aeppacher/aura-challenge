import { configure, shallow, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import toJson from "enzyme-to-json";
import { Timer, Expired } from ".";
import * as React from "react";

configure({ adapter: new Adapter() });

describe("Expired component tests", () => {
  it("should match snapshot", () => {
    const Wrapper = shallow(<Expired />);
    expect(toJson(Wrapper)).toMatchSnapshot();
  });
});

describe("Timer component tests", () => {
  beforeEach(() => jest.clearAllMocks());

  it("should render and invoke useEffect once", () => {
    const useEffectMock = jest.fn();

    jest.spyOn(React, "useEffect").mockImplementation(useEffectMock);

    const Wrapper = shallow(<Timer />);
    expect(toJson(Wrapper)).toMatchSnapshot();
    expect(useEffectMock).toHaveBeenCalledTimes(1);
  });

  it("on start button click should call setInterval and timerstarted", () => {
    const setCounter = jest.fn();
    const setTimerStarted = jest.fn();
    const setIntervalId = jest.fn();

    const useState = jest.spyOn(React, "useState");
    useState.mockImplementationOnce((counter) => [counter, setCounter]);
    useState.mockImplementationOnce((timerStarted) => [
      timerStarted,
      setTimerStarted,
    ]);
    useState.mockImplementationOnce((intervalId) => [
      intervalId,
      setIntervalId,
    ]);

    const Wrapper = shallow(<Timer />);

    const startButton = Wrapper.find("Button").at(0);

    startButton.simulate("click");

    expect(setIntervalId).toHaveBeenCalledTimes(1);
    expect(setIntervalId).toHaveBeenCalledWith(expect.any(Number));
    expect(setTimerStarted).toHaveBeenCalledTimes(1);
    expect(setTimerStarted).toHaveBeenCalledWith(true);
    expect(setCounter).toHaveBeenCalledTimes(1);
    expect(setCounter).toHaveBeenCalledWith(60);
  });

  it("on reset button click should call setInterval and timerstarted", () => {
    const setCounter = jest.fn();
    const setTimerStarted = jest.fn();
    const setIntervalId = jest.fn();

    const useState = jest.spyOn(React, "useState");
    useState.mockImplementationOnce((counter) => [counter, setCounter]);
    useState.mockImplementationOnce((timerStarted) => [
      timerStarted,
      setTimerStarted,
    ]);
    useState.mockImplementationOnce((intervalId) => [
      intervalId,
      setIntervalId,
    ]);

    const Wrapper = shallow(<Timer />);

    const resetButton = Wrapper.find("Button").at(1);

    resetButton.simulate("click");

    expect(setIntervalId).toHaveBeenCalledTimes(1);
    expect(setIntervalId).toHaveBeenCalledWith(undefined);
    expect(setTimerStarted).toHaveBeenCalledTimes(1);
    expect(setTimerStarted).toHaveBeenCalledWith(false);
    expect(setCounter).toHaveBeenCalledTimes(1);
    expect(setCounter).toHaveBeenCalledWith(60);
  });
});

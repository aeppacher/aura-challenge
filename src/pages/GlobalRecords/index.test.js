import { configure, shallow, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { useSelector, useStore } from "react-redux";
import toJson from "enzyme-to-json";
import { GlobalRecords } from ".";
import * as React from "react";
import { mockFetch } from "../../util/mockFetch";

configure({ adapter: new Adapter() });

jest.mock("../../util/mockFetch", () => ({
  mockFetch: jest.fn(),
}));

jest.mock("react-redux", () => ({
  useStore: jest.fn(),
  useSelector: jest.fn(() => [
    {
      id: 10,
      artist: {
        name: "Jeff Parker",
        id: 100,
      },
      album: {
        title: "Suite for Max Brown",
        imageSrc: "/assets/jeff_parker-suite_for_max_brown.jpg",
      },
    },
  ]),
}));

describe("GlobalRecords component tests", () => {
  beforeEach(() => jest.clearAllMocks());

  it("should match snapshot", () => {
    const Wrapper = shallow(<GlobalRecords />);
    expect(toJson(Wrapper)).toMatchSnapshot();
  });

  it("should render and invoke useEffect once", () => {
    const useEffectMock = jest.fn();

    jest.spyOn(React, "useEffect").mockImplementation(useEffectMock);

    const Wrapper = shallow(<GlobalRecords />);
    expect(toJson(Wrapper)).toMatchSnapshot();
    expect(useEffectMock).toHaveBeenCalledTimes(1);
  });
});

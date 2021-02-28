import { init } from "Internal/store";
import * as redux from ".";

describe("records service", () => {
  // mockdata
  const record1 = {
    id: 9,
    artist: {
      name: "Tame Impala",
      id: 101,
    },
    album: {
      title: "The Slow Rush",
      imageSrc: "/assets/tame_impala-the_slow_rush.jpg",
    },
  };

  const record2 = {
    id: 10,
    artist: {
      name: "Jeff Parker",
      id: 100,
    },
    album: {
      title: "Suite for Max Brown",
      imageSrc: "/assets/jeff_parker-suite_for_max_brown.jpg",
    },
  };

  // Root reducer
  const store = init({ records: redux.records });

  it("has records reducer with initial state", () => {
    expect(store.getState().records).toEqual(redux.initialState);
  });

  it("concats entry to initialstate", () => {
    store.dispatch({
      type: redux.RECORD_TYPES.ADD_RECORDS,
      payload: [record1],
    });

    expect(store.getState().records.data).toEqual([record1]);
  });

  it("concats new entries to existing state", () => {
    store.dispatch({
      type: redux.RECORD_TYPES.ADD_RECORDS,
      payload: [record2],
    });

    expect(store.getState().records.data).toEqual([record1, record2]);
  });

  it("clears state properly", () => {
    store.dispatch({
      type: redux.RECORD_TYPES.CLEAR_RECORDS,
    });

    expect(store.getState().records.data).toEqual([]);
  });
});

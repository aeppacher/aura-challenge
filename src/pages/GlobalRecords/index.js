// Globals
import React, { useEffect, useState } from "react";
import { useSelector, useStore } from "react-redux";
import { RECORD_TYPES } from "../../services/records";
import { mockFetch } from "../../util/mockFetch";

// Components
import { Record } from "components/Record";

const FetchStatus = {
  not_fetching: 0,
  fetching: 1,
  failed: 2,
  succeeded: 3,
};

// Component
function GlobalRecords() {
  const [fetchState, setFetchState] = useState(FetchStatus.not_fetching);
  const store = useStore();
  const data = useSelector((state) => state.records.data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetchState(FetchStatus.fetching);
        const payload = await mockFetch();
        store.dispatch({ type: RECORD_TYPES.ADD_RECORDS, payload });
        setFetchState(FetchStatus.succeeded);
      } catch (e) {
        setFetchState(FetchStatus.failed);
      }
    };
    fetchData();

    return store.dispatch({ type: RECORD_TYPES.CLEAR_RECORDS });
  }, []);

  const renderData = () => {
    switch (fetchState) {
      case FetchStatus.succeeded:
        return data.map((record) => {
          return <Record key={record.id} data={record} />;
        });
      case FetchStatus.failed:
        return <p>Fetch error please refresh</p>;
      case FetchStatus.fetching:
        return <p>retrieving results</p>;
    }
  };

  return (
    <div className="aura-page aura-global_records">
      <h1>Top Records of 2020</h1>

      <div className="aura-page-content">{renderData()}</div>
    </div>
  );
}

export { GlobalRecords };

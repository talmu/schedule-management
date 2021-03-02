import * as R from "ramda";
import Loading from "../components/Loading";

const FetchingData = ({ hooks, children }) => {
  const isFetching = hooks.map((hook) => hook.isFetching);

  return R.contains(true, isFetching) ? <Loading /> : <div>{children}</div>;
};

export default FetchingData;

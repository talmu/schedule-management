import { useRxDocument } from "rxdb-hooks";
import { useParams } from "react-router-dom";

const ListTitle = () => {
  const { listId } = useParams();
  const { result: list } = useRxDocument("lists", listId);

  return list ? list.name : "";
};

export default ListTitle;

import { useState } from "react";
import { useEffect } from "react";
import { useRxCollection } from "rxdb-hooks";
import GeneralList from "../components/GeneralList";

const FilteredListPage = ({ location }) => {
  const { state } = location;
  const todos = useRxCollection("todos");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    todos
      ?.find({
        selector: state,
      })
      .exec()
      .then(setTasks);
  }, [todos, state]);

  return <GeneralList tasks={tasks} />;
};

export default FilteredListPage;

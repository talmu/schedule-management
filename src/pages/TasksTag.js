import { useTasksTag } from "../data/DBHooks";
import Loading from "../components/Loading";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import GeneralList from "./../components/GeneralList";

const TasksTag = () => {
  const { tagId } = useParams();
  const [tasks_tag, isFetching] = useTasksTag(tagId);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    Promise.all(
      tasks_tag.map(async (task_tag) => await task_tag.task_id_)
    ).then(setTasks);
  }, [tasks_tag]);

  return isFetching ? <Loading /> : <GeneralList tasks={tasks} />;
};

export default TasksTag;

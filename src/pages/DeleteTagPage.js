import { useParams } from "react-router-dom";
import { useRxDB } from "rxdb-hooks";
import DeletePage from "./DeletePage";
import { useTag } from "../data/DBHooks";

const DeleteTagPage = () => {
  const { tagId } = useParams();
  const db = useRxDB();
  const tagObj = useTag(tagId);

  const handleDelete = async () => {
    const query = db.task_tags.find().where("tag_id").equals(tagId);
    const task_tags = await query.exec();
    await Promise.all(task_tags.map((task_tag) => task_tag.remove()));
    tagObj.remove();
  };

  return <DeletePage handleDelete={handleDelete} />;
};

export default DeleteTagPage;

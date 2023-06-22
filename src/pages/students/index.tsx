import { FC } from "react";
import FetchDataStudent from "./feature/fetch-data-student";

interface Props {}

const StudentPage: FC<Props> = ({}) => {
  return (
    <>
      <FetchDataStudent />
    </>
  );
};

export default StudentPage;

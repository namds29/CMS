import { createContext } from "react";
import { useFetchCenters, useFetchCourses, useFetchReferSources, useFetchSession } from "../hooks/useFetchUtilsData";


// type Decode_Token = {
//   id: number,
//   loginName: string;
//   role: number;
// };

export const UtilsContext = createContext({
  centers:[],
  referSources:[],
  sessions: [],
  courses: []
});

export const UtilsProvider = ({ children }: any) => {
    const {centers} = useFetchCenters();
    const {referSources} = useFetchReferSources();
    const {sessions} = useFetchSession();
    const {courses} = useFetchCourses();
    
  return (
    <UtilsContext.Provider value={{ centers, referSources, sessions, courses }}>{children}</UtilsContext.Provider>
  );
};

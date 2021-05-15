// OhtersMyPage페이지네이션에서 필요한 wrote리스트

import React, { useEffect } from "react";
import Wrote from "../components/Wrote";
import { useDispatch, useSelector } from "react-redux";
import { actionsCreators as userActions } from "../redux/modules/user";

const WroteList = (props) => {

console.log(props);
  const dispatch = useDispatch();

  useEffect(() => {
    const otherName = window.location.href.split("/")[4];
    dispatch(userActions.getOtherPageDB(otherName));
  }, []);

//   const write_list = useSelector((store) => store.user.other_write);


  return (
      <div>
          {props.write_list.map((p) => {
        return <Wrote key={p.id} {...p} />;
      })}
      </div>
  )
};

export default WroteList;
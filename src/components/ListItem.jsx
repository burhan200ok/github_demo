import React from "react";
import { Image, ListGroup } from "react-bootstrap";
import moment from "moment";

function ListItem({ commit, author }) {
  return (
    <ListGroup.Item className="mt-1 mb-1 rounded shadow-sm">
      <div className="d-flex flex-row align-items-center">
        {/* Avatar of the User. and if there's no avatar for the User then it'll show the default avatar */}
        <Image
          className="listItem__avatar"
          src={
            author && author.avatar_url
              ? author.avatar_url
              : "https://avatars0.githubusercontent.com/u/71177365?&v=4"
          }
          roundedCircle
        />
        {/* Description of the Commit */}
        <div className="d-flex flex-column ml-3 w-100">
          <span className="font-weight-bold">{commit?.message}</span>
          <div className="d-flex flex-row align-items-center justify-content-between">
            <span className="flex-1">
              {" "}
              <strong className="h6">{`Committed By: `}</strong>
              {commit?.committer?.name}
            </span>

            <small>{moment(commit?.committer?.date).format("lll")}</small>
          </div>
        </div>
      </div>
    </ListGroup.Item>
  );
}

export default ListItem;

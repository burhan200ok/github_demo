import React, { useEffect, useState } from "react";
import { Image, ListGroup } from "react-bootstrap";
import moment from "moment";
import { fetchCommits } from "../api/fetchCommits";
import Header from "./Header";

const username = "rohan-200ok";
const repo = "github_demo";

function List() {
  const [commits, setCommits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getCommits = async () => {
    setIsLoading(true);
    await fetchCommits(username, repo).then((response) => {
      setCommits(response);
    });
    setIsLoading(false);
  };

  useEffect(() => {
    getCommits();
  }, []);

  return (
    <div>
      <Header getCommits={getCommits} />
      <div className="jumbotron bg-light m-0" style={{ minHeight: "93vh" }}>
        <div className="container" style={{ marginTop: "-50px" }}>
          <h4 className="m-1">List of Commits</h4>
          <ListGroup>
            {!isLoading &&
              commits &&
              commits.map(({ commit, author }) => {
                return (
                  <ListGroup.Item className="mt-1 mb-1">
                    <div className="d-flex flex-row align-items-center">
                      <Image
                        style={{ height: "50px", widht: "50px" }}
                        // src="https://avatars0.githubusercontent.com/u/71177365?&v=4"
                        src={author?.avatar_url}
                        roundedCircle
                      />
                      <div className="d-flex flex-column ml-3 w-100">
                        <span className="font-weight-bold">
                          {commit?.message}
                        </span>
                        <div className="d-flex flex-row align-items-center justify-content-between">
                          <span className="flex-1">
                            {commit?.committer?.name}
                          </span>
                          <small>
                            {moment(commit?.committer?.date).format("lll")}
                          </small>
                        </div>
                      </div>
                    </div>
                  </ListGroup.Item>
                );
              })}
          </ListGroup>
          {isLoading && (
            <div
              style={{
                marginTop: "30vh",
                marginLeft: "50%",
              }}
            >
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )}
          {!isLoading && !commits.length && (
            <div className="alert alert-danger mt-1">
              <h4 className="alert-heading">
                <i className="fa fa-warning"></i> No Commits Found{" "}
              </h4>
              <span> Please Commit the code first and try again. </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default List;

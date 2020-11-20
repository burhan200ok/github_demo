import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { fetchCommits } from "../api/fetchCommits";
import Header from "./Header";
import ListItem from "./ListItem";

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
      <div className="jumbotron bg-light m-0 list__container">
        <div className="container list__containerInner">
          <h4 className="m-1">List of Commits</h4>
          <ListGroup>
            {!isLoading &&
              commits &&
              commits.map(({ commit, author }) => {
                return <ListItem commit={commit} author={author} />;
              })}
          </ListGroup>
          {isLoading && (
            <div className="list__spinner">
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

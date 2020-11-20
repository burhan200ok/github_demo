import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { fetchCommits } from "../api/fetchCommits";
import Header from "./Header";
import ListItem from "./ListItem";

// Username and Repo of whose commits are going to be displayed
const username = "rohan-200ok";
const repo = "github_demo";

function List() {
  const [commits, setCommits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetches the Commits from the Github API and Stores it into commits array
  const getCommits = async () => {
    setIsLoading(true);
    await fetchCommits(username, repo).then((response) => {
      setCommits(response);
    });
    setIsLoading(false);
  };

  // This will be run once when the page gets loaded
  useEffect(() => {
    getCommits();
  }, []);

  return (
    <div>
      <Header getCommits={getCommits} />
      <div className="jumbotron bg-light m-0 list__container">
        <div className="container list__containerInner">
          <h4 className="m-1">List of Commits</h4>
          {/* This block of code loops over the commits and Sends Passes the Data to ListItem Element to display */}
          <ListGroup>
            {!isLoading &&
              commits &&
              commits.map(({ commit, author }) => {
                return (
                  <ListItem
                    key={commit?.tree?.sha}
                    commit={commit}
                    author={author}
                  />
                );
              })}
          </ListGroup>

          {/* This Block of code will show the spinner or loader while the data gets loaded */}
          {isLoading && (
            <div className="list__spinner">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )}

          {/* This block will shows the appropriate message if there are no any data available to display */}
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

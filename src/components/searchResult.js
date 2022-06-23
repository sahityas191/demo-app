import React, { useState } from "react";
import { gql, useQuery } from '@apollo/client';

const GET_GIT_TOPICS = gql`
  query SearchTopics($search: String!) {
    search(query: $search, type: REPOSITORY, first: 10) {
      repositoryCount
      edges {
        node {
          ... on Repository {
            stargazers {
              totalCount
            }
            resourcePath
            repositoryTopics(first: 10) {
              totalCount
              nodes {
                topic {
                  name
                  stargazerCount
                  relatedTopics {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;


  function SearchResult(props) {
    let searchTerm = props.value;
    const [newTopic, setNewTopic] = useState(searchTerm);
    let search = '';
    if(searchTerm === newTopic) {
      search = `${searchTerm} stars:>10000`;
    } else {
      search = `${newTopic} stars:>10000`;
      searchTerm = newTopic;
      props.onChange(newTopic);
    }

    const { loading, error, data } = useQuery(GET_GIT_TOPICS,
      {
        variables: {search}
      });
  
    if (loading){ 
      return (
        <div>
          <i className="fa fa-spinner fa-spin mr-4"/>
          <span>...Loading results for {searchTerm}</span>
        </div>
      );
    }
    if (error) return `Error! ${error.message}`;

    return (
      <React.Fragment>
        {data && data.search.edges && data.search.edges.map((edge, index) => (
          <ul className="list-group" key={index}>
            <li className="list-group-item">
              <div className="d-flex justify-content-between mx-1">
                <h5>{edge.node.resourcePath.substring(1)}</h5>
              </div>
              <div>
                {edge.node.repositoryTopics.nodes.map((node,j)=>(
                  <button key={j} onClick={() => setNewTopic(node.topic.name)}
                  type="button" className="btn btn-outline-primary btn-sm mx-1 my-1">{node.topic.name}<span className="badge badge-light badge-pill"><i className="fa fa-star m1-2" aria-hidden="true" />{node.topic.stargazerCount}</span></button>
                   ))}
              </div>
              <span className="badge-secondary mx-1"><i className="fa fa-star" aria-hidden="true"/> {edge.node.stargazers.totalCount}</span>
            </li>
          </ul>
        ))}
      </React.Fragment>
    );
  }

export default SearchResult;
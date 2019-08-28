import { useStaticQuery, graphql } from "gatsby"

const useMenu = () => {
  
  const data = useStaticQuery( graphql`
    query {
      allMainMenuJson {
        edges {
          node {
            id
            type
            url
            title
          }
        }
      }
    }
  `);
  
  return data.allMainMenuJson.edges.map(item => ({
      id : item.node.id,
      type : item.node.type,
      url : item.node.url,
      title : item.node.title
  }));
    
};

export default useMenu;
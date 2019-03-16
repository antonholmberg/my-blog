import styled from 'styled-components';
import { Link } from 'gatsby';

const StyledLink = styled(Link)`
  text-decoration: underline;
  color: ${props => props.textColor || '#000'};
  :visited {
    color: ${props => props.textColor || '#000'};
  }
  :hover {
    color: ${props => props.textColor || '#000'};
  }
`;

export default StyledLink;

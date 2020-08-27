import React from 'react';
import styled from 'styled-components';
import SearchBar from '../search/searchBarComponent';

const StyledJumbo = styled.div`
  background-color: #24305E !important;
  text-align: center;
  color: #FFF;
`;

const StyledSlogan = styled.p`
  font-size: 2.5rem;
`;

const HomeTitle = styled.h1`
  font-family: 'Pacifico', cursive;
  font-size: 6.5rem;
  padding: 100px 0px;
`;

const StyledBody = styled.div`
  background-color: #F8E9A1;
  min-height: 100vh !important;
`;


const Home = () => (
  <StyledBody>
    <StyledJumbo className="jumbotron jumbotron-fluid">
      <HomeTitle>MTG Finance</HomeTitle>
      <StyledSlogan>Accessible Magic the Gathering Market Data</StyledSlogan>
    </StyledJumbo>
    <div className="container mx-auto">
      <div className="row mx-auto">
        <div className="col-md-6 offset-md-3">
          <SearchBar
            inputWidth="10"
          />
        </div>
      </div>
    </div>
  </StyledBody>
);

export default Home;

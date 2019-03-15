import React from "react";

import "./Home.css";

import { NavLink } from "react-router-dom";
function Home(props) {
  return (
    <div className="Home">
      <div className="uk-card uk-child-width-1-2 uk-margin-bottom" data-uk-grid>
        <div className="uk-cover-container uk-card-media-left">
          <p className="uk-margin-bottom">
            <strong>Commit.me</strong> is an innovative way to engage
            individuals and institutions on climate change.
          </p>
        </div>
        </div>

        <NavLink
          className="uk-button uk-button-primary uk-button-large"
          to="/create-pledge"
        >
          Create a pledge
        </NavLink>
        <br />
        <br />
        <NavLink
          className="uk-button uk-button-primary uk-button"
          to="/pledges"
        >
          Browse pledges
        </NavLink>
        <br />
        <br />
        <br/>
        <br/>

        <blockquote>
          "Commit-Me is an innovative way to engage individuals and institutions
          on climate change. With the window for the global community to have
          any chance of avoiding the most dangerous effects of climate change,
          we need creative solutions to nudge and incentivize people to take
          immediate action. I can't wait to see some mobilization to stake value
          to get each other acting."
        </blockquote>
        <p>
          Angel Hsu, Assistant Professor of Yale-NUS College/Yale University,
          Director of Data-Driven EnviroPolicy Lab"
        </p>

        <blockquote>
          "The commit-me team contacted me in the very early stages of their
          platform. In our first meeting, and in those we have had subsequently,
          they sought to clearly understand the institutions approach to this
          issue and sought to reflect these in their design choices. I very much
          look forward to seeing how their platform develops as well as working
          together with them in the future"
        </blockquote>

        <p>
          Tom Heel, Deputy Head of Environmental Sustainability, University of
          Oxford
        </p>
      </div>
    
  );
}

export default Home;

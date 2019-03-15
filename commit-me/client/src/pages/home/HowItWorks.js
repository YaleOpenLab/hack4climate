import React from "react";

import "./Home.css";

function HowItWorks(props) {
  return (
    <div className="HowItWorks" data-uk-filter="target: .js-filter">
      <div>
        <h1>How it works</h1>
        <h2>The problem </h2>
        <p>
          Climate change is a big problem which requires equally big commitments
          from everyone on the planet! That means you, your friends, the
          organization you work for and governments. However, just promising to
          do something isn’t enough on it’s own - keeping to your commitments is
          hard! How can we make this a little easier for you?
        </p>
        <h2>Solution </h2>
        <p>
          Commit.me allows you to create pledges for yourself, your friends or
          your organisation. By making your pledge accountable we hope that you
          will stick to your commitment. Sometimes sticking to your promises can
          be difficult - you may need a little carrot to keep you going which is
          why other people can fund your pledges! If you complete your pledge
          successfully you can be rewarded for your commitment and for helping
          the planet!
        </p>
        <h2>How can you participate?</h2>A pledge can be as simple as saying you
        will cycle to work every day rather than taking public transport or your
        car.
        <h2>What should you pledge?</h2>
        <p>
          Making your first commitment to reducing climate change can be
          daunting. What should your first commitment be? What is most effective
          for the planet? Below we outline a number of different commitments
          that you can make to reduce climate change and resources describing
          how these help. These can be simply actions like riding your bike to
          work 2 days a week but they can also be more complex, like installing
          solar panels on your roof to power your home.{" "}
        </p>
        <ul>
          <li>Reduce your meat consumption</li>
          <li>Eat local</li>
          <li>Line dry your clothes</li>
          <li>Plant a tree</li>
          <li>Use public transport</li>
          <li>Cycle to work</li>
          <li>Switch to a green electricity provider</li>
          <li>Use less water</li>
          <li>Install LED lighting in your home</li>
          <li>Insulate your home</li>
          <li>Install solar panels</li>
          <li>Unplug your devices</li>
          <li>Anything else you can think of!</li>
        </ul>
        <h2>Example pledge</h2>
        <blockquote>
          Julie is a 16 year old student in Bristol. She is worried about
          climate change and the lack of action to address the impending
          disaster. Like many other young people she has been participating in
          the School Strikes for Climate Action to help raise awareness and put
          pressure on politicians but she wants to do more. <br />
          Using commit-me Julie can make a public commitment to take action on
          climate change by, for example, planting a tree. People can sponsor
          her to do so and if she fulfills her commitment (she needs to post
          proof) she can either receive the reward or assign it to a charity or
          cause of her choice. Verification
        </blockquote>
        <h3>Why is this necessary?</h3>
        <h3>How do you get verified?</h3>
        <h3>Reward structure</h3>
        <p>Get rewarded for a successfully completed commitment</p>
        <p>Pass on your reward to a charity of your choice</p>
        <p>
          We directing your reward to charities which have been vouched for by{" "}
          <a href="https://www.givewell.org/">https://www.givewell.org/</a> or{" "}
          <a href="https://www.givingwhatwecan.org/charities/">
            https://www.givingwhatwecan.org/charities/
          </a>
          . This ensures that your reward is used in the most effective way
          possible!
        </p>
        <h3>
          How do you know if a commitment has been successfully completed?
        </h3>
        <p>
          At the end of the time period set out for the commitment, the
          committer will say whether they have fulfilled their commitment
        </p>
        <p>
          Pledgee defines when taking up the pledge how they will prove that
          they successfully completed.
        </p>
      </div>
    </div>
  );
}

export default HowItWorks;

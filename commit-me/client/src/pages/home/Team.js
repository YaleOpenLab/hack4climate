import React from "react";

import "./Home.css";

function Team(props) {
  return (
    <div className="Team uk-margin-large-top">
      <ul>
        <p>
          The Commit-Me team was formed after a workshop held at the Alan Turing
          Institute where participants explored how blockchain technology could
          be used to improve the tracking and accounting of data related to
          climate change (emissions, commitments etc).{" "}
        </p>

        <p>
          Eli: Oxford MSc candidate in Environmental Change & Management, worked
          as an impact investor and social entrepreneur (SunFarmer - off-grid
          solar in Nepal). Researching carbon pricing, CCS, and pathways toward
          a negative carbon future. Co-host of “Crypto Nomads” podcast.
        </p>

        <p>
          Matt: Technical Manager at openDemocracy.net working on web
          publishing, digital security, etc. Researching and developing
          blockchain solutions with crypticalstudios.com.
        </p>

        <p>
          Ali: Lead Lecturer at National College for Digital Skills, former
          co-founder of Decoded and CTO of blockchain start-up Everledger. Has
          volunteered as lead developer for Carboncoin, and collaborates as a
          full-stack developer with crypticalstudios.com
        </p>

        <p>
          Ophelia: Blockchain investments and advisory in Beijing with a
          background in sustainable investing at BlackRock. At BlackRock,
          developed methodology to quantify the carbon and ESG impact of
          investment portfolios using MSCI data. Advisor to Chinese family
          office. Schwarzman Scholar 2018, Master of Global Affairs, Tsinghua
          University. BA in Economics and Management, Oxford.
        </p>

        <p>
          Odysseas: PhD candidate at the Oxford Internet Institute and Alan
          Turing Institute. Research Associate at the Centre for Technology and
          Global Affairs. Research on the governance of public blockchains.
          Designing governance framework for Lendledger (blockchain-based
          lending market).
        </p>

        <p>
          Lewis: PhD candidate in the Department of Computing, Imperial College
          London. Former economist at microeconomics consultancy Oxera. MPhil in
          Economics Research, Cambridge and BA in Philosophy, Politics and
          Economics, Warwick.
        </p>
      </ul>
    </div>
  );
}

export default Team;

 const Pledges = [
  {
    pledgeId: 'pid1',
    institutionId: 1,
    name: "The University of Oxford",
    pledgeHolderAddress: "0x8218852DA2833F0f3BFa102Dbc634325b622B674",
    verified: true, // whether it's been validated
    pledgeUp: [], // {pledgeId} of parent pledge
    pledgeDown: ['pid2', 'pid3','pid4','pid5','pid6','pid7','pid8'], // [{pledgeId}, ...] of childPledges
    description: "Reduce carbon emissions by 33% by 2020/1 (from 2005/6 baseline)",
    pledgeHolder: "",
  },{
    pledgeId: 'pid2',
    institutionId: null, // When null it gets the parent institutionId
    name: "Wadham College",
    pledgeHolderAddress: "0xCD4E1E5EDEe47e52611cCf72C0C584f52680d674",
    verified: true, // whether it's been validated
    pledgeUp: ['pid1'], // {pledgeId} of parent pledge
    pledgeDown: [], // [{pledgeId}, ...] of childPledges
    description: "To reduce college electricity usage by 5% over the next two months",
    startDate: "10th February 2019",
    endDate: "10th March 2019",
    challengeDeadline: " 17th March 2019",
    startState: {
      description: "Our smart meter reading at the beginning of the period",
      value: 158000
    },
    targetState: {
      description: "Our smart meter reading at the end of the period",
      value: 178000
    },
    stateTransitionJustification: "By reducing our energy usage from the current value to the target value we will affect a 5% reduction in usage, factoring in seasonal and other variables.", 
    payoutJustification: "Rewards will be spent on the student bursary fund.",
  },{
    pledgeId: 'pid3',
    institutionId: null, // When null it gets the parent institutionId
    name: "Brasenose College",
    pledgeHolderAddress: "0xCD4E1E5EDEe47e52611cCf72C0C584f52680d674",
    verified: false, // whether it's been validated
    pledgeUp: ['pid1'], // {pledgeId} of parent pledge
    pledgeDown: [], // [{pledgeId}, ...] of childPledges
    description: "To reduce college electricity usage by 5% over the next two months",
    balance: 500000000000,
    startDate: "12th February 2019",
    endDate: "12th March 2019",
    challengeDeadline: " 19th March 2019",
    startState: {
      description: "Our smart meter reading at the beginning of the period",
      value: 158000
    },
    targetState: {
      description: "Our smart meter reading at the end of the period",
      value: 178000
    },
    stateTransitionJustification: "By reducing our energy usage from the current value to the target value we will affect a 5% reduction in usage, factoring in seasonal and other variables.", 
    payoutJustification: "Rewards will be spent on the student bursary fund.",
  },{
    pledgeId: 'pid4',
    institutionId: null, // When null it gets the parent institutionId
    name: "Jesus College",
    pledgeHolderAddress: "0xCD4E1E5EDEe47e52611cCf72C0C584f52680d674",
    verified: false, // whether it's been validated
    pledgeUp: ['pid1'], // {pledgeId} of parent pledge
    pledgeDown: [], // [{pledgeId}, ...] of childPledges
    description: "To reduce college electricity usage by 5% over the next two months",
    balance: 500000000000,
    startDate: "12th February 2019",
    endDate: "12th March 2019",
    challengeDeadline: " 19th March 2019",
    startState: {
      description: "Our smart meter reading at the beginning of the period",
      value: 158000
    },
    targetState: {
      description: "Our smart meter reading at the end of the period",
      value: 178000
    },
    stateTransitionJustification: "By reducing our energy usage from the current value to the target value we will affect a 5% reduction in usage, factoring in seasonal and other variables.", 
    payoutJustification: "Rewards will be spent on the student bursary fund.",
  },{
    pledgeId: 'pid5',
    institutionId: null, // When null it gets the parent institutionId
    name: "St Benet's Hall",
    pledgeHolderAddress: "0xCD4E1E5EDEe47e52611cCf72C0C584f52680d674",
    verified: false, // whether it's been validated
    pledgeUp: ['pid1'], // {pledgeId} of parent pledge
    pledgeDown: [], // [{pledgeId}, ...] of childPledges
    description: "To reduce college electricity usage by 5% over the next two months",
    balance: 500000000000,
    startDate: "12th February 2019",
    endDate: "12th March 2019",
    challengeDeadline: " 19th March 2019",
    startState: {
      description: "Our smart meter reading at the beginning of the period",
      value: 158000
    },
    targetState: {
      description: "Our smart meter reading at the end of the period",
      value: 178000
    },
    stateTransitionJustification: "By reducing our energy usage from the current value to the target value we will affect a 5% reduction in usage, factoring in seasonal and other variables.", 
    payoutJustification: "Rewards will be spent on the student bursary fund.",
  },{
    pledgeId: 'pid6',
    institutionId: null, // When null it gets the parent institutionId
    name: "Merton College",
    pledgeHolderAddress: "0xCD4E1E5EDEe47e52611cCf72C0C584f52680d674",
    verified: false, // whether it's been validated
    pledgeUp: ['pid1'], // {pledgeId} of parent pledge
    pledgeDown: [], // [{pledgeId}, ...] of childPledges
    description: "To reduce college electricity usage by 5% over the next two months",
    startDate: "12th February 2019",
    endDate: "12th March 2019",
    challengeDeadline: " 19th March 2019",
    startState: {
      description: "Our smart meter reading at the beginning of the period",
      value: 158000
    },
    targetState: {
      description: "Our smart meter reading at the end of the period",
      value: 178000
    },
    stateTransitionJustification: "By reducing our energy usage from the current value to the target value we will affect a 5% reduction in usage, factoring in seasonal and other variables.", 
    payoutJustification: "Rewards will be spent on the student bursary fund.",
  },{
    pledgeId: 'pid7',
    institutionId: null, // When null it gets the parent institutionId
    name: "Balliol College",
    pledgeHolderAddress: "0xCD4E1E5EDEe47e52611cCf72C0C584f52680d674",
    verified: false, // whether it's been validated
    pledgeUp: ['pid1'], // {pledgeId} of parent pledge
    pledgeDown: [], // [{pledgeId}, ...] of childPledges
    description: "To reduce college electricity usage by 5% over the next two months",
    balance: 500000000000,
    startDate: "12th February 2019",
    endDate: "12th March 2019",
    challengeDeadline: " 19th March 2019",
    startState: {
      description: "Our smart meter reading at the beginning of the period",
      value: 158000
    },
    targetState: {
      description: "Our smart meter reading at the end of the period",
      value: 178000
    },
    stateTransitionJustification: "By reducing our energy usage from the current value to the target value we will affect a 5% reduction in usage, factoring in seasonal and other variables.", 
    payoutJustification: "Rewards will be spent on the student bursary fund.",
  },{
    pledgeId: 'pid8',
    institutionId: null, // When null it gets the parent institutionId
    name: "St Hilda's",
    pledgeHolderAddress: "0xCD4E1E5EDEe47e52611cCf72C0C584f52680d674",
    verified: true, // whether it's been validated
    pledgeUp: ['pid1'], // {pledgeId} of parent pledge
    pledgeDown: [], // [{pledgeId}, ...] of childPledges
    description: "To reduce college electricity usage by 5% over the next two months",
    startDate: "12th February 2019",
    endDate: "12th March 2019",
    challengeDeadline: " 19th March 2019",
    startState: {
      description: "Our smart meter reading at the beginning of the period",
      value: 158000
    },
    targetState: {
      description: "Our smart meter reading at the end of the period",
      value: 178000
    },
    stateTransitionJustification: "By reducing our energy usage from the current value to the target value we will affect a 5% reduction in usage, factoring in seasonal and other variables.", 
    payoutJustification: "Rewards will be spent on the student bursary fund.",
  }
 ]

export default Pledges;

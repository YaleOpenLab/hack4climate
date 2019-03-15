export const initialSmartState = {
  specific: false,
  measurable: false,
  assignable: false,
  realistic: false,
  timeBound: false
};

export const smartReducer = (smartState, task) => {
  switch (task.isComplete) {
    case "assignable":
      return { ...smartState, assignable: true };
    case "not-assignable":
      return { ...smartState, assignable: false };
    case "specific":
      return { ...smartState, specific: true };
    case "not-specific":
      return { ...smartState, specific: false };
    case "measurable":
      return { ...smartState, measurable: true };
    case "not-measurable":
      return { ...smartState, measurable: false };
    case "realistic":
      return { ...smartState, realistic: true };
    case "not-realistic":
      return { ...smartState, realistic: false };
    case "time-bound":
      return { ...smartState, timeBound: true };
    case "not-time-bound":
      return { ...smartState, timeBound: false };
    default:
      throw new Error();
  }
}


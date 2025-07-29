const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const getStepStatus = (
  stepIndex: number
): "Completed" | "Progress" | "Start" => {
  switch (stepIndex) {
    case 0:
      return "Start";

    default:
      return "Completed";
      break;
  }
};

export { formatTime, getStepStatus };

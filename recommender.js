
function recommendStations(input) {
  return chargingStations
    .filter(station => station.available > 0)
    .map(station => {
      const chargingMinutes = calculateChargingTime({
        ...input,
        chargerPower: station.power
      });

      // 대기시간은 실제 측정값이 아닌 예시 시뮬레이션
      const waitingMinutes =
        station.waiting * 15;

      const travelMinutes =
        station.distance * 2;

      const totalMinutes =
        chargingMinutes +
        waitingMinutes +
        travelMinutes;

      return {
        ...station,
        chargingMinutes,
        waitingMinutes,
        travelMinutes,
        totalMinutes,
        feasible: totalMinutes <= input.stay
      };
    })
    .sort((a, b) => {
      if (a.feasible !== b.feasible) {
        return a.feasible ? -1 : 1;
      }
      return a.totalMinutes - b.totalMinutes;
    });
}

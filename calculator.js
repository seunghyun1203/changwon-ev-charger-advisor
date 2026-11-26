
function calculateChargingTime({
  soc,
  target,
  capacity,
  vehiclePower,
  chargerPower
}) {
  if (
    !Number.isFinite(soc) ||
    !Number.isFinite(target) ||
    !Number.isFinite(capacity) ||
    !Number.isFinite(vehiclePower) ||
    soc < 0 || soc > 100 ||
    target < 0 || target > 100 ||
    capacity <= 0 ||
    vehiclePower <= 0 ||
    chargerPower <= 0
  ) {
    throw new Error("입력값을 확인해주세요.");
  }

  if (target <= soc) return 0;

  const energy = capacity * (target - soc) / 100;
  const power = Math.min(vehiclePower, chargerPower);

  // 간단한 교육용 추정 모델.
  // 실제 충전 곡선 및 차량별 특성은 반영하지 않음.
  const averagePower = power * 0.85;
  return energy / averagePower * 60;
}

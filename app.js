
const results = document.getElementById("results");

document.getElementById("recommendBtn")
  .addEventListener("click", () => {
    try {
      const input = {
        soc: Number(document.getElementById("soc").value),
        target: Number(document.getElementById("target").value),
        capacity: Number(document.getElementById("capacity").value),
        vehiclePower: Number(document.getElementById("vehiclePower").value),
        stay: Number(document.getElementById("stay").value)
      };

      if (
        !Number.isFinite(input.soc) ||
        !Number.isFinite(input.target) ||
        !Number.isFinite(input.capacity) ||
        !Number.isFinite(input.vehiclePower) ||
        !Number.isFinite(input.stay) ||
        input.soc < 0 || input.soc > 100 ||
        input.target < 0 || input.target > 100 ||
        input.capacity <= 0 ||
        input.vehiclePower <= 0 ||
        input.stay <= 0
      ) {
        throw new Error("차량 정보를 올바르게 입력해주세요.");
      }

      const stations = recommendStations(input);

      if (!stations.length) {
        results.textContent = "현재 이용 가능한 충전소가 없습니다.";
        return;
      }

      results.replaceChildren();

      stations.forEach((station, index) => {
        const card = document.createElement("div");
        card.className = "result";

        const title = document.createElement("h3");
        title.textContent =
          `${index + 1}. ${station.name}`;

        const details = document.createElement("p");
        details.textContent =
          `${station.area} | 충전기 출력 ${station.power}kW`;

        const timing = document.createElement("p");
        timing.textContent =
          `이동 ${station.travelMinutes.toFixed(0)}분 / ` +
          `대기 추정 ${station.waitingMinutes.toFixed(0)}분 / ` +
          `충전 추정 ${station.chargingMinutes.toFixed(1)}분`;

        const total = document.createElement("strong");
        total.textContent =
          `총 예상 소요시간: ${station.totalMinutes.toFixed(1)}분`;

        const status = document.createElement("p");
        status.textContent = station.feasible
          ? "체류시간 내 충전 가능 예상"
          : "체류시간 내 목표 충전이 어려울 수 있음";

        card.append(title, details, timing, total, status);
        results.appendChild(card);
      });
    } catch (error) {
      results.textContent = error.message;
    }
  });

document.getElementById("simulationBtn")
  .addEventListener("click", () => {
    const totalChargers = chargingStations.reduce(
      (sum, station) => sum + station.chargers, 0
    );

    const busyChargers = chargingStations.reduce(
      (sum, station) => sum +
        station.chargers - station.available, 0
    );

    const utilization =
      totalChargers > 0
        ? busyChargers / totalChargers * 100
        : 0;

    document.getElementById("simulation").textContent =
      `예시 데이터 기준 충전기 이용률: ${utilization.toFixed(1)}%`;
  });

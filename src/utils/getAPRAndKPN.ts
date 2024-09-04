type LevelData = {
  months: number;
  apr: number;
  kpnNeeded: number;
};

type Level = {
  level: number;
  data: LevelData[];
};

const levels: Level[] = [
  {
    level: 1,
    data: [
      { months: 6, apr: 750, kpnNeeded: 750000 },
      { months: 12, apr: 1800, kpnNeeded: 750000 },
      { months: 24, apr: 4500, kpnNeeded: 750000 }
    ]
  },
  {
    level: 2,
    data: [
      { months: 6, apr: 1500, kpnNeeded: 1250000 },
      { months: 12, apr: 3500, kpnNeeded: 1250000 },
      { months: 24, apr: 8000, kpnNeeded: 1250000 }
    ]
  },
  {
    level: 3,
    data: [
      { months: 6, apr: 4200, kpnNeeded: 3000000 },
      { months: 12, apr: 9000, kpnNeeded: 3000000 },
      { months: 24, apr: 21000, kpnNeeded: 3000000 }
    ]
  },
  {
    level: 4,
    data: [
      { months: 6, apr: 8000, kpnNeeded: 5000000 },
      { months: 12, apr: 17000, kpnNeeded: 5000000 },
      { months: 24, apr: 37000, kpnNeeded: 5000000 }
    ]
  },
  {
    level: 5,
    data: [
      { months: 6, apr: 13500, kpnNeeded: 7500000 },
      { months: 12, apr: 28500, kpnNeeded: 7500000 },
      { months: 24, apr: 58500, kpnNeeded: 7500000 }
    ]
  },
  {
    level: 6,
    data: [
      { months: 6, apr: 25000, kpnNeeded: 12500000 },
      { months: 12, apr: 50000, kpnNeeded: 12500000 },
      { months: 24, apr: 112500, kpnNeeded: 12500000 }
    ]
  }
];

export default function getAPRAndKPN(month: number, level: number): { apr: number; kpnNeeded: number } | undefined {
  const levelData = levels.find(l => l.level === level);
  if (!levelData) {
    throw new Error(`Level ${level} not found.`);
  }

  const monthData = levelData.data.find(d => d.months === month);
  if (!monthData) {
    throw new Error(`Month ${month} not found for level ${level}.`);
  }

  return {
    apr: monthData.apr,
    kpnNeeded: monthData.kpnNeeded
  };
}
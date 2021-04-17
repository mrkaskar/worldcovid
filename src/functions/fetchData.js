import { between } from "../utils";

export const fetchData = (markers, data) => {
  const update = [];
  markers.forEach((country) => {
    data.forEach((d) => {
      if (country.city === d.country) {
        let value = 1;
        let newCase = 0;
        if (d && d.cases.new) {
          value = +d.cases.new.slice(1);
          newCase = value;
          if (between(value, 0, 1000)) {
            value = 1;
          } else if (between(value, 1000, 2000)) {
            value = 2;
          } else if (between(value, 2000, 3000)) {
            value = 3;
          } else if (between(value, 30000, 4000)) {
            value = 4;
          } else if (between(value, 40000, 5000)) {
            value = 5;
          } else if (between(value, 50000, 6000)) {
            value = 6;
          } else {
            value = 7;
          }
        }
        update.push({
          ...country,
          value,
          newCase,
          continent: d.continent,
          day: d.day,
          time: d.time,
          death: d.deaths.total,
          newDeath: d.deaths.new ?? 0,
          total: d.cases.total,
          active: d.cases.active,
          critical: d.cases.critical ?? 0,
          recovered: d.cases.recovered,
          test: d.tests.total,
        });
      }
    });
  });

  return update;
};

import CountUp from "react-countup";
import { format } from "../utils";

export default function Panel({
  selectedCountry,
  setSelectedCountry,
  setInputValue,
}) {
  return (
    <>
      {selectedCountry && (
        <div id="statics">
          <span
            id="close"
            onClick={() => {
              setSelectedCountry(null);
              setInputValue("");
            }}
          >
            X
          </span>
          <div id="title">
            {selectedCountry.city !== "World Wide" && (
              <img id="titleflag" alt="flag" src={selectedCountry.flag} />
            )}
            <h3 id="ctitle">{selectedCountry.city.toUpperCase()}</h3>
          </div>
          <h3 id="continent">{selectedCountry.continent}</h3>
          <div className="panel" id="total">
            <label>Total</label>
            <span>
              <CountUp separator="," start={0} end={selectedCountry.total} />
            </span>
          </div>
          <div className="panel" id="new">
            <label>New</label>
            <span>
              +
              <CountUp separator="," start={0} end={selectedCountry.newCase} />
            </span>
          </div>
          <div className="panel" id="critical">
            <label>Critical</label>
            <span>
              <CountUp separator="," start={0} end={selectedCountry.critical} />
            </span>
          </div>
          <div className="panel" id="newdeath">
            <label>New Death</label>
            <span>
              +
              <CountUp separator="," start={0} end={selectedCountry.newDeath} />
            </span>
          </div>
          <div className="panel" id="death">
            <label>Death</label>
            <span>
              <CountUp separator="," start={0} end={selectedCountry.death} />
            </span>
          </div>
          <div className="panel" id="recovered">
            <label>Recovered</label>
            <span>
              <CountUp
                separator=","
                start={0}
                end={selectedCountry.recovered}
              />
            </span>
          </div>
          <div className="panel" id="test">
            <label>In Test</label>
            <span>
              {selectedCountry.city === "World Wide" ? (
                "-"
              ) : (
                <CountUp separator="," start={0} end={selectedCountry.test} />
              )}
            </span>
          </div>
          <div>
            <br />
            <div id="last">
              <h5>Last Updated</h5>
              {format(new Date(selectedCountry.time))}
              <br />
              {/\((.*)\)/.exec(new Date().toString())[1]}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

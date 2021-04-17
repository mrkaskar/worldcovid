import GlobeLogo from "../svgs/globelogo";
import Downshift from "downshift";
import { useCallback } from "react";
import { matchSorter } from "match-sorter";

export default function Search({
  onSelect,
  inputvalue,
  setInputValue,
  countries,
}) {
  const getItems = useCallback(
    (value) =>
      value ? matchSorter(countries, value, { keys: ["city"] }) : countries,
    [countries]
  );

  return (
    <Downshift
      onChange={onSelect}
      itemToString={(item) => (item ? item.city : "")}
      inputValue={inputvalue}
    >
      {({
        getItemProps,
        getMenuProps,
        getInputProps,
        isOpen,
        highlightedIndex,
        selectedItem,
      }) => (
        <div>
          <div id="search">
            <GlobeLogo id="searchlogo" onClick={() => onSelect("World Wide")} />
            <input
              {...getInputProps()}
              spellCheck={false}
              id="searchinput"
              placeholder="Search by country"
              inputValue={inputvalue}
              onInput={(e) => setInputValue(e.target.value)}
            />
          </div>
          <div {...getMenuProps()} id="result">
            {isOpen &&
              getItems(inputvalue).map((data, index) => {
                if (index > 5) return null;
                return (
                  <div
                    {...getItemProps({
                      item: data,
                      key: data.id,
                    })}
                    key={data.id}
                    className={`res ${highlightedIndex === index && "active"}`}
                  >
                    {data.city}
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </Downshift>
  );
}

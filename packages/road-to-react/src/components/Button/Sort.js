import { icon } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import Button from "."

const Sort = ({sortKey, onSort, children, activeSortKey}) => {

  const sortClass = classNames(
    'button-inline',
    { 'button-active': sortKey === activeSortKey }
  );

  return (
    <Button
        onClick={() => onSort(sortKey)}
        className={sortClass}
    >
      {children}
      {sortKey === activeSortKey && <span style={{padding: '5px'}}><FontAwesomeIcon icon={faSortDown}/></span>}
    </Button>
  )
}

export default Sort;
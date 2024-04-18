import { Amplitude, Zapier, Slack, Webhook } from '../icon';
import {
  button,
  controls,
  controlsRight,
  destinations,
  nameCell,
  pageHeading,
  pageTitle,
  search,
  searchInput,
  tabs,
  tab,
  table,
  tableBody,
  tableCell,
  tableHead,
  tableHeader,
  tableRow,
} from './index.css';

export function Destinations() {
  return (
    <div className={destinations}>
      <div className={pageHeading}>
        <div className={pageTitle}>My destinations</div>
      </div>
      <div className={controls}>
        <div className={tabs}>
          <div className={`${tab} selected`}>All</div>
          <div className={tab}>Event streams</div>
          <div className={tab}>Storage</div>
          <div className={tab}>Reverse ETL</div>
        </div>
        <div className={controlsRight}>
          <div className={search}>
            <input
              className={searchInput}
              type="search"
              placeholder="Search..."
            ></input>
          </div>
          <div className={button}>
            <button>+ Add destination</button>
          </div>
        </div>
      </div>
      <div className={table}>
        <div className={tableHeader}>
          <div className={`${tableHead} ${nameCell}`}>Name</div>
          <div className={tableHead}>Status</div>
          <div className={tableHead}>Category</div>
          <div className={tableHead}>Created at</div>
          <div className={tableHead}>Sources</div>
        </div>
        <div className={tableBody}>
          <div className={tableRow}>
            <div className={`${tableCell} ${nameCell}`}>
              <Amplitude />
              Amplitude
            </div>
            <div className={tableCell}>Disabled</div>
            <div className={tableCell}>Analytics</div>
            <div className={tableCell}>2 year</div>
            <div className={tableCell}>Javascript</div>
          </div>
          <div className={tableRow}>
            <div className={`${tableCell} ${nameCell}`}>
              <Zapier />
              Zapier
            </div>
            <div className={tableCell}>Disabled</div>
            <div className={tableCell}>Raw Data</div>
            <div className={tableCell}>a year</div>
            <div className={tableCell}>React Native</div>
          </div>
          <div className={tableRow}>
            <div className={`${tableCell} ${nameCell}`}>
              <Webhook />
              Webhook
            </div>
            <div className={tableCell}>Enabled</div>
            <div className={tableCell}>Custom</div>
            <div className={tableCell}>7 months ago</div>
            <div className={tableCell}>HTTP API</div>
          </div>
          <div className={tableRow}>
            <div className={`${tableCell} ${nameCell}`}>
              <Slack />
              Slack
            </div>
            <div className={tableCell}>Disabled</div>
            <div className={tableCell}>Customer Success</div>
            <div className={tableCell}>8 months ago</div>
            <div className={tableCell}>Node.js</div>
          </div>
        </div>
      </div>
    </div>
  );
}

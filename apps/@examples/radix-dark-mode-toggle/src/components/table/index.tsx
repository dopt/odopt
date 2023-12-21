import {
  createProject,
  table,
  tableTitle,
  tableHeading,
  tableHead,
  tableCell,
  tableRow,
} from './index.css';

import { Button } from '@/components';

import { IconPlus } from '@tabler/icons';

export function Table() {
  return (
    <div className={table}>
      <div className={tableHeading}>
        <div className={tableTitle}>Projects</div>
        <div className={createProject}>
          <Button>
            <IconPlus /> Create project
          </Button>
        </div>
      </div>
      <table style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr className={tableRow}>
            <th className={tableHead}>Name</th>
            <th className={tableHead}>Owner</th>
            <th className={tableHead}>Updated</th>
          </tr>
        </thead>
        <tbody>
          <tr className={tableRow}>
            <td className={tableCell}>💸 Q1 Sales Pipeline</td>
            <td className={tableCell}>Aspens Vetrovs</td>
            <td className={tableCell}>Yesterday</td>
          </tr>
          <tr className={tableRow}>
            <td className={tableCell}>💼 Recruiting</td>
            <td className={tableCell}>Nolan Franci</td>
            <td className={tableCell}>1 hour ago</td>
          </tr>
          <tr className={tableRow}>
            <td className={tableCell}>🏦 Series A Fundraising</td>
            <td className={tableCell}>Maria Franci</td>
            <td className={tableCell}>Nov 1</td>
          </tr>
          <tr className={tableRow}>
            <td className={tableCell}>🎯 Marketing</td>
            <td className={tableCell}>Marcus Bergson</td>
            <td className={tableCell}>Sep 23</td>
          </tr>
          <tr className={tableRow}>
            <td className={tableCell}>🕺 Events</td>
            <td className={tableCell}>Zaire Lubin</td>
            <td className={tableCell}>Aug 16</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

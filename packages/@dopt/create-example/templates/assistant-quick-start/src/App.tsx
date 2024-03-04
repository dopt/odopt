import React from 'react';

function App() {
  return (
    <>
      <header></header>
      <main>
        <input type="text" defaultValue="Some text input" />
        <button>Some button</button>
        <select>
          <option>Some select</option>
          <option>Some select</option>
          <option>Some select</option>
          <option>Some select</option>
        </select>

        <textarea defaultValue="Some text area" />

        <input type="range" />

        <input type="color" />

        <label>
          <input type="checkbox" />
          Some checkbox
        </label>

        <div>Some div (non-interactive)</div>

        <a href="#">Some link</a>

        <div role="button">Some div with a button role</div>

        <div>
          <button>
            <span>Some</span> <span>nested</span> <span>button</span>
          </button>
        </div>

        <ul>
          <li>List</li>
          <li>List</li>
          <li>List</li>
        </ul>

        <form>
          <div>
            <label>Label</label>
            <br />
            <input type="text" defaultValue="Text" />
          </div>
          <div>
            <label>Label</label>
            <br />
            <select>
              <option>Select</option>
              <option>Select</option>
              <option>Select</option>
            </select>
          </div>
          <div>
            <label>
              <input type="radio" defaultChecked />
              Radio
            </label>
            <label>
              <input type="radio" />
              Radio
            </label>
          </div>
          <div>
            <button>Submit</button>
          </div>
        </form>

        <table>
          <thead>
            <tr>
              <th>Header</th>
              <th>Header</th>
              <th>Header</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
            </tr>
            <tr>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
            </tr>
            <tr>
              <td>Cell</td>
              <td>Cell</td>
              <td>Cell</td>
            </tr>
          </tbody>
        </table>
      </main>
    </>
  );
}

export default App;

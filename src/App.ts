import {readJson} from "./DataLoader.js";
import Table from "./Table.js";
import SortHandler from "./handlers/SortHandler.js";
import SearchHandler from "./handlers/SearchHandler.js";

const table = new Table(readJson.bind(null, './data/data.json'))
const root = document.getElementById('root');
table.render(root);

const sortHandler = new SortHandler(table);
const searchHandler = new SearchHandler(table);







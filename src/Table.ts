class Table{
    private readonly _sourceGenerator: Function;
    private readonly _tableElement: HTMLTableElement;
    private _foundCells: HTMLTableCellElement[] = [];
    private _unsortedTbodyRows: HTMLTableRowElement[];
    private set unsortedTbodyRows(value: HTMLCollectionOf<HTMLTableRowElement>){
        this._unsortedTbodyRows = [...Array.from(value)];
    }

    constructor(sourceGenerator: Function) {
        this._sourceGenerator = sourceGenerator;
        this._tableElement = document.createElement('table');

    }

    search(query: string):void {
        for (const row of this.tbody.rows) {
            for (const cell of row.cells) {
                if (cell.innerText.toLocaleLowerCase().includes(query.toLocaleLowerCase())) {
                    cell.classList.add('found');
                    this._foundCells.push(cell);
                }
            }
        }
    }

    cancelSearch():void {
        this._foundCells.forEach(cell => cell.classList.remove('found'));
        this._foundCells = [];
    }

    sort(columnIndex: number, asc = true): void {
        const sortedRows = Array.from(this.tbody.rows).sort(this._sortingFunctionByColumn(columnIndex, asc));
        this.unsortedTbodyRows = this.tbody.rows;
        this._updateTbody(sortedRows);
    }

    cancelSort(): void{
        this._updateTbody(Array.from(this._unsortedTbodyRows));
    }

    private _sortingFunctionByColumn = (columnIndex: number, asc: boolean) => (rowa: HTMLTableRowElement, rowb: HTMLTableRowElement) => {
        const iColumnCellText = (row: HTMLTableRowElement) => row.cells[columnIndex].innerText.toLocaleLowerCase();
        return iColumnCellText(rowa).localeCompare(iColumnCellText(rowb)) * (asc ? 1 : -1);
    }

    get tbody(): HTMLTableSectionElement {
       return <HTMLTableSectionElement>this._findFirstOrCreateElement('tbody', this._tableElement);
    }

    private _updateTbody(rows: HTMLTableRowElement[]): void{
        this._tableElement.removeChild(this.tbody);
        rows.forEach(row => this.tbody.appendChild(row));
        this._tableElement.appendChild(this.tbody);
    }

    get thead(): HTMLTableSectionElement {
        return <HTMLTableSectionElement>this._findFirstOrCreateElement('thead', this._tableElement);
    }

    private _findFirstOrCreateElement(tagName: string, rootElement: HTMLElement): HTMLElement{
        const elements = rootElement.getElementsByTagName(tagName);
        if (elements.length > 0)
            return <HTMLElement>elements[0];

        const element = document.createElement(tagName);
        rootElement.appendChild(element);
        return element;
    }

    render(rootElement: HTMLElement):void{
        this._sourceGenerator(this._fillTable.bind(this));
        rootElement.appendChild(this._tableElement);
    }

    private _fillTable(data: {}[]):void {
        const headRow = data.length > 0 ? Object.keys(data[0]) : [];
        this.thead.appendChild(this._createRow(headRow, true));

        const rows = data.map(value => this._createRow(value));
        rows.forEach(row => this.tbody.appendChild(row));
    }

    private _createRow(data:{}, isHead: boolean = false): HTMLElement{
        const rowElement = document.createElement('tr');
        const cells = Object.values(data).map(value => this._createCell(value.toString(), isHead));
        cells.forEach(ceil => rowElement.appendChild(ceil));
        return rowElement;
    }

    private _createCell(data: string, isHead: boolean = false): HTMLElement{
        const cellElement = document.createElement(isHead ? 'th': 'td');
        cellElement.innerText = data.toString();
        return cellElement;
    }
}

export default Table;

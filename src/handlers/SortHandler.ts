import Table from "../Table.js";

class SortHandler {
    private sortButton: HTMLElement;
    private cancelSortButton: HTMLElement;
    private selectElement: HTMLSelectElement;
    private _table: Table;
    private orderInput: HTMLInputElement;

    constructor(table: Table){
        this._table = table;

        this.sortButton = document.getElementById('sortButton');
        this.cancelSortButton = document.getElementById('cancelSortButton');
        this.selectElement = <HTMLSelectElement>document.getElementById('columns');
        this.orderInput = <HTMLInputElement>document.getElementById('ordered');
        document.addEventListener('DOMContentLoaded', this.onload.bind(this));
        this.sortButton.onclick = this._onSortClick.bind(this);

        this.cancelSortButton.onclick = this._onCancelSortClick.bind(this)
    }

    private onload(){
        let arr = document.getElementsByTagName('th');
        // this.generateSelectOptions(arr).map(value => this.selectElement.appendChild(value));
    }

    private get selectIndex(){
        return Number(this.selectElement.value);
    }

    private get ordered(){
        return this.orderInput.checked;
    }

    private generateSelectOptions(row: HTMLElement[]){
        return row.map((value, index) => this.createOption(value.innerText, index));
    }

    private createOption(text: string, index: number){
        const element = document.createElement('option');
        element.value = index.toString();
        element.innerText = text;
        return element;
    }

    private _onSortClick(){
        this._table.sort(this.selectIndex, this.ordered);
    }

    private _onCancelSortClick(){
        this._table.cancelSort();
        this.selectElement.value = "0";
        this.orderInput.checked = false;
    }
}

export default SortHandler;

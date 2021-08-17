import Table from "../Table.js";

class SearchHandler {
    private searchField: HTMLInputElement;
    private cancelSearchButton: HTMLElement;
    private searchButton: HTMLElement;
    private searchQuery: string = '';
    private _table: Table;

    constructor(table: Table) {
        this._table = table;
        this.searchField = <HTMLInputElement>document.getElementById('searchField');
        this.cancelSearchButton = document.getElementById('cancelSearchButton');
        this.searchButton = document.getElementById('searchButton');

        this.searchButton.onclick = this._onSearchClick.bind(this);
        this.cancelSearchButton.onclick = this._onCancelSearch.bind(this);
        this.searchField.onblur = this._onSearchBlur.bind(this);
    }

    private _onSearchClick(){
        this._table.search(this.searchQuery);
    }

    private _onCancelSearch(){
        this.searchField.value = '';
        this._table.cancelSearch();
    }

    private _onSearchBlur(event: FocusEvent){
        const target = <HTMLInputElement>event.target;
        this.searchQuery = target.value;
    }
}

export default SearchHandler;

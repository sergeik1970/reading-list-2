import React, { Component } from 'react';
import { getBooks } from '../services/bookService';
import { getGenres } from '../services/genreService';
import Like from './common/like';
import ListGroup from './common/listGroup';
import { paginate } from '../utils/paginate';
import Paginaton from './common/pagination';
import _ from 'lodash';

//imrc - shortcut create react component
//cc - create class

class Books extends Component {
    state = {
        books: [],
        genres: [],
        pageSize: 4,
        currentPage: 1,
        sortColumn: { path: "title", order: "asc" }
    };

    componentDidMount() {
        const genres = [{ name: "Все жанры", _id: 0 }, ...getGenres()]
        this.setState({ books: getBooks(), genres: genres })
        // console.log(genres)
    }

    handleDelete = (book) => {
        const books = this.state.books.filter(b => b._id !== book._id)
        this.setState({ books: books })
    }

    handleLike = book => {

        const books = [...this.state.books];
        const index = books.indexOf(book);
        books[index] = { ...books[index] };
        books[index].liked = !books[index].liked;
        this.setState({ books })

    }

    handlePageChange = page => {
        this.setState({ currentPage: page })
    }

    handleGenreSelect = genre => {
        this.setState({ selectedGenre: genre, currentPage: 1})
    }

    handleSort = sortColumn => {

        this.setState({ sortColumn, currentPage: 1 });
    }

    raiseSort = path => {

        console.log(path)

        const sortColumn = { ...this.state.sortColumn};

        if (sortColumn.path === path) {
            sortColumn.order = (sortColumn.order === "asc") ? "desc" : "asc";
        }

        else {
            sortColumn.path = path;
            sortColumn.order = "asc"
        }

        this.handleSort(sortColumn)
    }

    render() {
        if (this.state.books.length === 0) return <p>Здесь нет ни одной книги :(</p>;

        const filteredBooks = this.state.selectedGenre && this.state.selectedGenre._id
        ? this.state.books.filter(m => m.genre._id === this.state.selectedGenre._id)
        : this.state.books;

        const sortedBooks = _.orderBy(filteredBooks, [this.state.sortColumn.path], [this.state.sortColumn.order])
        console.log(sortedBooks)

        const books = paginate(sortedBooks, this.state.currentPage, this.state.pageSize);

        return (
            <div className="row">
                <div className="col-lg-2 my-5">
                    <ListGroup
                        items={this.state.genres}
                        onItemSelect={this.handleGenreSelect}
                        selectedItem={this.state.selectedGenre}
                    />
                </div>
                <div className="col">
                    <p>В списке книг: {filteredBooks.length}</p>
                    <table className="table">
                        <thead>
                            <tr>
                                <th onClick={() => this.raiseSort("title")}>Название</th>
                                <th onClick={() => this.raiseSort("author")}>Автор</th>
                                <th onClick={() => this.raiseSort("genre.name")}>Жанр</th>
                                <th onClick={() => this.raiseSort("pages")}>Стр.</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map(book => (
                                <tr key={book._id}>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.genre.name}</td>
                                    <td>{book.pages}</td>
                                    <td>
                                        <Like liked={book.liked} onLikeToggle={() => this.handleLike(book)} />
                                    </td>
                                    <td><button onClick={() => this.handleDelete(book)} className="btn btn-danger btn-sm">Удалить</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Paginaton
                        itemsCount={filteredBooks.length}
                        pageSize={this.state.pageSize}
                        onPageChange={this.handlePageChange}
                        currentPage={this.state.currentPage}
                    />
                </div>
            </div>)
    }
}

export default Books;
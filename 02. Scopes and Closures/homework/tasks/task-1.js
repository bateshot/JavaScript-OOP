/* Task Description */
/* 
	*	Create a module for working with books
		*	The module must provide the following functionalities:
			*	Add a new book to category
				*	Each book has unique title, author and ISBN
				*	It must return the newly created book with assigned ID
				*	If the category is missing, it must be automatically created
			*	List all books
				*	Books are sorted by ID
				*	This can be done by author, by category or all
			*	List all categories
				*	Categories are sorted by ID
		*	Each book/catagory has a unique identifier (ID) that is a number greater than or equal to 1
			*	When adding a book/category, the ID is generated automatically
		*	Add validation everywhere, where possible
			*	Book title and category name must be between 2 and 100 characters, including letters, digits and special characters ('!', ',', '.', etc)
			*	Author is any non-empty string
			*	Unique params are Book title and Book ISBN
			*	Book ISBN is an unique code that contains either 10 or 13 digits
			*	If something is not valid - throw Error
*/
function solve() {
	var library = (function () {
		var books = [];
		var categories = [];

		function listBooks() {
			var result = [],
				filter = '',
				aut = '';
			//Argument provided:
			if (arguments.length != 0){

				//Category provided:
				if(arguments[0].hasOwnProperty('category')) {
					filter = arguments[0].category;
					books.forEach(function(item){
						if(item.category == filter){
							result.push(item);
						}
					});
					return result;
				}
				//Author provided:
				if(arguments[0].hasOwnProperty('author')) {
					filter = arguments[0].author;
					books.forEach(function(item){
						if(item.author == filter){
							result.push(item);
						}
					});
					return result;
				}
			}
			return books;
		}

		function addBook(book) {
			book = validateBook(book);
			book.ID = books.length + 1;
			books.push(book);
			if(categories.length > 0){
				if(categories.indexOf(book.category) == -1){
					categories.push(book.category);
				}
			} else {
				categories.push(book.category);
			}

			return book;
		}

		function listCategories() {
			return categories;
		}

		function validateBook(x) {
			//Author
			if(typeof x.author !== 'string' || x.author.length =='') throw 'Error';
			//Name
			if(x.title.length < 2 || x.title.length > 100) throw 'Error';
			if(books.length > 0){
				if(books.some(function(element){ return element.title == x.title;})) throw 'Error';
			}
			//isbn
			if(!(x.isbn.length == 13 || x.isbn.length == 10)) throw 'Error';
			if(isNaN(x.isbn)) throw 'Error';
			if(books.length > 0){
				if(books.some(function(element){ return element.isbn == x.isbn;})) throw 'Error';
			}

			return x;
		}

		return {
			books: {
				list: listBooks,
				add: addBook
			},
			categories: {
				list: listCategories
			}
		};
	} ());
	return library;
}
module.exports = solve;

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3300;

app.use(bodyParser.json());

// Static book data
const books = [
    { ISBN: '12345', title: 'Book One', author: 'Author One', review: 'Great book!' },
    { ISBN: '67890', title: 'Book Two', author: 'Author Two', review: 'Interesting read.' }
];

// Static user data
const users = [
    { id: 1, username: 'user1', password: 'pass1' },
    { id: 2, username: 'user2', password: 'pass2' }
];

// Task 1: Get the book list available in the shop
app.get('/books', (req, res) => {
    res.json({ message: 'Book list retrieved successfully', data: books });
});

// Task 2: Get the books based on ISBN (static ISBN '12345')
app.get('/books/isbn/12345', (req, res) => {
    const book = books.find(b => b.ISBN === '12345');
    if (book) {
        res.json({ message: 'Book retrieved successfully', data: book });
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

// Task 3: Get all books by Author (static author 'Author One')
app.get('/books/author/Author%20One', (req, res) => {
    const authorBooks = books.filter(b => b.author === 'Author One');
    if (authorBooks.length > 0) {
        res.json({ message: 'Books by author retrieved successfully', data: authorBooks });
    } else {
        res.status(404).json({ message: 'No books found by this author' });
    }
});

// Task 4: Get all books based on Title (static title 'Book One')
app.get('/books/title/Book%20One', (req, res) => {
    const titleBooks = books.filter(b => b.title.includes('Book One'));
    if (titleBooks.length > 0) {
        res.json({ message: 'Books by title retrieved successfully', data: titleBooks });
    } else {
        res.status(404).json({ message: 'No books found with this title' });
    }
});

// Task 5: Get book Review (static ISBN '12345')
app.get('/books/review/12345', (req, res) => {
    const book = books.find(b => b.ISBN === '12345');
    if (book) {
        res.json({ message: 'Review retrieved successfully', data: book.review });
    } else {
        res.status(404).json({ message: 'Review not found' });
    }
});

// Task 6: Register New user (example user data)
app.post('/users/register', (req, res) => {
    const user = { id: users.length + 1, ...req.body };
    users.push(user);
    res.status(201).json({ message: 'User registered successfully', data: user });
});

// Task 7: Login as a Registered user (static user credentials)
app.post('/users/login', (req, res) => {
    const user = users.find(u => u.username === 'user1' && u.password === 'pass1');
    if (user) {
        res.json({ message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Task 8: Add/Modify a book review (static ISBN '12345')
app.post('/books/review/12345', (req, res) => {
    const book = books.find(b => b.ISBN === '12345');
    if (book) {
        book.review = req.body.review || book.review;
        res.json({ message: 'Review added/modified successfully', data: book });
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

// Task 9: Delete book review added by that particular user (static ISBN '12345')
app.delete('/books/review/12345', (req, res) => {
    const book = books.find(b => b.ISBN === '12345');
    if (book) {
        book.review = '';
        res.json({ message: 'Review deleted successfully', data: book });
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

// Task 10: Get all books – Using async callback function
app.get('/async/books', async (req, res) => {
    res.json({ message: 'Async books retrieved successfully', data: books });
});

// Task 11: Search by ISBN – Using Promises (static ISBN '67890')
app.get('/promise/books/isbn/67890', (req, res) => {
    return new Promise((resolve, reject) => {
        const book = books.find(b => b.ISBN === '67890');
        if (book) {
            resolve(res.json({ message: 'Book by ISBN retrieved successfully', data: book }));
        } else {
            reject(res.status(404).json({ message: 'Book not found' }));
        }
    });
});

// Task 12: Search by Author – (static author 'Author Two')
app.get('/promise/books/author/Author%20Two', (req, res) => {
    return new Promise((resolve, reject) => {
        const authorBooks = books.filter(b => b.author === 'Author Two');
        if (authorBooks.length > 0) {
            resolve(res.json({ message: 'Books by author retrieved successfully', data: authorBooks }));
        } else {
            reject(res.status(404).json({ message: 'No books found by this author' }));
        }
    });
});

// Task 13: Search by Title – (static title 'Book Two')
app.get('/promise/books/title/Book%20Two', (req, res) => {
    return new Promise((resolve, reject) => {
        const titleBooks = books.filter(b => b.title.includes('Book Two'));
        if (titleBooks.length > 0) {
            resolve(res.json({ message: 'Books by title retrieved successfully', data: titleBooks }));
        } else {
            reject(res.status(404).json({ message: 'No books found with this title' }));
        }
    });
});

// Task 14: Submission of Project GitHub Link - This task doesn't need an endpoint, but typically you might submit it via a form or an API.

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

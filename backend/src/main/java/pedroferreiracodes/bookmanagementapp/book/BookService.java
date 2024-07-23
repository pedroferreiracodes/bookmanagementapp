package pedroferreiracodes.bookmanagementapp.book;


import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class BookService {

    private final BookRepository bookRepository;

    @Autowired
    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<Book> getBooks(){
        return bookRepository.findAll();
    }

    public Optional<Book> getBook(Integer bookId){
        return bookRepository.findById(bookId);
    }

    public void addNewBook(Book book) {

        Optional<Book> bookOptional = bookRepository.findBookByIsbn(book.getIsbn());

        if (bookOptional.isPresent()){
            throw new IllegalStateException("isbn already exists in database");
        }

        bookRepository.save(book);
    }

    @Transactional
    public void updateBook( Integer bookId,
                            String title,
                            String author,
                            Long isbn,
                            LocalDate publicationDate,
                            Double price) {

        Book book = bookRepository.findBookById(bookId).orElseThrow(()-> new IllegalStateException("Book number " + bookId +" not found in the database"));

        if(title != null && !title.isEmpty() && !Objects.equals(book.getTitle(), title)) {
            book.setTitle(title);
        }
        if(author != null && !author.isEmpty() && !Objects.equals(book.getAuthor(), author)) {
            book.setAuthor(author);
        }
        if(isbn != null && !isbn.equals(book.getIsbn())) {
            book.setIsbn(isbn);
        }
        if(publicationDate != null && !publicationDate.equals(book.getPublishedDate())) {
            book.setPublishedDate(publicationDate);
        }
        if(price != null && !price.equals(book.getPrice())) {
            book.setPrice(price);
        }

    }


    public void deleteBook(Integer bookId){
        boolean exists = bookRepository.existsById(bookId);

        if (!exists){
            throw new IllegalStateException("book " + bookId + " does not exist in the database");
        }
        bookRepository.deleteById(bookId);
    }


}

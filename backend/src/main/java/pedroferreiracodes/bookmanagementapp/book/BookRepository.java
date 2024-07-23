package pedroferreiracodes.bookmanagementapp.book;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {

    Optional<Book> findBookByIsbn(Long isbn);
    Optional<Book> findBookById(Integer bookId);
}
